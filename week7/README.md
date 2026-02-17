# Week 7 - Mission

## 頁面連結
[Week7 頁面連結](https://pengpon.github.io/react-training-2025/week7/)

- 前台
  - [產品列表頁](https://pengpon.github.io/react-training-2025/week7/#/products)
  - [購物車頁](https://pengpon.github.io/react-training-2025/week7/#/cart)
- Admin 後台
  - [登入頁](https://pengpon.github.io/react-training-2025/week7/#/admin/login)
  - [產品管理頁](https://pengpon.github.io/react-training-2025/week7/#/admin/products)


## 需求
```
- 使用 Redux Toolkit 實作通知訊息功能
- 完成後台登入及產品列表頁面
- 產品頁面需包含：
  - 串接取得、新增、刪除、更新產品 API
  - 啟用狀態顯示
  - Modal 細節欄位
  - 上傳圖片 API
  - 分頁功能
```

## 新增功能
```
- 前台
  - 使用 Redux Toolkit 儲存購物車項目 Cart-Slice
  - Header 中的 Cart 會顯示所有品項的加總數量
- 後台
  - 使用 Redux Toolkit 儲存登入資訊 Auth-Slice
  - 增加 AdminGuard 元件做檢查
```

## 安裝 & 打包部署
`node 使用 v24.12.0`
```bash
# 進入 week7 目錄下
cd week7

# 安裝 package
npm install

# 啟動本機 Server
npm run dev

# 只打包產生靜態檔 dist
npm run build

# 打包並部署至遠端 gh-pages 分支
npm run deploy
```