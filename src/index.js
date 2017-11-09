import throttle from 'lodash.throttle'

const ns = '$$vResizeContext'
const defaultOptions = {
  resizableClass: 'vrz-resizable',
  draggedClass: 'vrz-dragged',
  resizingClass: 'vrz-resizing',
  directions: ['bottom', 'right'],
  zoneSize: 4,
}

const createObservable = ({ data = {}, watch = {} }) => {
  const o = {
    $data: { ...data },
  }

  Object.keys(data).forEach((key) => {
    Object.defineProperty(o, key, {
      get () {
        return o.$data[key]
      },
      set (value) {
        if (value !== o.$data[key]) {
          watch[key] && watch[key](value, o.$data[key])
        }

        o.$data[key] = value
      },
    })
  })

  return o
}

class Resize {
  constructor ({ options, target }) {
    this.options = options
    this.target = target

    this.state = createObservable({
      data: {
        isResizable: false,
        isDragged: false,
        isResizing: false,
        direction: null,
      },
      watch: {
        isResizable: this.handleResizableChange.bind(this),
        isDragged: this.handleDraggedChange.bind(this),
        isResizing: this.handleResizingChange.bind(this),
        direction: this.handleDirectionChange.bind(this),
      },
    })

    this.mousedown = this.mousedown.bind(this)
    this.mousemove = throttle(this.mousemove, 1000 / 60).bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.mouseleave = this.mouseleave.bind(this)
  }

  init () {
    document.body.addEventListener('mousemove', this.mousemove)

    this.target[ns] = {
      mousedown: this.mousedown,
      mousemove: this.mousemove,
      mouseup: this.mouseup,
    }
  }

  // events
  mousedown () {
    if (this.state.isResizable) {
      this.state.isDragged = true
    }
  }

  mousemove (event) {
    const targetPos = this.target.getBoundingClientRect()
    const cursorPos = {
      x: event.clientX,
      y: event.clientY,
    }

    if (this.state.isDragged) { // 开始缩放
      const frameMap = {
        top () {
          this.target.style.height = `${targetPos.bottom - cursorPos.y}px`
        },
        bottom () {
          this.target.style.height = `${cursorPos.y - targetPos.top}px`
        },
        left () {
          this.target.style.width = `${targetPos.right - cursorPos.x}px`
        },
        right () {
          this.target.style.width = `${cursorPos.x - targetPos.left}px`
        },
      }

      this.state.isResizing = true

      return window.requestAnimationFrame(() => {
        if (!this.state.direction) return

        const drs = this.state.direction.split('-')

        drs.forEach((item) => {
          frameMap[item].call(this)
        })

        this.options.onResize && this.options.onResize({
          direction: this.state.direction,
          target: this.target,
          event,
        })
      })
    }

    this.checkHit(cursorPos, targetPos)
  }

  mouseup () {
    this.state.isDragged = false
    this.state.isResizing = false
  }

  mouseleave () {
    this.state.isResizable = false
    this.state.isDragged = false
    this.state.isResizing = false
  }

  checkHit (cursorPos, targetPos) {
    const isInside = (
      cursorPos.y >= targetPos.top &&
      cursorPos.y <= targetPos.bottom &&
      cursorPos.x >= targetPos.left &&
      cursorPos.x <= targetPos.right
    )

    if (!isInside) {
      this.state.direction = null
      this.state.isResizable = false

      return
    }

    const checkMap = {
      top: cursorPos.y - targetPos.top <= this.options.zoneSize,
      bottom: targetPos.bottom - cursorPos.y <= this.options.zoneSize,
      left: cursorPos.x - targetPos.left <= this.options.zoneSize,
      right: targetPos.right - cursorPos.x <= this.options.zoneSize,
    }

    const res = this.options.directions.sort().filter(item => checkMap[item])

    if (res.length) {
      this.state.direction = res.join('-')
      this.state.isResizable = true
    } else {
      this.state.direction = null
      this.state.isResizable = false
    }
  }

  // watchers
  handleResizableChange (value) {
    if (value) {
      document.body.addEventListener('mouseup', this.mouseup)
      document.body.addEventListener('mousedown', this.mousedown)
      this.target.classList.add(this.options.resizableClass)
    } else {
      document.body.removeEventListener('mousedown', this.mousedown)
      document.body.removeEventListener('mouseup', this.mouseup)
      this.target.classList.remove(this.options.resizableClass)
    }
  }

  handleDirectionChange (value) {
    const cursorMap = {
      top: 'ns-resize',
      bottom: 'ns-resize',
      left: 'ew-resize',
      right: 'ew-resize',
      'left-top': 'nwse-resize',
      'bottom-right': 'nwse-resize',
      'right-top': 'nesw-resize',
      'bottom-left': 'nesw-resize',
    }

    document.body.style.cursor = value ? cursorMap[value] : null
  }

  handleDraggedChange (value) {
    if (value) {
      document.body.addEventListener('mouseleave', this.mouseleave)
      document.body.style['user-select'] = 'none'
      this.target.classList.add(this.options.draggedClass)
    } else {
      document.body.removeEventListener('mouseleave', this.mouseleave)
      document.body.style['user-select'] = ''
      this.target.classList.remove(this.options.draggedClass)
    }
  }

  handleResizingChange (value) {
    if (value) {
      this.target.classList.add(this.options.resizingClass)
      // document.body.classList.add(this.options.resizingClass)
    } else {
      this.target.classList.remove(this.options.resizingClass)
      // document.body.classList.remove(this.options.resizingClass)
    }
  }
}

export default {
  name: 'resize',
  inserted (el, binding) {
    const rz = new Resize({
      target: el,
      options: {
        ...defaultOptions,
        ...binding.value,
      },
    })

    rz.init()
  },
  unbind (el) {
    document.addEventListener('mousedown', el[ns].mousedown)
    document.addEventListener('mousemove', el[ns].mousemove)
    document.addEventListener('mouseup', el[ns].mouseup)
  },
}
