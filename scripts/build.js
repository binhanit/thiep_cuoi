"use strict";

const path = require("node:path");
const fse = require("fs-extra");
const CleanCSS = require("clean-css");
const { minify: minifyHTML } = require("html-minifier-terser");
const { minify: minifyJS } = require("terser");

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const SRC_ASSETS = path.join(ROOT, "assets");
const SRC_WEBFONTS = path.join(ROOT, "webfonts");
const ENTRY_HTML = path.join(ROOT, "Index.html");

const JS_BUNDLE_NAME = "app.min.js";
const JS_BUNDLE_ORDER = [
    "language.js",
    "music.js",
    "countdown.js",
    "gallery.js",
    "rsvp.js",
    "main.js",
    "invitation-flow.js",
];

const DEV_SCRIPT_BLOCK = JS_BUNDLE_ORDER.map((file) => `    <script src="./assets/${file}"></script>`).join("\n");
const PROD_SCRIPT_TAG = `    <script src="./assets/${JS_BUNDLE_NAME}"></script>`;

async function main() {
    await fse.emptyDir(DIST_DIR);
    await fse.ensureDir(DIST_DIR);

    await copyStaticAssets();
    await minifyAllCSS();
    await bundleJavaScript();
    await minifyEntryHtml();

    console.log("Production bundle created in ./dist");
}

async function copyStaticAssets() {
    const copyJobs = [];

    if (await fse.pathExists(SRC_ASSETS)) {
        copyJobs.push(fse.copy(SRC_ASSETS, path.join(DIST_DIR, "assets")));
    }

    if (await fse.pathExists(SRC_WEBFONTS)) {
        copyJobs.push(fse.copy(SRC_WEBFONTS, path.join(DIST_DIR, "webfonts")));
    }

    await Promise.all(copyJobs);
}

async function minifyAllCSS() {
    const cssFiles = await collectFiles(path.join(DIST_DIR, "assets"), ".css");
    const minifier = new CleanCSS({
        level: 2,
        rebase: false,
    });

    for (const file of cssFiles) {
        const raw = await fse.readFile(file, "utf8");
        const { styles, errors } = minifier.minify(raw);

        if (errors?.length) {
            throw new Error(`CSS minify error in ${file}: ${errors.join(", ")}`);
        }

        await fse.writeFile(file, styles, "utf8");
    }
}

async function bundleJavaScript() {
    const assetDir = path.join(DIST_DIR, "assets");
    let concatenated = "";

    for (const fileName of JS_BUNDLE_ORDER) {
        const filePath = path.join(assetDir, fileName);

        if (!(await fse.pathExists(filePath))) {
            throw new Error(`Missing JS source during bundle: ${fileName}`);
        }

        const contents = await fse.readFile(filePath, "utf8");
        concatenated += `\n// ${fileName}\n${contents}`;
    }

    const result = await minifyJS(concatenated, {
        compress: true,
        mangle: true,
        format: { comments: false },
    });

    if (!result.code) {
        throw new Error("Bundling JS produced empty output");
    }

    const outPath = path.join(assetDir, JS_BUNDLE_NAME);
    await fse.writeFile(outPath, result.code, "utf8");

    await Promise.all(JS_BUNDLE_ORDER.map((fileName) => fse.remove(path.join(assetDir, fileName))));
}

async function minifyEntryHtml() {
    if (!(await fse.pathExists(ENTRY_HTML))) {
        throw new Error("Index.html not found at project root");
    }

    const html = await fse.readFile(ENTRY_HTML, "utf8");
    const normalized = html.replace(/\r\n/g, "\n");
    const updated = normalized.includes(DEV_SCRIPT_BLOCK)
        ? normalized.replace(DEV_SCRIPT_BLOCK, PROD_SCRIPT_TAG)
        : normalized;

    const minified = await minifyHTML(updated, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
    });

    await fse.writeFile(path.join(DIST_DIR, "Index.html"), minified, "utf8");
}

async function collectFiles(baseDir, extension, bucket = []) {
    if (!(await fse.pathExists(baseDir))) {
        return bucket;
    }

    const entries = await fse.readdir(baseDir, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(baseDir, entry.name);

        if (entry.isDirectory()) {
            await collectFiles(entryPath, extension, bucket);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(extension)) {
            bucket.push(entryPath);
        }
    }

    return bucket;
}

main().catch((error) => {
    console.error("Build failed:", error);
    process.exitCode = 1;
});
