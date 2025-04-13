"use strict"
function signin(e) {
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
  const txtPassword = getElement(form, "password")
  const password = txtPassword.value
  if (password === "") {
    const label = getLabel(txtPassword)
    const msg = format(resource.error_required, label)
    showErrorMessage(eleMessage, msg)
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
  showLoading()
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
          response
            .json()
            .then((result) => {
              let key = map["" + result.status]
              const message = key ? resource[key] : resource.fail_authentication
              showErrorMessage(eleMessage, message)
            })
            .catch((err) => handleError(err, resource.error_response_body))
        } else if (response.status === 422) {
          response
            .json()
            .then((errors) => {
              if (errors && errors.length > 0) {
                showErrorMessage(eleMessage, "" + errors[0].message)
              } else {
                showErrorMessage(eleMessage, resource.fail_authentication)
              }
            })
            .catch((err) => handleError(err, resource.error_response_body))
        } else {
          console.error("Error: ", response.statusText)
          alertError(resource.error_submit_failed, response.statusText)
        }
      }
    })
    .catch((err) => handleError(err, resource.error_network))
}
