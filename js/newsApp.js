var NewsApp = function () {

    var parentNode, responseObj, articleNode, htmlString, articleNum, articleSideClass, articleLeadClass, articleNumClass, articleHeadClass;

    function init(options) {
        parentNode = document.querySelector(options.parentNodeSelector);
        requestArticles(options);
    }

    populateArticles = function () {
        responseObj = JSON.parse(this.responseText);

        for (i = 0; i < responseObj.length; i++) {

            articleNum = i + 1;

            defineArticleStyles();
            constructArticleHtml();
            createArticle();
        }
    }

    defineArticleStyles = function () {
        //based on if arcticle number is odd/even attach different classes.
        if (articleNum % 2 == 0) {
            articleSideClass = "article-side-2";
            articleLeadClass = "article-lead-2";
            articleNumClass = "article-num-2";
            articleHeadClass = "article-headline-2";
        } else {
            articleSideClass = "article-side-1";
            articleLeadClass = "article-lead-1";
            articleNumClass = "article-num-1";
            articleHeadClass = "article-headline-1";
        }
    }

    constructArticleHtml = function () {
        //construct the html string to append to the article element.
        htmlString = "<img src=" + responseObj[i].thumbnail.sources.landscape.medium + " class='article-image'> \
            <div class='article-headline " + articleHeadClass + "'>" + responseObj[i].headline + "</div> \
            <div class='article-lead " + articleLeadClass + "'>" + responseObj[i].articleLead[0].html + "</div> \
            <div class='article-side " + articleSideClass + "'> <div class='article-num " + articleNumClass + "'>" + articleNum + "</div></div>";
    }

    createArticle = function () {
        //create new element for the article and assign its innerHtml to htmlString
        articleNode = document.createElement('article');
        articleNode.classList.add("news-article");
        parentNode.appendChild(articleNode);
        articleNode.innerHTML = htmlString;

        //add data-id attribute to identify the article.
        articleNode.dataset.id = responseObj[i].id

        //attach article events
        articleNode.addEventListener('click', articleClick, false);
    }

    articleClick = function (event) {
        window.location.href = "http://reisile.postimees.ee/" + this.dataset.id;
    }

    requestArticles = function (options) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", populateArticles);
        oReq.addEventListener("error", reqFailed);
        oReq.open("GET", "https://services.postimees.ee/rest/v1/sections/" + options.sectionId + "/articles?limit=" + options.queryLimit);
        oReq.send();
    }

    reqFailed = function (error) {
        //Ajax request error handling
        console.log("Ajax request error  " + error);
    }

    //return PUBLIC MEMBERS
    return {
        init: init
    };
};
