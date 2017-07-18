var NewsApp = function () {

    var parentNode, responseObj, articleNode, htmlString, articleNum, articleSideClass, articleLeadClass;

    function init(options) {
        parentNode = document.querySelector(options.parentNodeSelector);
        requestArticles();
    }

    populateArticles = function () {
        responseObj = JSON.parse(this.responseText);
        console.log(responseObj);
        for (i = 0; i < responseObj.length; i++) {

            articleNum = i + 1;

            //based on if arcticle number is odd/even attach different classes.
            if (articleNum % 2 == 0) {
                articleSideClass = "article-side-2";
                articleLeadClass = "article-lead-2";
            } else {
                articleSideClass = "article-side-1";
                articleLeadClass = "article-lead-1";
            }

            //construct the html string to append the article element.
            htmlString = `

    <img src='` + responseObj[i].thumbnail.sources.landscape.medium + `' class='article-image'>
    <div class='article-headline'>` + responseObj[i].headline + `</div>
    <div class='` + articleLeadClass + `'>` + responseObj[i].articleLead[0].html + `</div>
    <div class='` + articleSideClass + `'>
        <div class='article-num'>` + articleNum + `</div>
    </div>`;

            //create new element for the article and assign its innerHtml to htmlString
            articleNode = document.createElement('article');
            articleNode.classList.add("news-article");
            parentNode.appendChild(articleNode);
            articleNode.innerHTML = htmlString;
        }
    }

    requestArticles = function () {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", populateArticles);
        oReq.addEventListener("error", reqFailed);
        oReq.open("GET", "https://services.postimees.ee/rest/v1/sections/2429/articles?limit=5");
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
