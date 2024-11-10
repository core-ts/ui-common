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
    if (flags === null) {
      flags = undefined
    }
    const p = new RegExp(pattern, flags)
    return p.test(v)
  } else {
    return false
  }
}
function isValidCode(str: string): boolean {
  return resources.digitAndChar.test(str)
}
function isDashCode(str: string | null | undefined): boolean {
  if (!str || str.length === 0) {
    return false
  }
  const len = str.length - 1
  for (let i = 0; i <= len; i++) {
    const chr = str.charAt(i)
    if (!((chr >= "0" && chr <= "9") || (chr >= "A" && chr <= "Z") || (chr >= "a" && chr <= "z") || chr === "-")) {
      return false
    }
  }
  return true
}
function isDigitOnly(v: string | null | undefined): boolean {
  if (!v) {
    return false
  }
  return resources.digit.test(v)
}
function isDashDigit(v: string): boolean {
  return resources.digitAndDash.test(v)
}
function isCheckNumber(v: string): boolean {
  return resources.checkNumber.test(v)
}
function isAmountNumber(v: string): boolean {
  return resources.amount.test(v)
}
function isUSPostalCode(postcode: string): boolean {
  return resources.usPostcode.test(postcode)
}
function isCAPostalCode(postcode: string): boolean {
  return resources.caPostcode.test(postcode)
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
function validOnBlur(event: Event): void {
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

function isCommaSeparator(locale?: Locale | null | string) {
  if (!locale) {
    return false
  }
  return typeof locale === "string" ? locale !== "." : locale.decimalSeparator !== "."
}
function correctNumber(v: string, locale?: Locale | null | string): string {
  const l = v.length
  if (l === 0) {
    return v
  }
  if (isCommaSeparator(locale)) {
    v = v.replace(resources.num2, "")
  } else {
    v = v.replace(resources.num1, "")
  }
  const arr: string[] = []
  for (let i = 0; i < l; i++) {
    if ((v[i] >= "0" && v[i] <= "9") || v[i] == "." || v[i] == ",") {
      arr.push(v[i])
    }
  }
  return arr.join("")
}

function handleNumberFocus(ele: HTMLInputElement, v: string, locale?: Locale | null | string): void {
  v = correctNumber(v, locale)
  if (v !== ele.value) {
    ele.value = v
  }
}
function numberOnFocus(event: Event, locale?: Locale): void {
  const ele = event.currentTarget as HTMLInputElement
  handleMaterialFocus(ele)
  if (ele.readOnly || ele.disabled || ele.value.length === 0) {
    return
  } else {
    const v = ele.value
    handleNumberFocus(ele, v, locale)
  }
}
function validateMinMax(ele: HTMLInputElement, n: number, label: string, resource: StringMap, locale?: Locale | null | string): boolean {
  if (ele.min.length > 0) {
    const min = parseFloat(ele.min)
    if (n < min) {
      let msg = format(resource["error_min"], label, min)
      if (ele.max.length > 0) {
        const max = parseFloat(ele.max)
        if (max === min) {
          msg = format(resource["error_equal"], label, max)
        }
      }
      addErrorMessage(ele, msg)
      return false
    }
  }
  if (ele.max.length > 0) {
    const max = parseFloat(ele.max)
    if (n > max) {
      const msg = format(resource["error_max"], label, max)
      addErrorMessage(ele, msg)
      return false
    }
  }
  const minField = ele.getAttribute("min-field")
  if (minField && minField.length > 0) {
    const form = ele.form
    if (form) {
      const minElement = getElement(form, minField) as HTMLInputElement
      if (minElement) {
        let smin2 = correctNumber(minElement.value, locale) // const smin2 = minElement.value.replace(this._nreg, '');
        if (smin2.length > 0 && !isNaN(smin2 as any)) {
          const min2 = parseFloat(smin2)
          if (n < min2) {
            const minLabel = getLabel(minElement)
            const msg = format(resource["error_min"], label, minLabel)
            addErrorMessage(ele, msg)
            return false
          }
        }
      }
    }
  }
  return true
}
function checkNumberEvent(event: Event, locale?: Locale | string | null): boolean | string {
  const target = event.currentTarget as HTMLInputElement
  if (!target || target.readOnly || target.disabled) {
    return true
  }
  materialOnBlur(event)
  removeError(target)
  target.value = target.value.trim()
  return checkNumber(target, locale)
}
function checkNumber(target: HTMLInputElement, locale?: Locale | string | null, r?: StringMap): boolean | string {
  const value = correctNumber(target.value, locale)
  const label = getLabel(target)
  if (checkRequired(target, label)) {
    return false
  }
  const resource = r ? r : getResource()
  if (value.length > 0) {
    if (isNaN(value as any)) {
      const msg = format(resource["error_number"], label)
      addErrorMessage(target, msg)
      return false
    } else if (target.getAttribute("data-type") === "integer") {
      const msg = format(resource["error_integer"], label)
      addErrorMessage(target, msg)
      return false
    }
    const n = parseFloat(value)
    if (!validateMinMax(target, n, label, resource, locale)) {
      return false
    }
    removeError(target)
    return value
  }
  return true
}
function getDecimalSeparator(ele: HTMLInputElement): string | null {
  const decimalSeparator = ele.getAttribute("data-decimal-separator")
  if (!decimalSeparator) {
    const form = ele.form
    if (form) {
      return form.getAttribute("data-decimal-separator")
    }
  }
  return decimalSeparator
}
function checkNumberOnBlur(event: Event) {
  const target = event.currentTarget as HTMLInputElement
  const decimalSeparator = target.getAttribute("data-decimal-separator")
  const v = checkNumberEvent(event, decimalSeparator)
  if (typeof v === "string") {
    target.value = v
  }
}
function numberOnBlur(event: Event) {
  const target = event.currentTarget as HTMLInputElement
  const decimalSeparator = target.getAttribute("data-decimal-separator")
  const v = checkNumberEvent(event, decimalSeparator)
  if (typeof v === "string") {
    const attr = target.getAttribute("data-scale")
    const scale = attr && attr.length > 0 ? parseInt(attr, 10) : undefined
    const n = parseFloat(v)
    target.value = formatNumber(n, scale, decimalSeparator)
  }
}
function currencyOnBlur(event: Event) {
  const target = event.currentTarget as HTMLInputElement
  const decimalSeparator = target.getAttribute("data-decimal-separator")
  const v = checkNumberEvent(event, decimalSeparator)
  if (typeof v === "string") {
    const attr = target.getAttribute("data-scale")
    const scale = attr && attr.length > 0 ? parseInt(attr, 10) : undefined
    const n = parseFloat(v)
    const value = formatNumber(n, scale, decimalSeparator)
    target.value = formatCurrency(value, target)
  }
}
function formatCurrency(v: string, ele: HTMLInputElement): string {
  const symbol = ele.getAttribute("data-currency-symbol")
  if (!symbol) {
    return v
  } else {
    const pattern = ele.getAttribute("data-currency-pattern")
    if (!pattern) {
      return symbol + v
    } else if (pattern === "1") {
      return v + symbol
    } else if (pattern === "2") {
      return symbol + " " + v
    } else if (pattern === "3") {
      return v + " " + symbol
    } else {
      return symbol + v
    }
  }
}
function formatNumber(v: number, scale?: number, d?: string | null, g?: string): string {
  if (!v) {
    return ""
  }
  if (!d && !g) {
    g = ","
    d = "."
  } else if (!g) {
    g = d === "," ? "." : ","
  }
  const s = scale === 0 || scale ? v.toFixed(scale) : v.toString()
  const x = s.split(".", 2)
  const y = x[0]
  const arr: string[] = []
  const len = y.length - 1
  for (let k = 0; k < len; k++) {
    arr.push(y[len - k])
    if ((k + 1) % 3 === 0) {
      arr.push(g)
    }
  }
  arr.push(y[0])
  if (x.length === 1) {
    return arr.reverse().join("")
  } else {
    return arr.reverse().join("") + d + x[1]
  }
}

function validateElement(ele: HTMLInputElement, locale?: Locale | string | null, includeReadOnly?: boolean): boolean {
  if (!ele) {
    return true
  }

  if (!ele || (ele.readOnly && includeReadOnly === false) || ele.disabled || ele.hidden || ele.style.display === "none") {
    return true
  }
  let nodeName = ele.nodeName
  if (nodeName === "INPUT") {
    const type = ele.getAttribute("type")
    if (type !== null) {
      nodeName = type.toUpperCase()
    }
  }
  if (ele.tagName === "SELECT") {
    nodeName = "SELECT"
  }
  if (nodeName === "BUTTON" || nodeName === "RESET" || nodeName === "SUBMIT") {
    return true
  }

  const parent = getContainer(ele)
  if (parent) {
    if (parent.hidden || parent.style.display === "none") {
      return true
    } else {
      const p = findParent(parent, "SECTION")
      if (p && (p.hidden || p.style.display === "none")) {
        return true
      }
    }
  }

  let value = ele.value

  const label = getLabel(ele)
  if (checkRequired(ele, label) || checkMinLength(ele, label) || checkMaxLength(ele, label)) {
    return false
  }

  if (!value || value === "") {
    return true
  }
  const resource = getResource()
  let ctype = ele.getAttribute("type")
  if (ctype) {
    ctype = ctype.toLowerCase()
  }
  let datatype = ele.getAttribute("data-type")
  if (ctype === "email") {
    datatype = "email"
  } else if (ctype === "url") {
    datatype = "url"
  } else if (!datatype) {
    if (ctype === "number") {
      datatype = "number"
    } else if (ctype === "date" || ctype === "datetime-local") {
      datatype = "date"
    }
  }

  if (ele.pattern && ele.pattern.length > 0) {
    let flags = ele.getAttribute("data-flags")
    if (!isValidPattern(value, ele.pattern, flags)) {
      let msg = ele.getAttribute("data-error-message")
      if (!msg) {
        msg = "Pattern Error"
      }
      addErrorMessage(ele, msg)
      return false
    }
  }
  if (datatype === "email") {
    if (value.length > 0 && !isEmail(value)) {
      const msg = format(resource["error_email"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "number" || datatype === "integer" || datatype === "currency" || datatype === "string-currency" || datatype === "percentage") {
    const v = checkNumber(ele, locale, resource)
    const decimalSeparator = getDecimalSeparator(ele)
    if (typeof v === "string") {
      const attr = ele.getAttribute("data-scale")
      const scale = attr && attr.length > 0 ? parseInt(attr, 10) : undefined
      const n = parseFloat(v)
      if (datatype === "currency" || datatype === "string-currency") {
        ele.value = formatCurrency(value, ele)
      } else {
        ele.value = formatNumber(n, scale, decimalSeparator)
      }
    }
  } else if (datatype === "url") {
    if (!isUrl(value)) {
      const msg = format(resource["error_url"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "phone") {
    const phoneStr = formatter.removePhoneFormat(value)
    if (!tel.isPhone(phoneStr)) {
      const msg = format(resource["error_phone"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "fax") {
    const phoneStr = formatter.removeFaxFormat(value)
    if (!tel.isFax(phoneStr)) {
      const msg = format(resource["error_fax"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "code") {
    if (!isValidCode(value)) {
      const msg = format(resource["error_code"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "dash-code") {
    if (!isDashCode(value)) {
      const msg = format(resource["error_dash_code"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "digit") {
    if (!isDigitOnly(value)) {
      const msg = format(resource["error_digit"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "dash-digit") {
    if (!isDashDigit(value)) {
      const msg = format(resource["error_dash_digit"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "routing-number") {
    // business-tax-id
    if (!isDashDigit(value)) {
      const msg = format(resource["error_routing_number"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "check-number") {
    if (!isCheckNumber(value)) {
      const msg = format(resource["error_check_number"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "post-code") {
    let countryCode = ele.getAttribute("country-code")
    if (countryCode) {
      countryCode = countryCode.toUpperCase()
      if (countryCode === "US" || countryCode === "USA") {
        if (!isUSPostalCode(value)) {
          const msg = format(resource["error_us_post_code"], label)
          addErrorMessage(ele, msg)
          return false
        }
      } else if (countryCode === "CA" || countryCode === "CAN") {
        if (!isCAPostalCode(value)) {
          const msg = format(resource["error_ca_post_code"], label)
          addErrorMessage(ele, msg)
          return false
        }
      } else {
        if (!isDashCode(value)) {
          const msg = format(resource["error_post_code"], label)
          addErrorMessage(ele, msg)
          return false
        }
      }
    }
  } else if (datatype === "ipv4") {
    if (!isIPv4(value)) {
      const msg = format(resource["error_ipv4"], label)
      addErrorMessage(ele, msg)
      return false
    }
  } else if (datatype === "ipv6") {
    if (!isIPv6(value)) {
      const msg = format(resource["error_ipv6"], label)
      addErrorMessage(ele, msg)
      return false
    }
  }
  removeError(ele)
  return true
}

function isValidForm(form: HTMLFormElement, focusFirst?: boolean, scroll?: boolean): boolean {
  const valid = true
  let i = 0
  const len = form.length
  for (i = 0; i < len; i++) {
    const ctrl = form[i] as HTMLInputElement
    const parent = ctrl.parentElement
    if (ctrl.classList.contains("invalid") || ctrl.classList.contains("ng-invalid") || (parent && parent.classList.contains("invalid"))) {
      if (!focusFirst) {
        focusFirst = true
      }
      if (ctrl && focusFirst) {
        ctrl.focus()
        if (scroll) {
          ctrl.scrollIntoView()
        }
      }
      return false
    }
  }
  return valid
}
function validateForm(form?: HTMLFormElement, locale?: Locale, focusFirst?: boolean, scroll?: boolean, includeReadOnly?: boolean): boolean {
  if (!form) {
    return true
  }
  let valid = true
  let errorCtrl: HTMLInputElement | null = null
  let i = 0
  const len = form.length
  for (i = 0; i < len; i++) {
    const ctrl = form[i] as HTMLInputElement
    let type = ctrl.getAttribute("type")
    if (type != null) {
      type = type.toLowerCase()
    }
    if (type === "checkbox" || type === "radio" || type === "submit" || type === "button" || type === "reset") {
      continue
    } else {
      if (!validateElement(ctrl, locale, includeReadOnly)) {
        valid = false
        if (!errorCtrl) {
          errorCtrl = ctrl
        }
      } else {
        removeError(ctrl)
      }
    }
  }
  if (!focusFirst) {
    focusFirst = true
  }
  if (errorCtrl !== null && focusFirst === true) {
    errorCtrl.focus()
    if (scroll === true) {
      errorCtrl.scrollIntoView()
    }
  }
  return valid
}
function validateElements(elements: HTMLInputElement[], locale?: Locale | string | null): boolean {
  let valid = true
  let errorCtrl: HTMLInputElement | null = null
  for (const c of elements) {
    if (!validateElement(c, locale)) {
      valid = false
      if (!errorCtrl) {
        errorCtrl = c
      }
    } else {
      removeError(c)
    }
  }
  if (errorCtrl !== null) {
    errorCtrl.focus()
    errorCtrl.scrollIntoView()
  }
  return valid
}