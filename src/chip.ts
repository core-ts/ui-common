function createChip(container: HTMLElement, text: string): HTMLElement {
  const chip = document.createElement("div")
  chip.className = "chip"
  chip.textContent = text

  const close = document.createElement("span")
  close.className = "close"
  close.onclick = () => chip.remove()

  chip.appendChild(close)
  container.appendChild(chip)

  return chip
}

function getChipsById(chipId: string): string[] {
  const container = document.getElementById(chipId)
  return container ? getChips(container) : []
}

function getChips(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll<HTMLElement>(".chip")).map((chip) => {
    const firstChild = chip.firstChild
    return firstChild?.textContent?.trim() ?? ""
  })
}

function addChip(triggerElement: HTMLButtonElement | HTMLFormElement, inputName: string, chipId: string): void {
  const form = triggerElement.tagName === "FORM" ? (triggerElement as HTMLFormElement) : (triggerElement as HTMLButtonElement).form

  if (!form) return

  const input = getElement(form, inputName) as HTMLInputElement
  if (!input) return

  const value = input.value.trim()
  if (!value) return

  const chipList = document.getElementById(chipId)
  if (!chipList) return

  createChip(chipList, value)
  input.value = ""
}

function chipOnKeydown(e: KeyboardEvent, chipId: string) {
  if (e.key === "Enter") {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    if (!target.readOnly && !target.disabled) {
      addChip(target.form as HTMLFormElement, target.name, chipId)
    }
  }
}
