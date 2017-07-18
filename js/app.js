"use strict";

window.addEventListener("load", function(){
    
    //Start the news app
    var newsApp = new NewsApp();
    newsApp.init({
        parentNodeSelector: ".news-app-container",
        sectionId: 2429,
        queryLimit: 5,
    });
    
    //Attach event to next article button to sroll the page by one viewport height
    var nextArticleBtn = document.querySelector(".next-article-btn");
    nextArticleBtn.addEventListener("click", function() {
        
        //TODO: Add smooth scrolling animation.
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        window.scroll(0, height);

    }, false);
    
}, false);
