// ==UserScript==
// @name         Telegram WebApp Platform Modifier
// @namespace    https://github.com/hongshibao
// @version      2024-10-05
// @description  Allows you to run Telegram WebApps in the web version of Telegram by modifying the platform parameter (tgWebAppPlatform).
// @author       thinkpoet
// @match        https://web.telegram.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function modifyIframeSrc(iframe) {
      let src = iframe.getAttribute('src')
      if (src && src.includes('tgWebAppPlatform=')) {
        const newSrc = src.replace(/tgWebAppPlatform=[^&]*/, 'tgWebAppPlatform=android')
        iframe.setAttribute('src', newSrc)
      }
    }

    function handleMutations(mutationsList) {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            try {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const iframe = node.getElementsByTagName('iframe')[0]
                if (iframe) modifyIframeSrc(iframe)
              }
            } catch (error) {
              console.error(
                '[Telegram WebApp Platform Modifier]: error while changing the tgWebAppPlatform parameter',
                error
              )
            }
          })
        } else if (mutation.type === 'attributes' && mutation.target.nodeName === 'IFRAME') {
          modifyIframeSrc(mutation.target)
        }
      })
    }

    const observer = new MutationObserver(handleMutations)

      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        })
      } else {
        console.error('[Telegram WebApp Platform Modifier]: document.body is not ready.')
      }
})();
