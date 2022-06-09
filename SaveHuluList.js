// ==UserScript==
// @name         SaveHuluList
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  sync Hulu/mystuff accross profile and account
// @author       You
// @match        https://www.hulu.com/my-stuff
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hulu.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => {
        var list = document.getElementsByClassName("Tile__title Tile__title--clickable");
        console.log(list.length)
        if (list.length) {
            var id = Array();
            for (var anchor of list) {
                id.push(anchor.href.split("-").slice(-5).join("-"));
            }
            localStorage.setItem("list", JSON.stringify(id));
        } else {
            // console.log("here");
            var id = JSON.parse(localStorage.getItem("list"));
            // console.log(id);
            for (var k of id) {
                fetch('https://client.hulu.com/user/v1/bookmarks', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ 'ids': ["EAB::" + k + "::NULL::NULL"] }
                    )
                });
            }
        }
    }, 1000);
})();
