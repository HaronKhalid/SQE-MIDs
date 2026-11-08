/* Start-up: build tabs, topic buttons, progress, open the page from URL hash */
/* ---------- init ---------- */
buildTabs();setupTopics();progress();
go((location.hash||"#home").slice(1));
