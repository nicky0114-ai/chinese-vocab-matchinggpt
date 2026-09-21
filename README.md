# 生字語詞限時闖關

開啟 `index.html`，選擇教師或學生模式即可本機測試。請用兩個瀏覽器分頁分別開啟 `teacher.html` 和 `student.html`；學生選組後，教師可派送「裁、茂、藤、免」四個示範生字。

目前使用 LocalStorage 和 BroadcastChannel 作為單一瀏覽器測試同步。正式跨平板使用前，請建立 Firebase Realtime Database，並依 `firebase-config.example.js` 加入專案設定與資料庫存取規則。
