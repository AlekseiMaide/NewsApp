"use strict";

window.addEventListener("load", function(){
    
    var newsApp = new NewsApp();
    newsApp.init({
        parentNodeSelector: ".news-app-container"
    });
    
}, false);
