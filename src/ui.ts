function fadeIn(ele: HTMLElement, display?: string): void {
  ele.style.opacity = "0"
  ele.style.display = display || "block"
  ;(function fade() {
    let val = parseFloat(ele.style.opacity)
    val += 0.1
    if (!(val > 1)) {
      ele.style.opacity = val.toString()
      requestAnimationFrame(fade)
    }
  })()
}
function fadeOut(ele: HTMLElement): void {
  ele.style.opacity = "1"
  ;(function fade() {
    let val = parseFloat(ele.style.opacity)
    val -= 0.1
    if (val < 0) {
      ele.style.display = "none"
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

function toast(msg: string): void {
  const sysToast = document.getElementById("sysToast") as HTMLElement
  sysToast.innerHTML = msg
  fadeIn(sysToast)
  setTimeout(() => {
    fadeOut(sysToast)
  }, 1340)
}
function showLoading(isFirstTime?: boolean) {
  const sysLoading = document.getElementById("sysLoading") as HTMLElement
  sysLoading.style.display = "block"
  if (isFirstTime) {
    sysLoading.classList.add("dark")
  } else {
    sysLoading.classList.remove("dark")
  }
}
function hideLoading() {
  const loading = document.getElementById("sysLoading") as HTMLElement
  loading.style.display = "none"
}
type Type = "Confirm" | "Alert"
type IconType = "Error" | "Warning" | "Confirm" | "Success" | "Info" | "Alert"
function escapeHTML(text?: string): string {
  if (!text) {
    return ""
  }
  const isIgnore = text.indexOf("<br />") >= 0

  if (text.indexOf('"') >= 0) {
    text = text.replace(/"/g, "&quot;")
  }
  if (text.indexOf("&") >= 0) {
    text = text.replace(/&/g, "&amp;")
  }
  if (text.indexOf(">") >= 0) {
    text = text.replace(/>/g, "&gt;")
  }
  if (text.indexOf("<") >= 0) {
    text = text.replace(/</g, "&lt;")
  }
  // Ignore escaping if </br> tag is present
  if (isIgnore) {
    text = text.replace(/&lt;br \/&gt;/g, "<br />")
  }
  return text
}
function showAlert(
  msg: string,
  header?: string,
  type?: Type,
  iconType?: IconType,
  btnLeftText?: string,
  btnRightText?: string,
  yesCallback?: () => void,
  noCallback?: () => void,
  detail?: string,
): void {
  const sysAlert = document.getElementById("sysAlert") as HTMLElement
  const sysMessage = document.getElementById("sysMessage") as HTMLElement
  const sysMessageHeader = document.getElementById("sysMessageHeader") as HTMLElement
  const sysErrorDetail = document.getElementById("sysErrorDetail") as HTMLElement
  const sysErrorDetailText = document.getElementById("sysErrorDetailText") as HTMLElement
  const sysErrorDetailCaret = document.getElementById("sysErrorDetailCaret") as HTMLElement
  const sysYes = document.getElementById("sysYes") as HTMLElement
  const sysNo = document.getElementById("sysNo") as HTMLElement

  btnLeftText = btnLeftText !== undefined ? btnLeftText : resources.leftText
  btnRightText = btnRightText !== undefined ? btnRightText : resources.rightText

  if (type === "Alert") {
    if (!sysAlert.classList.contains("alert-only")) {
      sysAlert.classList.add("alert-only")
    }
  } else {
    sysAlert.classList.remove("alert-only")
  }
  if (sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText) {
    if (!detail) {
      sysErrorDetailCaret.style.display = "none"
      sysErrorDetail.style.display = "none"
      sysErrorDetailText.innerHTML = ""
    } else {
      sysErrorDetailCaret.style.display = "inline-block"
      sysErrorDetail.style.display = "inline-block"
      sysErrorDetailText.innerHTML = escapeHTML(detail)
    }
  }
  sysMessage.innerHTML = escapeHTML(msg)
  sysMessageHeader.innerHTML = escapeHTML(header)
  sysAlert.classList.remove("success-icon", "success-icon", "info-icon", "confirm-icon", "danger-icon", "warning-icon")
  if (iconType === "Alert") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon")
    }
  } else if (iconType === "Success") {
    if (!sysAlert.classList.contains("success-icon")) {
      sysAlert.classList.add("success-icon")
    }
  } else if (iconType === "Info") {
    if (!sysAlert.classList.contains("info-icon")) {
      sysAlert.classList.add("info-icon")
    }
  } else if (iconType === "Confirm") {
    if (!sysAlert.classList.contains("confirm-icon")) {
      sysAlert.classList.add("confirm-icon")
    }
  } else if (iconType === "Warning") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon")
    }
  } else if (iconType === "Error") {
    if (!sysAlert.classList.contains("danger-icon")) {
      sysAlert.classList.add("danger-icon")
    }
  }
  const activeElement = (window as any).document.activeElement
  sysYes.innerHTML = escapeHTML(btnRightText)
  sysNo.innerHTML = escapeHTML(btnLeftText)
  ;(sysYes as any)["activeElement"] = activeElement
  sysAlert.style.display = "flex"
  ;(window as any).fyesOnClick = yesCallback
  ;(window as any).fnoOnClick = noCallback
  sysYes.focus()
}
function showConfirm(msg: string, yesCallback?: () => void, header?: string, btnLeftText?: string, btnRightText?: string, noCallback?: () => void): void {
  const l = btnLeftText ? btnLeftText : resources.leftText
  const r = btnRightText ? btnRightText : resources.rightText
  const h = header ? header : resources.confirmHeader
  showAlert(msg, h, "Confirm", "Confirm", l, r, yesCallback, noCallback)
}
function alertError(msg: string, callback?: () => void, header?: string, detail?: string): void {
  const h = header ? header : resources.errorHeader
  showAlert(msg, h, "Alert", "Error", "", "", callback, undefined, detail)
}
function alertWarning(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.warningHeader
  showAlert(msg, h, "Alert", "Warning", "", "", callback, undefined)
}
function alertInfo(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.infoHeader
  showAlert(msg, h, "Alert", "Info", "", "", callback, undefined)
}
function alertSuccess(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.successHeader
  showAlert(msg, h, "Alert", "Success", "", "", callback, undefined)
}
