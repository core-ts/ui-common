"use strict"
function starOnMouseEnter(e) {
  var star = e.target
  var picker = star.parentElement
  var value = Number(star.dataset.v)
  var starts = picker.querySelectorAll("span")
  highlight(starts, value)
}
function starOnMouseLeave(e) {
  var star = e.target
  var picker = star.parentElement
  var value = Number(picker.dataset.v ? picker.dataset.v : 0)
  var starts = picker.querySelectorAll("span")
  highlight(starts, value)
}
function starOnClick(e) {
  var star = e.target
  var picker = star.parentElement
  picker.childNodes
  picker.setAttribute("data-v", star.dataset.v)
  var value = Number(star.dataset.v)
  var starts = picker.querySelectorAll("span")
  highlight(starts, value)
}
function highlight(stars, r) {
  stars.forEach(function (s) {
    return s.classList.toggle("active", r >= s.dataset.v)
  })
}
