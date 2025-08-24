"use strict"
function signin(e) {
  e.preventDefault()
  var resource = getResource()
  var target = e.target
  var form = target.form
  var eleMessage = form.querySelector(".message")
  var txtUsername = getElement(form, "username")
  var username = txtUsername.value
  if (username === "") {
    var label = getLabel(txtUsername)
    var msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  var txtPassword = getElement(form, "password")
  var password = txtPassword.value
  if (password === "") {
    var label = getLabel(txtPassword)
    var msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  var map = {
    2: "fail_authentication",
    3: "fail_expired_password",
    4: "fail_locked_account",
    5: "fail_suspended_account",
    6: "fail_disabled_account",
  }
  var url = getCurrentURL()
  var formData = new FormData(form)
  showLoading()
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          localStorage.setItem(resources.token, data.token)
          window.location.href = "/"
        })
      } else {
        if (response.status === 403) {
          response
            .json()
            .then(function (result) {
              var key = map["" + result.status]
              var message = key ? resource[key] : resource.fail_authentication
              showErrorMessage(eleMessage, message)
            })
            .catch(function (err) {
              return handleError(err, resource.error_response_body)
            })
        } else if (response.status === 422) {
          response
            .json()
            .then(function (errors) {
              if (errors && errors.length > 0) {
                showErrorMessage(eleMessage, "" + errors[0].message)
              } else {
                showErrorMessage(eleMessage, resource.fail_authentication)
              }
            })
            .catch(function (err) {
              return handleError(err, resource.error_response_body)
            })
        } else {
          console.error("Error: ", response.statusText)
          alertError(resource.error_submit_failed, response.statusText)
        }
      }
    })
    .catch(function (err) {
      return handleError(err, resource.error_network)
    })
}
