# Thiệp cưới online

## Cài đặt và build production

1. Cài Node.js 18+.
2. Cài dependencies một lần với `npm install`.
3. Build gói production đặt trong `dist/` bằng `npm run build`.

Thư mục `dist/` đã được minify HTML/CSS/JS và chỉ chứa các file cần thiết (`Index.html`, `assets/`, `webfonts/`). Tất cả JS được bundle thành một file `assets/app.min.js` để tải nhanh hơn. Bạn chỉ cần upload toàn bộ `dist/` lên hosting (Nginx/Apache, GitHub Pages, Netlify, Vercel, v.v.) là có thể chạy bản production.

## Quy ước ignore

`.gitignore` đã được cấu hình để loại trừ `node_modules/`, `dist/`, `temp_output.txt`, cùng các file log tạm. Khi deploy, không cần upload các thư mục này, chỉ cần tập trung vào `dist/`.
