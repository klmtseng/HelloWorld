# HelloWorld

## 專案簡介
HelloWorld 是一個可快速擴充的範本專案，目標是提供乾淨、可維護且容易上手的起點，讓團隊在最短時間內建立新服務或新功能。

## 前端方案選型
本專案目前採用 **純 HTML / CSS / JavaScript**，優點是：
- 部署簡單（純靜態檔案即可）。
- 無需建置工具，適合作為個人首頁與作品集起點。
- 後續可平滑升級至 React/Vite（若需要元件化與更複雜狀態管理）。

## 目標
- 建立一致的專案骨架與開發流程。
- 以清楚文件降低新成員加入成本。
- 保持可測試、可演進、可維護。

## 快速開始
1. 複製專案
   ```bash
   git clone <your-repo-url>
   cd HelloWorld
   ```
2. 啟動開發環境（靜態網站）
   ```bash
   python3 -m http.server 8000
   ```
3. 開啟瀏覽器
   ```text
   http://localhost:8000/
   ```

## 如何在本機啟動
```bash
python3 -m http.server 8000
```

## 研究/架構模板與半自動化輸入
首頁提供兩種更新方式：
- **模板貼上**：可直接複製「可複製模板（Markdown）」區塊，將新研究或架構內容依欄位補齊後保存。
- **選項式輸入**：點擊「新增紀錄（半自動）」會開啟獨立對話視窗，依序選擇類型、輸入標題/問題/決策/標籤，送出後自動加載到首頁。

> 新增的紀錄會存放在瀏覽器 `localStorage`，重新整理頁面後仍可保留（同一瀏覽器/同一裝置）。

## 如何執行測試
> 目前為靜態網站，暫無自動化測試；可先用基本檢查確認檔案完整。

```bash
# 檢查首頁檔案是否存在
test -f index.html && test -f src/main.js
```

## 目錄結構
```text
HelloWorld/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── docs/
│   └── content-plan.md
├── src/
│   ├── assets/
│   ├── index.html
│   ├── main.js
│   └── styles.css
└── tests/
```

## 部署說明（GitHub Pages）
1. 將專案推送至 GitHub Repository。
2. 進入 **Settings → Pages**。
3. 在 **Build and deployment** 選擇：
   - Source: `Deploy from a branch`
   - Branch: `main`（或你的預設分支）
   - Folder: `/ (root)`
4. 儲存後，等待 GitHub Pages 建置完成。
5. 造訪網站：
   ```text
   https://<your-username>.github.io/<repo-name>/
   ```

> 專案根目錄的 `index.html` 為正式首頁，並透過 `./src/` 內的樣式與素材載入內容。

## 其他靜態託管選項
- **Netlify**：連接 GitHub repo 後直接部署，Build command 留空、Publish directory 設為專案 root（預設）。
- **Cloudflare Pages**：匯入 GitHub repo，Build command 留空、Output directory 設為專案 root（預設）。

## Roadmap
- [x] 建立基礎專案結構與核心文件。
- [x] 補齊首頁 MVP（自我介紹、技能、作品、聯絡方式）。
- [x] 新增部署文件與內容更新規劃。
- [ ] 新增 CI（Lint / Test / Build）。
- [ ] 補齊更完整的作品案例與技術文章。
