"use strict"
function signup(e) {
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
  var txtEmail = getElement(form, "email")
  var emailLabel = getLabel(txtEmail)
  var email = txtEmail.value
  if (email === "") {
    var msg = format(resource.error_required, emailLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!isEmail(email)) {
    var msg = format(resource.error_email, emailLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  var txtPassword = getElement(form, "password")
  var passwordLabel = getLabel(txtPassword)
  var password = txtPassword.value
  if (password === "") {
    var msg = format(resource.error_required, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!resources.password.test(password)) {
    var msg = format(resource.error_password, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  var txtConfirmPassword = getElement(form, "confirmPassword")
  var confirmPassword = txtConfirmPassword.value
  if (confirmPassword !== password) {
    var label = getLabel(txtConfirmPassword)
    var msg = format(resource.error_equal, label, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  var url = getCurrentURL()
  var user = { username: username, email: email, password: password }
  showLoading()
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then(function (response) {
      if (response.ok) {
        showInfoMessage(eleMessage, resource.success_sign_up)
      } else {
        if (response.status === 409 || response.status === 422) {
          response
            .json()
            .then(function (errors) {
              if (Array.isArray(errors) && errors && errors.length > 0) {
                showErrorMessage(eleMessage, "" + errors[0].message)
              } else {
                showErrorMessage(eleMessage, resource.fail_sign_up)
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
