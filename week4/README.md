# Week 4 - Mission

[Week4 頁面連結](https://pengpon.github.io/react-training-2025/week4/)

## 需求
```bash
- 後台頁面 Modal 以及分頁改成元件
- 使用 import module 來引入元件
- 串接圖片上傳 API 功能
- 新增一個自訂欄位，例如：商品評價星級。
- 使用者可以打開 Modal 新增、編輯、刪除商品
```

## 新增/異動

- 產品列表可使用頁碼切換
- 可選擇檔案上傳圖片
- 必填欄位未填寫時，無法新增或是儲存編輯
- 新增自訂欄位 `note` 以及 `modified_at`

## 安裝 & 打包部署
`node 使用 v24.12.0`
```bash
# 進入 week4 目錄下
cd week4

# 安裝 package
npm install

# 啟動本機 Server
npm run dev

# 只打包產生靜態檔 dist
npm run build

# 打包並部署至遠端 gh-pages 分支
npm run deploy
```