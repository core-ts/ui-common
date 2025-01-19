"use strict"
function changePassword(e) {
  e.preventDefault()
  const resource = getResource()
  const target = e.target
  const form = target.form
  const eleMessage = form.querySelector(".message")
  const txtUsername = getElement(form, "username")
  const username = txtUsername.value
  if (username === "") {
    const label = getLabel(txtUsername)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtCurrentPassword = getElement(form, "currentPassword")
  const currentPassword = txtCurrentPassword.value
  if (currentPassword === "") {
    const label = getLabel(txtCurrentPassword)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtPassword = getElement(form, "password")
  const passwordLabel = getLabel(txtPassword)
  const password = txtPassword.value
  if (password === "") {
    const msg = format(resource.error_required, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!resources.password.test(password)) {
    const msg = format(resource.error_password, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtConfirmPassword = getElement(form, "confirmPassword")
  const confirmPassword = txtConfirmPassword.value
  if (confirmPassword !== password) {
    const label = getLabel(txtConfirmPassword)
    const msg = format(resource.error_equal, label, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  const user = { username, currentPassword, password }
  const txtPasscode = getElement(form, "passcode")
  if (!isHidden(txtPasscode)) {
    const passcode = txtPasscode.value
    if (passcode === "") {
      const label = getLabel(txtPasscode)
      const msg = format(resource.error_required, label)
      showErrorMessage(eleMessage, msg)
      return
    }
    user.passcode = passcode
    user.step = 2
  }
  const url = getCurrentURL()
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          if (result) {
            showInfoMessage(eleMessage, resource.success_change_password)
          } else {
            showErrorMessage(eleMessage, resource.fail_change_password)
          }
        })
      } else {
        if (response.status === 401) {
          response.text().then((msg) => {
            showErrorMessage(eleMessage, msg)
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
    .catch((err) => {
      hideLoading()
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, err)
    })
}
function forgotPassword(e) {
  e.preventDefault()
  const resource = getResource()
  const target = e.target
  const form = target.form
  const eleMessage = form.querySelector(".message")
  const txtContact = getElement(form, "contact")
  const contact = txtContact.value
  if (contact === "") {
    const label = getLabel(txtContact)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!isEmail(contact) && !isUsername(contact)) {
    showErrorMessage(eleMessage, resource.error_contact_exp)
    return
  }
  const url = getCurrentURL()
  const user = { contact }
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          showInfoMessage(eleMessage, resource.success_forgot_password)
        })
      } else {
        if (response.status === 404) {
          showErrorMessage(eleMessage, resource.fail_forgot_password)
        } else {
          console.error("Error: ", response.statusText)
          alertError(resource.error_submit_failed, response.statusText)
        }
      }
    })
    .catch((err) => {
      hideLoading()
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, err)
    })
}
function resetPassword(e) {
  e.preventDefault()
  const resource = getResource()
  const target = e.target
  const form = target.form
  const eleMessage = form.querySelector(".message")
  const txtUsername = getElement(form, "username")
  const username = txtUsername.value
  if (username === "") {
    const label = getLabel(txtUsername)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtPasscode = getElement(form, "passcode")
  const passcode = txtPasscode.value
  if (passcode === "") {
    const label = getLabel(txtPasscode)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtPassword = getElement(form, "password")
  const passwordLabel = getLabel(txtPassword)
  const password = txtPassword.value
  if (password === "") {
    const msg = format(resource.error_required, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!resources.password.test(password)) {
    const msg = format(resource.error_password, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  const txtConfirmPassword = getElement(form, "confirmPassword")
  const confirmPassword = txtConfirmPassword.value
  if (confirmPassword !== password) {
    const label = getLabel(txtConfirmPassword)
    const msg = format(resource.error_equal, label, passwordLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  const url = getCurrentURL()
  const user = { username, passcode, password }
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        showInfoMessage(eleMessage, resource.success_reset_password)
      } else {
        if (response.status === 401) {
          response.text().then((msg) => {
            showErrorMessage(eleMessage, msg)
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
    .catch((err) => {
      hideLoading()
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, err)
    })
}
