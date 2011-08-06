// ==UserScript==
// @name Nonplussed
// @namespace https://github.com/workmajj/nonplussed
// @description Shows which private Google Plus fields folks share with you.
// @include http://plus.google.com/*
// @include https://plus.google.com/*
// @match http://plus.google.com/*
// @match https://plus.google.com/*
// @version 0.2
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
    
    // Page changes in Google Plus happen via Ajax, so the script needs to run
    // on all Plus pages and then test whether an About section is active (the
    // Ajax changes won't re-run the userscript). General technique cribbed
    // from this explanation: http://stackoverflow.com/questions/3042264/
    
    var reloadTimer = '';
    var isListenerInstalled = false;
    
    highlight();
    
    function reload(e) {
        if (e.target.id && e.target.id.match(/\d+\-about\-page/))
        {
            if (typeof reloadTimer == "number") {
                clearTimeout(reloadTimer);
                reloadTimer = '';
            }
            reloadTimer = setTimeout(function() {
                highlight();
            }, 100);
        }
    }
    
    // jQuery function to determine path of an object:
    // http://stackoverflow.com/questions/2068272/
    
    jQuery.fn.getPath = function() {
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) {
                break;
            }
            name = name.toLowerCase();
            if (realNode.id) {
                return name + '#' + realNode.id + (path ? '>' + path : '');
            }
            else if (realNode.className) {
                name += '.' + realNode.className.split(/\s+/).join('.');
            }
            var parent = node.parent(), siblings = parent.children(name);
            if (siblings.length > 1) {
                name += ':eq(' + siblings.index(node) + ')';
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    }
    
    // Don't highlight fields that exactly match Google Plus field titles.
    
    jQuery.fn.isTitle = function() {
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
        return this.text() in fieldTitles;
    }
    
    function highlight() {
        
        if (!isListenerInstalled) {
            isListenerInstalled = true;
            document.addEventListener('DOMSubtreeModified', reload, false);
        }
        
        var url = window.location.href;
        
        if (!url.match(/plus.google.com\/\d+\/about/)) {
            return;
        }
        
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
                
                // Filter for leaf nodes (except for the introduction, which
                // isn't a leaf) that contain text and aren't field titles.
                
                return ($(this).children().length < 1
                        || $(this).hasClass('note'))
                    && !$(this).parent().hasClass('note')
                    && $(this).text()
                    && !$(this).isTitle();
                
            }).filter(function() {
                
                // Filter for fields that don't appear in the public profile.
                
                var isPrivate = true;
                var i = 0;
                while (i < external.length) {
                    if ($(this).getPath() == $(external[i]).getPath()) {
                        isPrivate = false;
                        break;
                    }
                    i++;
                }
                return isPrivate;
                
            }).css({'background-color': '#FF3'});
            
        });
        
    }
    
}
