export default {
  moved: false, // diffrentiate click and move
  mousedown: false,
  onMove(e: MouseEvent, container: HTMLElement) {
    if (this.mousedown) {
      this.moved = true
      const deltaX = e.movementX
      const deltaY = e.movementY
      container.scrollTo(container.scrollLeft - deltaX, container.scrollTop - deltaY)
    }
  },
  clear() {
    this.moved = false
    this.mousedown = false
  },
}
