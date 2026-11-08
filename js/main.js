/* Start-up: build navigation, topic cards, progress, open the page from the URL */
buildNav();setupTopics();progress();
go((location.hash||"#home").slice(1));
