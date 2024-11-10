interface ErrorMessage {
  field: string
  code: string
  message?: string
}
function addErrorMessage(ele: HTMLElement | null | undefined, msg?: string, directParent?: boolean): void {
  if (!ele) {
    return
  }
  if (!msg) {
    msg = "Error"
  }
  addClass(ele, "invalid")
  // addClass(ele, "ng-touched")
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
function showFormError(form?: HTMLFormElement, errors?: ErrorMessage[], focusFirst?: boolean, directParent?: boolean, includeId?: boolean): ErrorMessage[] {
  if (!form || !errors || errors.length === 0) {
    return []
  }
  let errorCtrl: HTMLInputElement | null = null
  const errs: ErrorMessage[] = []
  const length = errors.length
  const len = form.length

  for (let i = 0; i < length; i++) {
    let hasControl = false
    for (let j = 0; j < len; j++) {
      const ele = form[j] as HTMLInputElement
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
          addErrorMessage(ele as HTMLInputElement, errors[i].message, directParent)
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
function removeError(ele: HTMLInputElement | null | undefined, directParent?: boolean): void {
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
function removeErrors(form?: HTMLFormElement | null): void {
  if (form) {
    const len = form.length
    for (let i = 0; i < len; i++) {
      const ele = form[i] as HTMLInputElement
      removeError(ele)
    }
  }
}

// tslint:disable-next-line:class-name
class formatter {
  // private static _preg = / |\+|\-|\.|\(|\)/g;
  static phone = / |\-|\.|\(|\)/g
  static usPhone = /(\d{3})(\d{3})(\d{4})/
  static removePhoneFormat(phone: string): string {
    if (phone) {
      return phone.replace(formatter.phone, "")
    } else {
      return phone
    }
  }
  static removeFaxFormat(fax: string): string {
    if (fax) {
      return fax.replace(formatter.phone, "")
    } else {
      return fax
    }
  }
  static formatPhone(phone?: string | null): string {
    if (!phone) {
      return ""
    }
    // reformat phone number
    // 555 123-4567 or (+1) 555 123-4567
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
      // formatedPhone = `(+${phoneNumber.charAt(0)}) ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length - 1)}`;
    }
    return s
  }
  static formatFax(fax?: string | null): string {
    if (!fax) {
      return ""
    }
    // reformat phone number
    // 035-456745 or 02-1234567
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
// tslint:disable-next-line:class-name
class tel {
  static isPhone(str: string | null | undefined): boolean {
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
  static isFax(fax: string | null | undefined): boolean {
    return tel.isPhone(fax)
  }
}
function isPhone(str: string | null | undefined): boolean {
  return tel.isPhone(str)
}
function isFax(str: string | null | undefined): boolean {
  return tel.isFax(str)
}
function isUrl(url: string | null | undefined): boolean {
  if (!url || url.length === 0) {
    return false
  }
  return resources.url.test(url)
}
function isEmail(email: string | null | undefined): boolean {
  if (!email || email.length === 0) {
    return false
  }
  return resources.email.test(email)
}
function isPercentage(v: string): boolean {
  return resources.percentage.test(v)
}
function isIPv6(ipv6: string | null | undefined): boolean {
  if (!ipv6 || ipv6.length === 0) {
    return false
  }
  return resources.ipv6.test(ipv6)
}
function isIPv4(ipv4: string | null | undefined): boolean {
  if (!ipv4 || ipv4.length === 0) {
    return false
  }
  return resources.ipv4.test(ipv4)
}
function isEmpty(str: string | null | undefined): boolean {
  return !str || str === ""
}
function isValidPattern(v: string, pattern: string, flags?: string | null): boolean {
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

function format(...args: any[]): string {
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
function getLabel(ele?: HTMLElement | null): string {
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
        return (firstChild as HTMLLabelElement).innerHTML
      }
    }
  }
  return ""
}
function checkRequired(ele: HTMLInputElement | HTMLSelectElement, label?: string): boolean {
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
function checkMaxLength(ele: HTMLInputElement, label?: string): boolean {
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
function checkMinLength(ele: HTMLInputElement, label?: string): boolean {
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
function validOnBlur(event: Event | any): void {
  const ele = event.target as HTMLInputElement
  if (!ele || ele.readOnly || ele.disabled) {
    return
  }
  removeError(ele)
}
function requiredOnBlur(event: Event): void {
  const ele = event.target as HTMLInputElement
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
function checkOnBlur(event: Event, key: string, check: (v: string | null | undefined) => boolean, formatF?: (m0: string) => string): void {
  const ele = event.currentTarget as HTMLInputElement
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
function emailOnBlur(event: Event): void {
  checkOnBlur(event, "error_email", isEmail)
}
function urlOnBlur(event: Event): void {
  checkOnBlur(event, "error_url", isUrl)
}
function phoneOnBlur(event: Event): void {
  checkOnBlur(event, "error_phone", tel.isPhone, formatter.removePhoneFormat)
}
function faxOnBlur(event: Event): void {
  checkOnBlur(event, "error_fax", tel.isFax, formatter.removeFaxFormat)
}
function ipv4OnBlur(event: Event): void {
  checkOnBlur(event, "error_ipv4", isIPv4)
}
function ipv6OnBlur(event: Event): void {
  checkOnBlur(event, "error_ipv6", isIPv6)
}
function patternOnBlur(event: Event): void {
  const ele = event.currentTarget as HTMLInputElement
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

function handleNumberFocus(ele: HTMLInputElement, v: string, locale?: Locale): void {
  if (locale && locale.decimalSeparator !== ".") {
    v = v.replace(resources.num2, "")
  } else {
    v = v.replace(resources.num1, "")
  }
  if (v !== ele.value) {
    ele.value = v
  }
}
function numberOnFocus(event: Event | any, locale?: Locale): void {
  const ele = event.currentTarget as HTMLInputElement
  handleMaterialFocus(ele)
  if (ele.readOnly || ele.disabled || ele.value.length === 0) {
    return
  } else {
    const v = ele.value
    handleNumberFocus(ele, v, locale)
  }
}
function percentageOnFocus(event: Event, locale?: Locale) {
  const ele = event.currentTarget as HTMLInputElement
  handleMaterialFocus(ele)
  if (ele.readOnly || ele.disabled || ele.value.length === 0) {
    return
  }
  let v = ele.value
  setTimeout(() => {
    if (locale && locale.decimalSeparator !== ".") {
      v = v.replace(resources.num2, "")
    } else {
      v = v.replace(resources.num1, "")
    }
    v = v.replace("%", "")
    if (v !== ele.value) {
      ele.value = v
    }
  }, 0)
}
