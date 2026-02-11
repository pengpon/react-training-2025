# Week 6 - Mission

[Week6 頁面連結](https://pengpon.github.io/react-training-2025/week6/)

## 需求

```bash
延續上一週的路由設置，新增登入路由 /login，並使用 React Hook Form 完成登入表單驗證功能，登入成功後轉至 /admin/product 畫面
  - 使用 React Hook Form 完成前台結帳付款表單驗證功能
  - 使用 react-loader-spinner 套件 製作 loading 效果
  - 串接前台 API 完成購物車功能

＊注意：
- 新增相同產品到購物車時需累加項目
- 送出訂單後，購物車需要清除原本項目
- 購物車無產品時不建議發出結帳請求

```

## 路由設定
- 前台 (用戶瀏覽、購物使用)
  - 首頁 `/`
  - 產品列表 `/products`
  - 單一產品頁 `/product/:id`
  - 購物車 `/cart`
  - 訂單 `/checkout`
  - 結帳付款 `/payment/:id`
  - 付款完成 `/payment/thanks`

- 後台 (管理者管理用)
  - 登入 `/admin/login`
  - 產品列表 `/admin/products/` or `/admin`


## 安裝 & 打包部署
`node 使用 v24.12.0`
```bash
# 進入 week6 目錄下
cd week6

# 安裝 package
npm install

# 啟動本機 Server
npm run dev

# 只打包產生靜態檔 dist
npm run build

# 打包並部署至遠端 gh-pages 分支
npm run deploy
```

