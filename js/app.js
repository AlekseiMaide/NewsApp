"use strict";

(function () {

    fetch('https://services.postimees.ee/rest/v1/sections/2429/articles?limit=5')
        .then((resp) => resp.json())
        .then(function (response) {
            console.log(response);
        }).catch(function (err) {
            // Error :(
        });

    fetch('https://services.postimees.ee/rest/v1/articles/4180767')
        .then((resp) => resp.json())
        .then(function (response) {
            console.log(response);
        }).catch(function (err) {
            // Error :(
        });

})();
