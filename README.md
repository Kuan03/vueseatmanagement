**# Seat Management System - Frontend (Vue.js)

本專案為 **員工座位安排系統** 的前端部分，使用 Vue 3 + Vite 開發，搭配 RESTful API 後端（Spring Boot）完成完整的人資座位管理系統。

👉 後端倉庫：[seat-management-system (Spring Boot)](https://github.com/Kuan03/seat-management-system)

---

##  技術棧

- Vue 3 + Composition API
- Vite
- Axios（與後端 API 通訊）
- Vue Router
- Pinia（狀態管理，如有使用）
- Element Plus / Bootstrap / Tailwind CSS（視使用情況）
- ESLint + Prettier

---

## 安裝與啟動

 1. 安裝依賴

```bash
npm install
**

2.啟動開發伺服器
npm run dev

預設會啟動在 http://localhost:5173

請確認 .env 檔案中設定的 VITE_API_BASE_URL 正確對應到你的後端 API（例如 http://localhost:8080/api）

環境變數設定（.env）
VITE_API_BASE_URL=http://localhost:8080/api

seat-management-frontend/
├── src/
│   ├── assets/         # 靜態資源
│   ├── components/     # 共用元件
│   ├── views/          # 各頁面元件
│   ├── router/         # 路由設定
│   ├── stores/         # Pinia 狀態管理（可選）
│   ├── services/       # API 通訊（Axios 封裝）
│   └── App.vue
├── public/
├── .env
├── vite.config.js
└── README.md
