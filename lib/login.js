"use strict"
function login(e) {
  e.preventDefault()
  const target = e.target
  const form = target.form
  const txtUsername = getElement(form, "username")
  const username = txtUsername.value
  if (username === "") {
    const label = getLabel(txtUsername)
    const msg = format(resource["error_required"], label)
    showErrorMessage(form, msg)
    return
  }
  const txtPassword = getElement(form, "password")
  const password = txtPassword.value
  if (password === "") {
    const label = getLabel(txtPassword)
    const msg = format(resource["error_required"], label)
    showErrorMessage(form, msg)
    return
  }
  const map = {
    2: "fail_authentication",
    3: "fail_expired_password",
    4: "fail_locked_account",
    5: "fail_suspended_account",
    6: "fail_disabled_account",
  }
  const url = getCurrentURL()
  const formData = new FormData(form)
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          localStorage.setItem(resources.token, data.token)
          window.location.href = "/"
        })
      } else {
        if (response.status === 403) {
          response.json().then((result) => {
            let key = map["" + result.status]
            const message = key ? resource[key] : resource.fail_authentication
            showErrorMessage(form, message)
          })
        } else if (response.status === 422) {
          response.json().then((errors) => {
            if (errors && errors.length > 0) {
              showErrorMessage(form, "" + errors[0].message)
            } else {
              showErrorMessage(form, resource.fail_authentication)
            }
          })
        } else {
          console.error("Error: ", response.statusText)
          alertError(resource.error_submit_failed, undefined, undefined, response.statusText)
        }
      }
    })
    .catch((err) => {
      hideLoading()
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, undefined, undefined, err)
    })
}
