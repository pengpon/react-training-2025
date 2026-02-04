# Week 5 - Mission

[Week5 頁面連結](https://pengpon.github.io/react-training-2025/week5/)

## 需求

```bash
- 使用 Vite 完成前台頁面路由的設定
  - 首頁
  - 產品頁
  - 產品詳細頁
  - 購物車

- 頁面
  - 前台產品頁：顯示完整的產品列表，點擊產品可進入產品細節頁面
  - 產品詳細頁：顯示產品詳細介紹內容
  - 購物車頁面：呈現加入購物車的產品列表

- 功能
  - 於購物車頁可更改購買數量
  - 於購物車頁可移除產品
  - 購物車頁會顯示總金額

```

## 路由設定

```bash
# 首頁
/

# 產品列表頁
/product

# 產品頁
/product/:id

# 購物車
/cart
```

## 安裝 & 打包部署
`node 使用 v24.12.0`
```bash
# 進入 week5 目錄下
cd week5

# 安裝 package
npm install

# 啟動本機 Server
npm run dev

# 只打包產生靜態檔 dist
npm run build

# 打包並部署至遠端 gh-pages 分支
npm run deploy
```

