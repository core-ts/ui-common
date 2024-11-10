const r1 = / |,|\$|€|£|¥|'|٬|،| /g
const r2 = / |\.|\$|€|£|¥|'|٬|،| /g

interface Phones {
  [key: string]: string
}
// tslint:disable-next-line:class-name
class resources {
  static defaultLimit = 12
  static rightText?: string
  static leftText?: string
  static confirmHeader?: string = "Confirm"
  static errorHeader?: string = "Error"
  static warningHeader?: string = "Warning"
  static infoHeader?: string = "Info"
  static successHeader?: string = "Success"
  static containerClass = "form-input"

  static num1 = / |,|\$|€|£|¥|'|٬|،| /g
  static num2 = / |\.|\$|€|£|¥|'|٬|،| /g
  static phonecodes?: Phones
  static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i
  static phone = /^\d{5,14}$/
  static password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  static url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  static digit = /^\d+$/
  static amount = /^[0-9]{0,15}(?:\.[0-9]{1,3})?$/ // const regExp = /\d+\.\d+/;
  static digitAndDash = /^[0-9-]*$/
  static digitAndChar = /^\w*\d*$/
  static checkNumber = /^\d{0,8}$/
  static percentage = /^[1-9][0-9]?$|^100$/
  static ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  static usPostcode = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  static caPostcode =
    /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][ -]?[0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]$/

  static ipv6 =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
}

interface Locale {
  decimalSeparator: string
  groupSeparator: string
  currencyCode: string
  currencySymbol: string
  currencyPattern: number
}

function parseDate(v: string, format?: string): Date | null | undefined {
  if (!format || format.length === 0) {
    format = "MM/DD/YYYY"
  } else {
    format = format.toUpperCase()
  }
  const dateItems = format.split(/\/|\.| |-/)
  const valueItems = v.split(/\/|\.| |-/)
  let imonth = dateItems.indexOf("M")
  let iday = dateItems.indexOf("D")
  let iyear = dateItems.indexOf("YYYY")
  if (imonth === -1) {
    imonth = dateItems.indexOf("MM")
  }
  if (iday === -1) {
    iday = dateItems.indexOf("DD")
  }
  if (iyear === -1) {
    iyear = dateItems.indexOf("YY")
  }
  const month = parseInt(valueItems[imonth], 10) - 1
  let year = parseInt(valueItems[iyear], 10)
  if (year < 100) {
    year += 2000
  }
  const day = parseInt(valueItems[iday], 10)
  return new Date(year, month, day)
}
const o = "object"
function trimNull(obj: any): any {
  if (!obj || typeof obj !== o) {
    return obj
  }
  const keys = Object.keys(obj)
  for (const key of keys) {
    const v = obj[key]
    if (v === null) {
      delete obj[key]
    } else if (Array.isArray(v) && v.length > 0) {
      const v1 = v[0]
      if (typeof v1 === o && !(v1 instanceof Date)) {
        for (const item of v) {
          trimNull(item)
        }
      }
    } else if (typeof v === o && !(v instanceof Date)) {
      trimNull(obj[key])
    }
  }
  return obj
}
function getCurrentURL() {
  return window.location.origin + window.location.pathname
}
//detect Ctrl + [a, v, c, x]
function detectCtrlKeyCombination(e: any) {
  // list all CTRL + key combinations
  var forbiddenKeys = new Array("v", "a", "x", "c")
  var key
  var isCtrl
  var browser = navigator.appName

  if (browser == "Microsoft Internet Explorer") {
    key = e.keyCode
    // IE
    if (e.ctrlKey) {
      isCtrl = true
    } else {
      isCtrl = false
    }
  } else {
    if (browser == "Netscape") {
      key = e.which
      // firefox, Netscape
      if (e.ctrlKey) isCtrl = true
      else isCtrl = false
    } else return true
  }

  // if ctrl is pressed check if other key is in forbidenKeys array
  if (isCtrl) {
    var chr = String.fromCharCode(key).toLowerCase()
    for (let i = 0; i < forbiddenKeys.length; i++) {
      if (forbiddenKeys[i] == chr) {
        return true
      }
    }
  }
  return false
}
function digitOnKeyPress(e: Event) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  const key = window.event ? (e as any).keyCode : (e as any).which
  var keychar = String.fromCharCode(key)
  if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t" || keychar == "-") {
    return key
  }
  var reg = /\d/
  return reg.test(keychar)
}
function integerOnKeyPress(e: Event) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  const key = window.event ? (e as any).keyCode : (e as any).which
  var ctrl = e.target as HTMLInputElement
  var keychar = String.fromCharCode(key)
  let min: number | undefined
  if (!isNaN(ctrl.min as any)) {
    min = parseInt(ctrl.min)
  }
  if (min && min >= 0) {
    if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t") {
      return key
    }
  } else {
    if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t" || keychar == "-") {
      return key
    }
  }
  var reg = /\d/
  return reg.test(keychar)
}
function numberOnKeyPress(e: Event) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  const key = window.event ? (e as any).keyCode : (e as any).which
  const keychar = String.fromCharCode(key)
  const ctrl = e.target as HTMLInputElement
  let min: number | undefined
  if (!isNaN(ctrl.min as any)) {
    min = parseInt(ctrl.min)
  }
  if (min && min >= 0) {
    if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t") {
      return key
    }
  } else {
    if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t" || keychar == "-") {
      return key
    }
  }
  if (keychar == ".") {
    var str = ctrl.value
    if (str != "" && str.indexOf(".") < 0) {
      return key
    }
  }
  var reg = /\d/
  return reg.test(keychar)
}
function trimTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function addDays(d: Date, n: number): Date {
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate
}
function formatDate(d: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!d) {
    return ""
  }
  let format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY"
  if (upper) {
    format = format.toUpperCase()
  }
  let arr = ["", "", ""]
  const items = format.split(/\/|\.| |-/)
  let iday = items.indexOf("D")
  let im = items.indexOf("M")
  let iyear = items.indexOf("YYYY")
  let fm = full ? full : false
  let fd = full ? full : false
  let fy = true
  if (iday === -1) {
    iday = items.indexOf("DD")
    fd = true
  }
  if (im === -1) {
    im = items.indexOf("MM")
    fm = true
  }
  if (iyear === -1) {
    iyear = items.indexOf("YY")
    fy = full ? full : false
  }
  arr[iday] = getD(d.getDate(), fd)
  arr[im] = getD(d.getMonth() + 1, fm)
  arr[iyear] = getYear(d.getFullYear(), fy)
  const s = detectSeparator(format)
  const e = detectLastSeparator(format)
  const l = items.length === 4 ? format[format.length - 1] : ""
  return arr[0] + s + arr[1] + e + arr[2] + l
}
function detectSeparator(format: string): string {
  const len = format.length
  for (let i = 0; i < len; i++) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function detectLastSeparator(format: string): string {
  const len = format.length - 3
  for (let i = len; i > -0; i--) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function getYear(y: number, full?: boolean): string {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString()
  }
  const s = y.toString()
  return s.substring(s.length - 2)
}
function getD(n: number, fu: boolean): string {
  return fu ? pad(n) : n.toString()
}
function formatLongTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
}
function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString()
}
function pad3(n: number): string {
  if (n >= 100) {
    return n.toString()
  }
  return n < 10 ? "00" + n : "0" + n.toString()
}
function formatLongDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return ""
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}

function getElement(form: HTMLFormElement | undefined | null, name: string): Element | null {
  if (form) {
    const l = form.length
    for (let i = 0; i < l; i++) {
      const e = form[i]
      if (e.getAttribute("name") === name) {
        return e
      }
    }
  }
  return null
}
function findParent(e: HTMLElement | null | undefined, className: string, nodeName?: string): HTMLElement | null {
  if (!e) {
    return null
  }
  if (nodeName && e.nodeName === nodeName) {
    return e
  }
  let p: HTMLElement | null = e
  while (true) {
    p = p.parentElement
    if (!p) {
      return null
    }
    if (p.classList.contains(className)) {
      return p
    }
    if (nodeName && p.nodeName === nodeName) {
      return p
    }
  }
}
function addClass(ele: HTMLElement | null | undefined, className: string): boolean {
  if (ele) {
    if (!ele.classList.contains(className)) {
      ele.classList.add(className)
      return true
    }
  }
  return false
}
function addClasses(ele: HTMLElement | null | undefined, classes: string[]): number {
  let count = 0
  if (ele) {
    for (let i = 0; i < classes.length; i++) {
      if (addClass(ele, classes[i])) {
        count++
      }
    }
  }
  return count
}
function removeClass(ele: HTMLElement | null | undefined, className: string): boolean {
  if (ele) {
    if (ele && ele.classList.contains(className)) {
      ele.classList.remove(className)
      return true
    }
  }
  return false
}
function removeClasses(ele: HTMLElement | null | undefined, classes: string[]): number {
  let count = 0
  if (ele) {
    for (let i = 0; i < classes.length; i++) {
      if (removeClass(ele, classes[i])) {
        count++
      }
    }
  }
  return count
}
function getContainer(ele?: HTMLElement | null): HTMLElement | null {
  return findParent(ele, resources.containerClass, "LABEL")
}
function handleMaterialFocus(ele: HTMLInputElement) {
  if (ele.disabled || ele.readOnly) {
    return
  }
  if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
    addClass(getContainer(ele), "focused")
  }
}
function materialOnFocus(event: Event) {
  const ele = event.currentTarget as HTMLInputElement
  if (ele.disabled || ele.readOnly) {
    return
  }
  setTimeout(() => {
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
      addClass(getContainer(ele), "focused")
    }
  }, 0)
}
function materialOnBlur(event: Event): void {
  const ele = event.currentTarget as HTMLInputElement
  setTimeout(() => {
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
      addClasses(getContainer(ele), ["focused", "focus"])
    }
  }, 0)
}
function registerEvents(form: HTMLFormElement): void {
  const len = form.length
  for (let i = 0; i < len; i++) {
    const ele = form[i] as HTMLInputElement
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT") {
      let type = ele.getAttribute("type")
      if (type != null) {
        type = type.toLowerCase()
      }
      if (ele.nodeName === "INPUT" && (type === "checkbox" || type === "radio" || type === "submit" || type === "button" || type === "reset")) {
        continue
      } else {
        const parent = ele.parentElement
        const required = ele.getAttribute("required")
        if (parent) {
          if (
            parent.nodeName === "LABEL" &&
            // tslint:disable-next-line:triple-equals
            required != null &&
            required !== undefined &&
            required != "false" &&
            !parent.classList.contains("required")
          ) {
            parent.classList.add("required")
          } else if (parent.classList.contains("form-group") || parent.classList.contains("field")) {
            const firstChild = parent.firstChild
            if (firstChild && firstChild.nodeName === "LABEL") {
              if (!(firstChild as HTMLLabelElement).classList.contains("required")) {
                ;(firstChild as HTMLLabelElement).classList.add("required")
              }
            }
          }
        }
        if (ele.getAttribute("onblur") === null && ele.getAttribute("(blur)") === null) {
          ele.onblur = materialOnBlur
        } else {
          console.log("name:" + ele.getAttribute("name"))
        }
        if (ele.getAttribute("onfocus") === null && ele.getAttribute("(focus)") === null) {
          ele.onfocus = materialOnFocus
        } else {
          console.log("name:" + ele.getAttribute("name"))
        }
      }
    } else if (ele.nodeName === "TEXTAREA") {
      if (ele.getAttribute("blur") === null) {
        ;(ele as any).blur = materialOnBlur
      }
      if (ele.getAttribute("focus") === null) {
        ;(ele as any).focus = materialOnFocus
      }
    }
  }
}

function valueOf(obj: any, key: string): any {
  const mapper = key.split(".").map((item) => {
    return item.replace(/\[/g, ".[").replace(/\[|\]/g, "")
  })
  const reSplit = mapper.join(".").split(".")
  return reSplit.reduce((acc, current, index, source) => {
    const value = getDirectValue(acc, current)
    if (!value) {
      source.splice(1)
    }
    return value
  }, obj)
}
function getDirectValue(obj: any, key: string): any {
  if (obj && obj.hasOwnProperty(key)) {
    return obj[key]
  }
  return null
}
function setValue(obj: any, key: string, value: any): any {
  let replaceKey = key.replace(/\[/g, ".[").replace(/\.\./g, ".")
  if (replaceKey.indexOf(".") === 0) {
    replaceKey = replaceKey.slice(1, replaceKey.length)
  }
  const keys = replaceKey.split(".")
  let firstKey = keys.shift()
  if (!firstKey) {
    return
  }
  const isArrayKey = /\[([0-9]+)\]/.test(firstKey)
  if (keys.length > 0) {
    const firstKeyValue = obj[firstKey] || {}
    const returnValue = setValue(firstKeyValue, keys.join("."), value)
    return setKey(obj, isArrayKey, firstKey, returnValue)
  }
  return setKey(obj, isArrayKey, firstKey, value)
}
function setKey(_object: any, _isArrayKey: boolean, _key: string, _nextValue: any) {
  if (_isArrayKey) {
    if (_object.length > _key) {
      _object[_key] = _nextValue
    } else {
      _object.push(_nextValue)
    }
  } else {
    _object[_key] = _nextValue
  }
  return _object
}

function decodeFromForm<T>(form: HTMLFormElement, locale?: Locale, currencySymbol?: string | null): T {
  const dateFormat = form.getAttribute("date-format")
  const obj = {} as T
  const len = form.length
  for (let i = 0; i < len; i++) {
    const ele = form[i] as HTMLInputElement
    let name = ele.getAttribute("name")
    const id = ele.getAttribute("id")
    let val: any
    let isDate = false
    let dataField = ele.getAttribute("data-field")
    if (dataField && dataField.length > 0) {
      name = dataField
    } else if ((!name || name === "") && ele.parentElement && ele.parentElement.classList.contains("DayPickerInput")) {
      if (ele.parentElement.parentElement) {
        dataField = ele.parentElement.parentElement.getAttribute("data-field")
        isDate = true
        name = dataField
      }
    }
    if (name != null && name !== "") {
      let nodeName = ele.nodeName
      const type = ele.getAttribute("type")
      if (nodeName === "INPUT" && type !== null) {
        nodeName = type.toUpperCase()
      }
      if (nodeName !== "BUTTON" && nodeName !== "RESET" && nodeName !== "SUBMIT") {
        switch (type) {
          case "checkbox":
            if (id && name !== id) {
              // obj[name] = !obj[name] ? [] : obj[name];
              val = valueOf(obj, name) // val = obj[name];
              if (!val) {
                val = []
              }
              if (ele.checked) {
                val.push(ele.value)
                // obj[name].push(ele.value);
              } else {
                // tslint:disable-next-line: triple-equals
                val = val.filter((item: string) => item != ele.value)
              }
            } else {
              const c0 = ele.checked as any
              if (c0 || c0 === "checked") {
                val = true
              }
            }
            break
          case "radio":
            const cv = ele.checked as any
            if (cv || cv === "checked") {
              val = ele.value
            }
            break
          case "date":
            if (ele.value.length === 10) {
              try {
                val = new Date(ele.value) // DateUtil.parse(ele.value, 'YYYY-MM-DD');
              } catch (err) {
                val = null
              }
            } else {
              val = null
            }
            break
          case "datetime-local":
            if (ele.value.length > 0) {
              try {
                val = new Date(ele.value) // DateUtil.parse(ele.value, 'YYYY-MM-DD');
              } catch (err) {
                val = null
              }
            } else {
              val = null
            }
            break
          default:
            val = ele.value
        }
        if (isDate && dateFormat && dateFormat.length > 0) {
          try {
            val = parseDate(val, dateFormat) // moment(val, dateFormat).toDate();
          } catch (err) {
            val = null
          }
        }
        const ctype = ele.getAttribute("data-type")
        let v: any = ele.value
        let symbol: string | null | undefined
        if (ctype === "currency") {
          symbol = ele.getAttribute("currency-symbol")
          if (!symbol) {
            symbol = currencySymbol
          }
          if (symbol && symbol.length > 0 && v.indexOf(symbol) >= 0) {
            v = v.replace(symbol, "")
          }
        }
        if (type === "number" || ctype === "currency" || ctype === "int" || ctype === "number") {
          if (locale && locale.decimalSeparator !== ".") {
            v = v.replace(r2, "")
          } else {
            v = v.replace(r1, "")
          }
          val = isNaN(v) ? null : parseFloat(v)
        }
        setValue(obj, name, val) // obj[name] = val;
      }
    }
  }
  return obj
}

function removeFormatUrl(url: string): string {
  const startParams = url.indexOf("?")
  return startParams !== -1 ? url.substring(0, startParams) : url
}
interface Filter {
  page?: number
  limit?: number
  firstLimit?: number
  fields?: string[]
  sort?: string
}
function getPrefix(url: string): string {
  return url.indexOf("?") >= 0 ? "&" : "?"
}
function buildSearchUrl<F extends Filter>(ft: F, page?: string, limit?: string, fields?: string): string {
  if (!page || page.length === 0) {
    page = "page"
  }
  if (!limit || limit.length === 0) {
    limit = "limit"
  }
  if (!fields || fields.length === 0) {
    fields = "fields"
  }
  const pageIndex = ft.page
  if (pageIndex && !isNaN(pageIndex) && pageIndex <= 1) {
    delete ft.page
  }
  const keys = Object.keys(ft)
  // const currentUrl = window.location.host + window.location.pathname
  let url = "?partial=true"
  for (const key of keys) {
    const objValue = (ft as any)[key]
    if (objValue) {
      if (key !== fields) {
        if (typeof objValue === "string" || typeof objValue === "number") {
          if (key === page) {
            if (objValue != 1) {
              url += getPrefix(url) + `${key}=${objValue}`
            }
          } else if (key === limit) {
            if (objValue != resources.defaultLimit) {
              url += getPrefix(url) + `${key}=${objValue}`
            }
          } else {
            url += getPrefix(url) + `${key}=${objValue}`
          }
        } else if (typeof objValue === "object") {
          if (objValue instanceof Date) {
            url += getPrefix(url) + `${key}=${objValue.toISOString()}`
          } else {
            if (Array.isArray(objValue)) {
              if (objValue.length > 0) {
                const strs: string[] = []
                for (const subValue of objValue) {
                  if (typeof subValue === "string") {
                    strs.push(subValue)
                  } else if (typeof subValue === "number") {
                    strs.push(subValue.toString())
                  }
                }
                url += getPrefix(url) + `${key}=${strs.join(",")}`
              }
            } else {
              const keysLvl2 = Object.keys(objValue)
              for (const key2 of keysLvl2) {
                const objValueLvl2 = objValue[key2]
                if (objValueLvl2 instanceof Date) {
                  url += getPrefix(url) + `${key}.${key2}=${objValueLvl2.toISOString()}`
                } else {
                  url += getPrefix(url) + `${key}.${key2}=${objValueLvl2}`
                }
              }
            }
          }
        }
      }
    }
  }
  return url
}

function removeField(search: string, fieldName: string): string {
  let i = search.indexOf(fieldName + "=")
  if (i < 0) {
    return search
  }
  if (i > 0) {
    if (search.substring(i - 1, 1) != "&") {
      i = search.indexOf("&" + fieldName + "=")
      if (i < 0) {
        return search
      }
      i = i + 1
    }
  }
  const j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(0, i) + search.substring(j + 1) : search.substring(0, i - 1)
}
function getField(search: string, fieldName: string): string {
  let i = search.indexOf(fieldName + "=")
  if (i < 0) {
    return ""
  }
  if (i > 0) {
    if (search.substring(i - 1, 1) != "&") {
      i = search.indexOf("&" + fieldName + "=")
      if (i < 0) {
        return search
      }
      i = i + 1
    }
  }
  const j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(i, j) : search.substring(i)
}
function changePage(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLAnchorElement

  let search = target.search
  if (search.length > 0) {
    search = search.substring(1)
  }
  search = removeField(search, "partial")
  const p = getField(search, "page")
  if (p === "page=1") {
    search = removeField(search, "page")
  }
  let url = window.location.origin + window.location.pathname
  url = url + (search.length === 0 ? "?partial=true" : "?" + search + "&partial=true")

  let newUrl = window.location.origin + window.location.pathname
  if (search.length > 0) {
    newUrl = newUrl + "?" + search
  }
  fetch(url, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          const pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            const forms = pageBody.querySelectorAll("form")
            for (let i = 0; i < forms.length; i++) {
              registerEvents(forms[i])
            }
          }
          window.history.pushState(undefined, "Title", newUrl)
        })
      } else {
        console.error("Error:", response.statusText)
        alert("Failed to submit data.")
      }
    })
    .catch((err) => {
      console.log("Error: " + err)
      alert("An error occurred while submitting the form")
    })
}

function search(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLInputElement
  const form = target.form as HTMLFormElement
  const initFilter = decodeFromForm<Filter>(form)
  const filter = trimNull(initFilter)
  filter.page = 1
  const search = buildSearchUrl(filter)
  const url = getCurrentURL() + search
  let newUrl = getCurrentURL()
  if (search.length > 0) {
    const s = removeField(search.substring(1), "partial")
    if (s.length > 0) {
      newUrl = newUrl + "?" + s
    }
  }
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          const pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            const forms = pageBody.querySelectorAll("form")
            for (let i = 0; i < forms.length; i++) {
              registerEvents(forms[i])
            }
          }
          window.history.pushState(undefined, "Title", newUrl)
        })
      } else {
        console.error("Error:", response.statusText)
        alert("Failed to submit data.")
      }
    })
    .catch((err) => {
      console.log("Error: " + err)
      alert("An error occurred while submitting the form")
    })
}
function saveFormData(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLButtonElement
  const form = target.form as HTMLFormElement
  const valid = validateForm(form)
  if (!valid) {
    return
  }
  const formData = new FormData(form)
  let confirmText = target.getAttribute("data-message")
  if (!confirmText) {
    confirmText = "Are you sure you want to save?"
  }
  showConfirm(confirmText, () => {
    const url = getCurrentURL()
    showLoading()
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((data) => {
            const pageBody = document.getElementById("pageBody")
            if (pageBody) {
              pageBody.innerHTML = data
              const forms = pageBody.querySelectorAll("form")
              for (let i = 0; i < forms.length; i++) {
                registerEvents(forms[i])
              }
            }
            hideLoading()
          })
        } else {
          console.error("Error:", response.statusText)
          hideLoading()
          alert("Failed to submit data.")
        }
      })
      .catch((err) => {
        console.log("Error: " + err)
        hideLoading()
        alert("An error occurred while submitting the form")
      })
  })
}
function save(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLButtonElement
  const form = target.form as HTMLFormElement
  const valid = validateForm(form)
  if (!valid) {
    return
  }
  const contact = decodeFromForm(form)
  const url = getCurrentURL()
  showLoading()
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the server understands the content type
    },
    body: JSON.stringify(contact), // Convert the form data to JSON format
  })
    .then((response) => {
      console.log("status code " + response.status)
      if (response.ok) {
      } else {
        if (response.status >= 400 && response.status < 500) {
          response.json().then((errors) => {
            showFormError(form, errors)
          })
        } else {
          console.error("Error:", response.statusText)
          alert("Failed to submit data.")
        }
      }
      hideLoading()
    })
    .catch((err) => {
      console.log("Error: " + err)
      hideLoading()
      alert("An error occurred while submitting the form")
    })
}
