// ==UserScript==
// @name         Github Dashboard Filter
// @description  Minimizes pushs and commits from github actions and bots from github.com dashboard
// @namespace    RyoLee
// @author       RyoLee
// @version      0.2
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

    document.head.appendChild(document.createElement('style')).innerHTML = `
    .Details:hover .newexpanderbutton .Link--secondary {
      color: var(--color-accent-fg) !important;
    }
    `

    function unhideBot (ev) {
      const div = this
      div.classList.add('shotBot')
      div.removeEventListener('click', unhideBot)
      if (div.querySelector('.no-border-bottom')) {
        div.querySelector('.no-border-bottom').classList.replace('no-border-bottom', 'border-bottom')
      }
      div.style.cursor = ''
      if (div.querySelector('.newexpanderbutton')) {
        div.querySelector('.newexpanderbutton').remove()
      }
    }

    function hideBots () {
      const expandButton = document.querySelector('button.js-details-target:not(.Header-link)[aria-expanded="false"]')
      document.querySelectorAll('#dashboard div.push:not(.shotBot)').forEach(function (div) {
        const label = div.querySelector('.body .d-flex .d-flex .Label')
        const isAppUrl = div.querySelector('.body .d-flex .d-flex a.Link--primary[href^="/apps/"]')
        if (isAppUrl || (label && label.textContent === 'bot')) {
          if (div.querySelector('.border-bottom')) {
            div.querySelector('.border-bottom').classList.replace('border-bottom', 'no-border-bottom')
          }
          div.style.cursor = 'row-resize'
          div.addEventListener('click', unhideBot)
          const line = div.querySelector('.Details .flex-column .flex-justify-between.flex-items-baseline')
          if (line && expandButton && !line.querySelector('button.js-details-target')) {
            const newExpandButton = document.createElement('button')
            line.appendChild(newExpandButton)
            newExpandButton.outerHTML = expandButton.outerHTML.replace('js-details-target', 'js-details-target newexpanderbutton')
          }
        }
      })
    }

    hideBots()
    const iv = window.setInterval(hideBots, 200)
    window.setTimeout(() => window.clearInterval(iv), 5000)
    window.setInterval(hideBots, 4000)
  })()