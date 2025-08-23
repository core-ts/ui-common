"use strict"
window.onload = function () {
  setTimeout(function () {
    var _a
    const page = document.getElementById("pageContainer")
    if (page) {
      const forms = page.querySelectorAll("form")
      for (let i = 0; i < forms.length; i++) {
        registerEvents(forms[i])
      }
      setTimeout(function () {
        const msg = getHiddenMessage(forms, resources.hiddenMessage, 1)
        if (msg && msg.length > 0) {
          toast(msg)
        }
      }, 0)
    }
    const pageBody = document.getElementById("pageBody")
    if (pageBody) {
      setTimeout(function () {
        resources.load(pageBody)
      }, 0)
    }
    const sysNav = document.getElementById("sysNav")
    if (sysNav) {
      const firstPath = getFirstPath(window.location.origin + window.location.pathname)
      const activePath = window.location.origin + firstPath
      const elA = sysNav.querySelectorAll("a")
      const l = elA.length
      for (let i = 0; i < l; i++) {
        if (elA[i].href === activePath) {
          const parent = elA[i].parentElement
          if (parent) {
            parent.classList.add("active")
            const pp = (_a = parent.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement
            if (pp && pp.nodeName === "LI") {
              pp.classList.add("active")
            }
          }
          return
        }
      }
    }
  }, 0)
}
