"use strict"
window.onload = function () {
  var pageBody = document.getElementById("pageBody")
  if (pageBody) {
    pageBody.querySelectorAll("script").forEach(function (oldScript) {
      var scriptId = oldScript.getAttribute("id")
      if (scriptId && scriptId.length > 0) {
        cacheScript.set(scriptId, "Y")
      }
    })
  }
  setTimeout(function () {
    var _a
    var page = document.getElementById("pageContainer")
    if (page) {
      var forms_1 = page.querySelectorAll("form")
      for (var i = 0; i < forms_1.length; i++) {
        registerEvents(forms_1[i])
      }
      setTimeout(function () {
        var msg = getHiddenMessage(forms_1, resources.hiddenMessage, 1)
        if (msg && msg.length > 0) {
          toast(msg)
        }
      }, 0)
    }
    if (pageBody) {
      setTimeout(function () {
        if (resources.load) {
          resources.load(pageBody)
        }
      }, 0)
    }
    var sysNav = document.getElementById("sysNav")
    if (sysNav) {
      var firstPath = getFirstPath(window.location.origin + window.location.pathname)
      var activePath = window.location.origin + firstPath
      var elA = sysNav.querySelectorAll("a")
      var l = elA.length
      for (var i = 0; i < l; i++) {
        if (elA[i].href === activePath) {
          var parent_1 = elA[i].parentElement
          if (parent_1) {
            parent_1.classList.add("active")
            var pp = (_a = parent_1.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement
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
