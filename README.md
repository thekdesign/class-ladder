# 台灣社會階層自我評估測驗（class-ladder）

用社會學家 Bourdieu 的**三種資本（經濟 / 文化 / 社會）**拆解 privilege（特權），12 道題算出你在台灣社會結構中的實質定位與「特權 PR」。
四個級距（生存防守 / 中產陣痛 / 翻身 / 頂層，總分 12–60）的邊界與結果文案，都對照**主計總處、內政部不動產資訊平台、財政部**的真實統計校準 —— 不只是心理測驗。

純前端、無後端、所有作答只存在瀏覽器（localStorage），不上傳、不蒐集。

## 技術棧

Vue 3.5 + Vue Router 4 + Pinia 3 + Vite 7 + vite-ssg + Tailwind 3（preflight off）+ SCSS。
架構沿用 `Sides/VueProjects/ARCHITECTURE.md` 模板，視覺走「冷靜數據感」（深藍墨底 + 青色強調 + 四階層光譜）。

## 開發

```bash
nvm use            # .nvmrc 寫死 v22（build 必須 ≥22）
npm install
npm run serve      # http://localhost:8085
npm run production  # vite-ssg prerender，輸出到 public/
npm run images     # 改了 favicon.svg / og-image.svg 後重產 PNG
npm run lint
```

## 結構重點

| 路徑 | 作用 |
| --- | --- |
| `resources/js/data/questions.js` | 12 題題庫＝3 種資本×4 題（含對照真實數據的選項註記） |
| `resources/js/data/tiers.js` | 四個級距：稱號、文案、戰術、錨定的數據 id |
| `resources/js/data/stats.js` | 真實統計數字 + 來源（`SOURCES`） |
| `resources/js/libs/score.js` | 純計分邏輯（總分、級距、構面拆解） |
| `resources/js/stores/quiz/quiz.js` | Pinia store：作答狀態 + localStorage 持久化 |
| `resources/js/components/pages/` | home / quiz / result / data / 404 |

## 頁面

- `/` 首頁：四階層光譜 + 構面說明 + 真實數據 teaser
- `/quiz` 作答：一次一題、進度條、選完自動前進
- `/result` 結果：階層定位 + 特權 PR + 光譜標記 + 三資本 PR 長條 + 對照真實數據（含出處）+ 翻轉建議 + 分享卡
- `/data` 數據出處與方法：每個數字的來源與口徑說明、誠實提醒

## 數據口徑提醒

個人薪資（受僱員工全年總薪資中位數 52.5 萬，2023）與家戶可支配所得（中位數 98.5 萬，2024）是**不同口徑**，勿混用。
頂層級避免使用無官方出處的「前 1% 門檻」，改用「最富 20% 平均淨值 5,133 萬」與「綜所稅 40% 級距 498 萬」這兩個有來源的錨點。詳見 `/data` 頁與 `data/stats.js`。
