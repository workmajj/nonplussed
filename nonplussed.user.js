// ==UserScript==
// @name Nonplussed
// @namespace https://github.com/workmajj/nonplussed
// @description Shows which private Google Plus fields folks share with you.
// @include http://plus.google.com/*/about
// @include https://plus.google.com/*/about
// @match http://plus.google.com/*/about
// @match https://plus.google.com/*/about
// @version 0.1
// ==/UserScript==

addJQuery(main);

// Chrome doesn't support the @require header, so add jQuery manually:
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src',
        'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = '(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    
    // Determine the text-similarity of two jQuery objects. Used to compare
    // original field's text to possibly re-formatted text returned by API.
    
    function textSimilar($a, $b) {
        return $a.text().replace(/\s+/g, '') == $b.text().replace(/\s+/g, '');
    }
    
    // Don't highlight fields that exactly match Google Plus field titles.
    
    function isTitle($a) {
        fieldTitles = {
            "Introduction": true,
            "Employment": true,
            "Bragging rights": true,
            "Occupation": true,
            "Employment": true,
            "Education": true,
            "Places lived": true,
            "Home": true,
            "Work": true,
            "Relationship": true,
            "Looking for": true,
            "Gender": true,
            "Othernames": true,
            "Nickname": true,
            "Search visibility": true,
            "Links": true
        };
        return $a.text() in fieldTitles;
    }
    
    var url = window.location.href;
    var id = url.match(/plus.google.com\/(\d+)\/about/)[1];
    var api = 'http://query.yahooapis.com/v1/public/yql?'
        + 'q=select * from html where url="' + url + '"&callback=?';
    
    // YQL used to get profile from external context (without cookies). Has
    // the added benefit of being JSONP to get around cross-domain problem.
    
    $.getJSON(api, function(data) {
        
        var container = 'div#' + id + '-about-page';
        var external = $(data.results[0]).find(container).find('*');
        
        // Super efficient O(n^2) loop.
        
        $(container).find('*:visible').filter(function() {
            
            // Filter for leaf nodes (and the first line of the introduction,
            // which is actually not a leaf) that contain text values.
            
            return ($(this).children().length < 1 || $(this).hasClass('note'))
                && (this.textContent || this.innerText);
            
        }).filter(function() {
            
            // Filter for fields that don't appear in the public profile.
            
            var isPrivate = true;
            for (var i = 0; i < external.length; i++) {
                if (textSimilar($(this), $(external[i]))) {
                    isPrivate = false;
                }
            }
            // console.log($(this));
            // console.log(isPrivate);
            return isPrivate && !isTitle($(this));
            
        }).css({'background-color': '#FF3'});
        
    });
    
}
