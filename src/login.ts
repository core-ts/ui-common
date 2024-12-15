interface LoginResult {
  status: number
}
interface LoginData {
  token: string
}
function login(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLButtonElement
  const form = target.form as HTMLFormElement
  const txtUsername = getElement(form, "username") as HTMLInputElement
  const username = txtUsername.value
  if (username === "") {
    const label = getLabel(txtUsername)
    const msg = format(resource["error_required"], label)
    showErrorMessage(form, msg)
    return
  }
  const txtPassword = getElement(form, "password") as HTMLInputElement
  const password = txtPassword.value
  if (password === "") {
    const label = getLabel(txtPassword)
    const msg = format(resource["error_required"], label)
    showErrorMessage(form, msg)
    return
  }
  const map: StringMap = {
    "2": "fail_authentication",
    "3": "fail_expired_password",
    "4": "fail_locked_account",
    "5": "fail_suspended_account",
    "6": "fail_disabled_account",
  }
  const url = getCurrentURL()
  const formData = new FormData(form)
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data: LoginData) => {
          localStorage.setItem(resources.token, data.token)
          window.location.href = "/"
        })
      } else {
        if (response.status === 403) {
          response.json().then((result: LoginResult) => {
            let key: string | undefined = map["" + result.status]
            const message = key ? resource[key] : resource.fail_authentication
            showErrorMessage(form, message)
          })
        } else if (response.status === 422) {
          response.json().then((errors: ErrorMessage[]) => {
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
