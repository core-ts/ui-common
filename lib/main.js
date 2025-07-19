"use strict"
resources.load = function (pageBody) {
  const codeBlocks = pageBody.querySelectorAll("code")
  for (let i = 0; i < codeBlocks.length; i++) {
    Prism.highlightElement(codeBlocks[i])
  }
}
