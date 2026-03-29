"use strict"
function openReview(id) {
  var modalDiv = document.getElementById(id)
  if (modalDiv) {
    modalDiv.style.display = "flex"
  }
}
function cancelReview(id) {
  var modalDiv = document.getElementById(id)
  if (modalDiv) {
    modalDiv.style.display = "none"
  }
}
function submitReview(e) {
  e.preventDefault()
  var btn = e.target
  var form = btn.form
  if (form) {
    var review = getValue(form, "review")
    var picker = form.querySelector(".star-picker")
    if (picker) {
      var v = picker.dataset.v
      if (!v) {
        alert("Please select rating")
      } else {
        var rate = parseInt(v, 10)
        var obj = { rate: rate, review: review }
        console.log("Object " + JSON.stringify(obj))
        var modal = findParent(form, "modal-bg")
        if (modal) {
          modal.style.display = "none"
        }
      }
    }
  }
}
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
