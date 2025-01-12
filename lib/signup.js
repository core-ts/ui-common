"use strict"
function signup(e) {
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
  const txtEmail = getElement(form, "email")
  const emailLabel = getLabel(txtEmail)
  const email = txtEmail.value
  if (email === "") {
    const msg = format(resource.error_required, emailLabel)
    showErrorMessage(eleMessage, msg)
    return
  }
  if (!isEmail(email)) {
    const msg = format(resource.error_email, emailLabel)
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
  const user = { username, email, password }
  fetch(url, {
    method: "POST",
    headers: getHttpHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        showInfoMessage(eleMessage, resource.success_sign_up)
      } else {
        if (response.status === 409 || response.status === 422) {
          response.json().then((errors) => {
            if (Array.isArray(errors) && errors && errors.length > 0) {
              showErrorMessage(eleMessage, "" + errors[0].message)
            } else {
              showErrorMessage(eleMessage, resource.fail_sign_up)
            }
          })
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
