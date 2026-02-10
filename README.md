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
   http://localhost:8000/src/
   ```

## 如何在本機啟動
```bash
python3 -m http.server 8000
```

## 如何執行測試
> 目前為靜態網站，暫無自動化測試；可先用基本檢查確認檔案完整。

```bash
# 檢查首頁檔案是否存在
test -f src/index.html
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
   https://<your-username>.github.io/<repo-name>/src/
   ```

> 若你希望網址不帶 `/src/`，可將靜態入口移至根目錄（例如 `index.html` 放在專案 root）後再部署。

## 其他靜態託管選項
- **Netlify**：連接 GitHub repo 後直接部署，Build command 留空、Publish directory 設為 `src`。
- **Cloudflare Pages**：匯入 GitHub repo，Build command 留空、Output directory 設為 `src`。

## Roadmap
- [x] 建立基礎專案結構與核心文件。
- [x] 補齊首頁 MVP（自我介紹、技能、作品、聯絡方式）。
- [x] 新增部署文件與內容更新規劃。
- [ ] 新增 CI（Lint / Test / Build）。
- [ ] 補齊更完整的作品案例與技術文章。
