// ==UserScript==
// @name         Github Dashboard Filter
// @description  Minimizes pushs and commits from github actions and bots from github.com dashboard
// @namespace    RyoLee
// @author       RyoLee
// @version      1.0
// @copyright    2022, RyoLee (https://github.com/RyoLee)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @match        https://github.com/
// @updateURL    https://raw.githubusercontent.com/RyoLee/GithubDashboardFilter/master/main.js
// @downloadURL  https://raw.githubusercontent.com/RyoLee/GithubDashboardFilter/master/main.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    function hideBots () {
      document.querySelectorAll('#dashboard div.push:not(.shotBot)').forEach(function (div) {
        const label = div.querySelector('.body .d-flex .d-flex .Label')
        const isAppUrl = div.querySelector('.body .d-flex .d-flex a.Link--primary[href^="/apps/"]')
        if (isAppUrl || (label && label.textContent === 'bot')) {
          div.style.display = 'none'
        }
      })
    }

    hideBots()
    const iv = window.setInterval(hideBots, 200)
    window.setTimeout(() => window.clearInterval(iv), 5000)
    window.setInterval(hideBots, 4000)
  })()