"use strict"
function changePassword(e) {
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
  var txtCurrentPassword = getElement(form, "currentPassword")
  var currentPassword = txtCurrentPassword.value
  if (currentPassword === "") {
    var label = getLabel(txtCurrentPassword)
    var msg = format(resource.error_required, label)
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
  var user = { username: username, currentPassword: currentPassword, password: password }
  var txtPasscode = getElement(form, "passcode")
  if (!isHidden(txtPasscode)) {
    var passcode = txtPasscode.value
    if (passcode === "") {
      var label = getLabel(txtPasscode)
      var msg = format(resource.error_required, label)
      showErrorMessage(eleMessage, msg)
      return
    }
    user.passcode = passcode
    user.step = 2
  }
  var url = getCurrentURL()
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (result) {
          if (result) {
            showInfoMessage(eleMessage, resource.success_change_password)
          } else {
            showErrorMessage(eleMessage, resource.fail_change_password)
          }
        })
      } else {
        if (response.status === 401) {
          response
            .text()
            .then(function (msg) {
              showErrorMessage(eleMessage, msg)
            })
            .catch(function (err) {
              return handleError(err, resource.error_response_body)
            })
        } else if (response.status === 409) {
          showErrorMessage(eleMessage, resource.password_duplicate)
        } else if (response.status === 403) {
          if (isHidden(txtPasscode.parentElement)) {
            hideElement(txtCurrentPassword.parentElement)
            hideElement(txtPassword.parentElement)
            hideElement(txtConfirmPassword.parentElement)
            unhideElement(txtPasscode.parentElement)
          } else {
            showErrorMessage(eleMessage, resource.msg_passcode_incorrect)
          }
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
function forgotPassword(e) {
  e.preventDefault()
  var resource = getResource()
  var target = e.target
  var form = target.form
  var eleMessage = form.querySelector(".message")
  var txtContact = getElement(form, "contact")
  var contact = txtContact.value
  if (contact === "") {
    var label = getLabel(txtContact)
    var msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!isEmail(contact) && !isUsername(contact)) {
    showErrorMessage(eleMessage, resource.error_contact_exp)
    return
  }
  var url = getCurrentURL()
  var user = { contact: contact }
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then(function (response) {
      if (response.ok) {
        showInfoMessage(eleMessage, resource.success_forgot_password)
      } else {
        if (response.status === 404) {
          showErrorMessage(eleMessage, resource.fail_forgot_password)
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
function resetPassword(e) {
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
  var txtPasscode = getElement(form, "passcode")
  var passcode = txtPasscode.value
  if (passcode === "") {
    var label = getLabel(txtPasscode)
    var msg = format(resource.error_required, label)
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
  var user = { username: username, passcode: passcode, password: password }
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then(function (response) {
      if (response.ok) {
        showInfoMessage(eleMessage, resource.success_reset_password)
      } else {
        if (response.status === 401) {
          response
            .text()
            .then(function (msg) {
              showErrorMessage(eleMessage, msg)
            })
            .catch(function (err) {
              return handleError(err, resource.error_response_body)
            })
        } else if (response.status === 409) {
          showErrorMessage(eleMessage, resource.password_duplicate)
        } else if (response.status === 403) {
          showErrorMessage(eleMessage, resource.fail_reset_password)
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
