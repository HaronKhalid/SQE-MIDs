/* Start-up: build navigation, topic cards, lesson links, progress, open the page from the URL */
buildNav();setupTopics();addTopicLinks();progress();
go((location.hash||"#home").slice(1));
