function starOnMouseEnter(e: Event) {
  const star = e.target as HTMLElement
  const picker = star.parentElement as HTMLElement
  const value = Number(star.dataset.v)
  const starts = picker.querySelectorAll("span")
  highlight(starts, value)
}
function starOnMouseLeave(e: Event) {
  const star = e.target as HTMLElement
  const picker = star.parentElement as HTMLElement
  const value = Number(picker.dataset.v ? picker.dataset.v : 0)
  const starts = picker.querySelectorAll("span")
  highlight(starts, value)
}
function starOnClick(e: Event) {
  const star = e.target as HTMLElement
  const picker = star.parentElement as HTMLElement
  picker.childNodes
  picker.setAttribute("data-v", star.dataset.v as string)
  const value = Number(star.dataset.v)
  const starts = picker.querySelectorAll("span")
  highlight(starts, value)
}

function highlight(stars: NodeListOf<HTMLSpanElement>, r: number) {
  stars.forEach((s) => s.classList.toggle("active", r >= (s.dataset.v as any)))
}
