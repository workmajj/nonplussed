Nonplussed
==========

Shows which private Google Plus fields folks share with you.

Contact
-------

John J. Workman ([@workmajj](https://twitter.com/workmajj))

Description
-----------

Nonplussed is a simple [userscript](http://wiki.greasespot.net/User_script) that runs natively in Chrome, in Firefox under [Greasemonkey](http://www.greasespot.net/), and in Safari under [GreaseKit](http://8-p.info/greasekit/).

As you browse [Google Plus](https://plus.google.com/), Nonplussed highlights any private fields your contacts choose to share with you. Knowing which fields you can see lets you infer what flavor [circles](https://www.google.com/intl/en-US/+/learnmore/index.html#circles) they've placed you in. (The script does this by comparing pages you see while logged in to public versions [fetched via proxy](http://stackoverflow.com/questions/1176668/how-to-use-yql-to-retrieve-web-results).)

(The script will add HTTP resources to HTTPS pages. If your preferences disallow this, you'll need to change them in order to try Nonplussed.)

Installation & Usage
--------------------

1. [Download](https://github.com/workmajj/nonplussed/raw/master/nonplussed.user.js) the script. On Chrome you'll be prompted to install it immediately; on Firefox or Safari you'll need to get Greasemonkey or GreaseKit first.

2. Log in to Google Plus and navigate to your own About page.

3. Nonplussed will highlight any non-public fields you've completed (i.e., you share all your private fields with yourself).

4. Now navigate to the About pages of folks who've placed you in their circles. Any private fields they've chosen to share with you will be highlighted. If you want to confirm what the script shows, you can copy the URL of a profile into another browser (where you're not logged in) and examine the delta.

[License](http://en.wikipedia.org/wiki/BSD_licenses#3-clause_license_.28.22New_BSD_License.22_or_.22Modified_BSD_License.22.29)
-------

Copyright (c) 2011, John J. Workman. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* The names of its contributors may not be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
