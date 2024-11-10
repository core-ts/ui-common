"use strict"
function addErrorMessage(ele, msg, directParent) {
  if (!ele) {
    return
  }
  if (!msg) {
    msg = "Error"
  }
  addClass(ele, "invalid")
  const parent = directParent ? ele.parentElement : getContainer(ele)
  if (parent === null) {
    return
  }
  addClass(parent, "invalid")
  const span = parent.querySelector(".span-error")
  if (span) {
    if (span.innerHTML !== msg) {
      span.innerHTML = msg
    }
  } else {
    const spanError = document.createElement("span")
    spanError.classList.add("span-error")
    spanError.innerHTML = msg
    parent.appendChild(spanError)
  }
}
function showFormError(form, errors, focusFirst, directParent, includeId) {
  if (!form || !errors || errors.length === 0) {
    return []
  }
  let errorCtrl = null
  const errs = []
  const length = errors.length
  const len = form.length
  for (let i = 0; i < length; i++) {
    let hasControl = false
    for (let j = 0; j < len; j++) {
      const ele = form[j]
      const dataField = ele.getAttribute("data-field")
      if (dataField === errors[i].field || ele.name === errors[i].field) {
        addErrorMessage(ele, errors[i].message, directParent)
        hasControl = true
        if (!errorCtrl) {
          errorCtrl = ele
        }
      }
    }
    if (hasControl === false) {
      if (includeId) {
        const ele = document.getElementById(errors[i].field)
        if (ele) {
          addErrorMessage(ele, errors[i].message, directParent)
        } else {
          errs.push(errors[i])
        }
      } else {
        errs.push(errors[i])
      }
    }
  }
  if (!focusFirst) {
    focusFirst = true
  }
  if (errorCtrl !== null && focusFirst === true) {
    errorCtrl.focus()
    errorCtrl.scrollIntoView()
  }
  return errs
}
const errorArr = ["valid", "invalid", "ng-invalid", "ng-touched"]
function removeError(ele, directParent) {
  if (!ele) {
    return
  }
  removeClasses(ele, errorArr)
  const parent = directParent ? ele.parentElement : getContainer(ele)
  if (parent) {
    removeClasses(parent, errorArr)
    const span = parent.querySelector(".span-error")
    if (span !== null && span !== undefined) {
      parent.removeChild(span)
    }
  }
}
function removeErrors(form) {
  if (form) {
    const len = form.length
    for (let i = 0; i < len; i++) {
      const ele = form[i]
      removeError(ele)
    }
  }
}
class formatter {
  static removePhoneFormat(phone) {
    if (phone) {
      return phone.replace(formatter.phone, "")
    } else {
      return phone
    }
  }
  static removeFaxFormat(fax) {
    if (fax) {
      return fax.replace(formatter.phone, "")
    } else {
      return fax
    }
  }
  static formatPhone(phone) {
    if (!phone) {
      return ""
    }
    let s = phone
    const x = formatter.removePhoneFormat(phone)
    if (x.length === 10) {
      const USNumber = x.match(formatter.usPhone)
      if (USNumber != null) {
        s = `${USNumber[1]} ${USNumber[2]}-${USNumber[3]}`
      }
    } else if (x.length <= 3 && x.length > 0) {
      s = x
    } else if (x.length > 3 && x.length < 7) {
      s = `${x.substring(0, 3)} ${x.substring(3, x.length)}`
    } else if (x.length >= 7 && x.length < 10) {
      s = `${x.substring(0, 3)} ${x.substring(3, 6)}-${x.substring(6, x.length)}`
    } else if (x.length >= 11) {
      const l = x.length
      s = `${x.substring(0, l - 7)} ${x.substring(l - 7, l - 4)}-${x.substring(l - 4, l)}`
    }
    return s
  }
  static formatFax(fax) {
    if (!fax) {
      return ""
    }
    let s = fax
    const x = formatter.removePhoneFormat(fax)
    const l = x.length
    if (l <= 6) {
      s = x
    } else {
      if (x.substring(0, 2) !== "02") {
        if (l <= 9) {
          s = `${x.substring(0, l - 6)}-${x.substring(l - 6, l)}`
        } else {
          s = `${x.substring(0, l - 9)}-${x.substring(l - 9, l - 6)}-${x.substring(l - 6, l)}`
        }
      } else {
        if (l <= 9) {
          s = `${x.substring(0, l - 7)}-${x.substring(l - 7, l)}`
        } else {
          s = `${x.substring(0, l - 9)}-${x.substring(l - 9, l - 7)}-${x.substring(l - 7, l)}`
        }
      }
    }
    return s
  }
}
formatter.phone = / |\-|\.|\(|\)/g
formatter.usPhone = /(\d{3})(\d{3})(\d{4})/
class tel {
  static isPhone(str) {
    if (!str || str.length === 0 || str === "+") {
      return false
    }
    if (str.charAt(0) !== "+") {
      return resources.phone.test(str)
    } else {
      const phoneNumber = str.substring(1)
      if (!resources.phonecodes) {
        return resources.phone.test(phoneNumber)
      } else {
        if (resources.phone.test(phoneNumber)) {
          for (let degit = 1; degit <= 3; degit++) {
            const countryCode = phoneNumber.substring(0, degit)
            if (countryCode in resources.phonecodes) {
              return true
            }
          }
          return false
        } else {
          return false
        }
      }
    }
  }
  static isFax(fax) {
    return tel.isPhone(fax)
  }
}
function isPhone(str) {
  return tel.isPhone(str)
}
function isFax(str) {
  return tel.isFax(str)
}
function isUrl(url) {
  if (!url || url.length === 0) {
    return false
  }
  return resources.url.test(url)
}
function isEmail(email) {
  if (!email || email.length === 0) {
    return false
  }
  return resources.email.test(email)
}
function isPercentage(v) {
  return resources.percentage.test(v)
}
function isIPv6(ipv6) {
  if (!ipv6 || ipv6.length === 0) {
    return false
  }
  return resources.ipv6.test(ipv6)
}
function isIPv4(ipv4) {
  if (!ipv4 || ipv4.length === 0) {
    return false
  }
  return resources.ipv4.test(ipv4)
}
function isEmpty(str) {
  return !str || str === ""
}
function isValidPattern(v, pattern, flags) {
  if (!isEmpty(pattern)) {
    if (!flags) {
      flags = "g"
    }
    const p = new RegExp(pattern, flags)
    return p.test(v)
  } else {
    return false
  }
}
function format(...args) {
  let formatted = args[0]
  if (!formatted || formatted === "") {
    return ""
  }
  if (args.length > 1 && Array.isArray(args[1])) {
    const params = args[1]
    for (let i = 0; i < params.length; i++) {
      const regexp = new RegExp("\\{" + i + "\\}", "gi")
      formatted = formatted.replace(regexp, params[i])
    }
  } else {
    for (let i = 1; i < args.length; i++) {
      const regexp = new RegExp("\\{" + (i - 1) + "\\}", "gi")
      formatted = formatted.replace(regexp, args[i])
    }
  }
  return formatted
}
function getLabel(ele) {
  if (!ele) {
    return ""
  }
  let l = ele.getAttribute("data-label")
  if (l) {
    return l
  }
  const parent = getContainer(ele)
  if (parent) {
    if (parent.nodeName === "LABEL") {
      const first = parent.childNodes[0]
      if (first.nodeType === 3) {
        return first.nodeValue ? first.nodeValue : ""
      }
    } else {
      const firstChild = parent.firstChild
      if (firstChild && firstChild.nodeName === "LABEL") {
        return firstChild.innerHTML
      }
    }
  }
  return ""
}
function checkRequired(ele, label) {
  const value = ele.value
  if (ele.required) {
    if (value.length === 0) {
      if (!label) {
        label = getLabel(ele)
      }
      const resource = getResource()
      const msg = format(resource["error_required"], label)
      addErrorMessage(ele, msg)
      return true
    }
  }
  return false
}
function checkMaxLength(ele, label) {
  if (ele.value.length > ele.maxLength) {
    if (!label) {
      label = getLabel(ele)
    }
    const resource = getResource()
    const msg = format(resource["error_maxlength"], label, ele.maxLength)
    addErrorMessage(ele, msg)
    return true
  }
  return false
}
function checkMinLength(ele, label) {
  if (ele.value.length < ele.minLength) {
    if (!label) {
      label = getLabel(ele)
    }
    const resource = getResource()
    const msg = format(resource["error_minlength"], label, ele.maxLength)
    addErrorMessage(ele, msg)
    return true
  }
  return false
}
function validOnBlur(event) {
  const ele = event.target
  if (!ele || ele.readOnly || ele.disabled) {
    return
  }
  removeError(ele)
}
function requiredOnBlur(event) {
  const ele = event.target
  if (!ele || ele.readOnly || ele.disabled) {
    return
  }
  setTimeout(() => {
    ele.value = ele.value.trim()
    if (!checkRequired(ele)) {
      removeError(ele)
    }
  }, 40)
}
function checkOnBlur(event, key, check, formatF) {
  const ele = event.currentTarget
  if (!ele || ele.readOnly || ele.disabled) {
    return
  }
  removeError(ele)
  setTimeout(() => {
    ele.value = ele.value.trim()
    if (checkRequired(ele) || checkMinLength(ele) || checkMaxLength(ele)) {
      return
    }
    let value = ele.value
    if (formatF) {
      value = formatF(value)
    }
    if (value.length > 0 && !check(value)) {
      const label = getLabel(ele)
      const resource = getResource()
      const msg = format(resource[key], label, ele.maxLength)
      addErrorMessage(ele, msg)
    }
  }, 40)
}
function emailOnBlur(event) {
  checkOnBlur(event, "error_email", isEmail)
}
function urlOnBlur(event) {
  checkOnBlur(event, "error_url", isUrl)
}
function phoneOnBlur(event) {
  checkOnBlur(event, "error_phone", tel.isPhone, formatter.removePhoneFormat)
}
function faxOnBlur(event) {
  checkOnBlur(event, "error_fax", tel.isFax, formatter.removeFaxFormat)
}
function ipv4OnBlur(event) {
  checkOnBlur(event, "error_ipv4", isIPv4)
}
function ipv6OnBlur(event) {
  checkOnBlur(event, "error_ipv6", isIPv6)
}
function patternOnBlur(event) {
  const ele = event.currentTarget
  if (!ele || ele.readOnly || ele.disabled) {
    return
  }
  ele.value = ele.value.trim()
  removeError(ele)
  setTimeout(() => {
    if (checkRequired(ele)) {
      return
    }
    const value = ele.value
    if (value.length > 0 && ele.pattern && ele.pattern.length > 0) {
      const flags = ele.getAttribute("data-flags")
      if (!isValidPattern(value, ele.pattern, flags)) {
        let msg = ele.getAttribute("data-error-message")
        if (!msg) {
          msg = "Pattern Error"
        }
        addErrorMessage(ele, msg)
      }
    }
  }, 40)
}
