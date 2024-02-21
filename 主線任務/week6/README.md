第六週 - Vite、Vue Router
===

## 完成條件

1. 請透過 GitHub Repo、GitHub Pages 提交作業（需正常開啟），以方便助教與講師檢視
2. 須自行撰寫 Vue，若有參考同學作業，請附上參考來源
3. 請勿將提問的問題寫在程式碼中
4. 回報時務必要附上 Discord 名稱、作業等級 .. 等完整繳交內容
5. 需至少完成 Lv1 作業等級
6. 以上需符合規定，否則會審核失敗

## 此任務你會獲得以下技能

1. Vue Router
2. Vite

任務描述

## 主線任務

- 使用 Vite 完成路由設定
- 在 Vite 中完成登入、前台表單驗證功能
- 建立 .env 檔案內容
    VITE_API=
    VITE_APIPATH=

***

作業須符合此[作業規範](https://hackmd.io/XbKPYiE9Ru6G0sAfB5PBJw)

## 繳交內容

1. 您的 Discord 使用者名稱
2. 您的作業等級，請見下方等級表，例如 LV1
3. 作業網址：請提供 GitHub Repo 以及 GitHub Pages 連結，以方便助教與講師檢視
4. 使用哪種撰寫方式（擇一）？ Options API／Composition API

## 作業等級表

1. LV1：參考範例程式碼，完成路由功能，並可瀏覽所有前台頁面（請提供導覽選單，進入頁面僅需要標題，不必加入內容）
2. LV2：前台顯示完整的產品列表，並可進入產品細節頁面
3. LV3：完成以上功能＋前台表單及登入頁面及登入驗證功能

## 作業地雷

- GitHub Pages 需正常開啟
- 提問超過 2 個問題批改時間會延長


Vite 範本：https://github.com/hexschool/vite-template


每週的範例：

- [Options API](https://github.com/hexschool/live-vue3-training-chapter-2023/tree/options-api/week6)
- [Composition API](https://github.com/hexschool/live-vue3-training-chapter-2023/tree/composition-api/week6)

⭐️ 範例檔案中的 API Path 請換成自己的唷！

（[範例使用教學](https://hackmd.io/1OSNS4AtRQ2-j-WrbrOgyg)）

---

# 六角學院 Vue 樣板

> 這是六角學院的 Vue 樣板，是基於 Vite 所建立的專案。

Node.js 版本建議為：18.17.1 以上

## 安裝與使用

以下將會引導你如何安裝此專案到你的電腦上。

### 取得專案

```bash
git clone https://github.com/hexschool/vite-template.git
```

### 移動到專案資料夾

```bash
cd vite-template
```

## 環境變數

請將 `.env.example` 複製一份並命名為 `.env`，並將裡面的環境變數設定為你的值。

```bash
cp .env.example .env
```

### 安裝套件

```bash
npm install
```

### 啟動開發環境

```bash
npm run dev
```

### 打包專案

```bash
npm run build
```

### 部署專案

```bash
npm run deploy
```

## 套件

以下是已經安裝在專案中的套件。

- axios (^1.6.5)
- bootstrap (^5.3.2)
- bootstrap-icons (^1.11.3)
- dotenv (^16.3.1)
- pinia (^2.1.7)
- vue (^3.3.11)
- vue-router (^4.2.5)
- @vitejs/plugin-vue (^4.5.2)
- eslint (^8.49.0)
- eslint-config-standard (^^17.1.0)
- eslint-import-resolver-alias (^1.1.2)
- eslint-plugin-import (^2.29.1)
- eslint-plugin-n (^16.6.2)
- eslint-plugin-promise (^6.1.1)
- eslint-plugin-vue (^9.20.1)
- gh-pages (^6.1.1)
- sass (^1.69.7)
- vite (^5.0.10)
- vite-plugin-eslint (^1.8.1)

## 資料夾結構

- `.vscode`：Visual Studio Code 的設定檔
- `dist`：打包後的檔案
- `public`：公開的靜態檔案
- `src`：專案的程式碼
  - `assets`：靜態檔案
  - `components`：元件
  - `router`：路由
  - `store`：狀態管理
  - `views`：頁面
  - `App.vue`：根元件
  - `main.js`：進入點
- `.env.example`：環境變數範本
- `.eslintrc.js`：ESLint 設定檔
- `.gitignore`：Git 忽略檔案
- `.nvmrc`：Node.js 版本
- `index.html`：進入點 HTML
- `package-lock.json`：套件版本鎖定
- `package.json`：專案資訊
- `README.md`：專案說明
- `vite.config.js`：Vite 設定檔

## gh-pages 部署說明

內建預設是使用 gh-pages 進行部署，因此只需要在專案根目錄下執行以下指令即可。

```bash
npm run deploy
```

（請記得將 `.env` 中的 `REPOSITORY_NAME` 改為你的專案名稱即可。）
