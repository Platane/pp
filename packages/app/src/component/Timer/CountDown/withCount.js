import { h, Component } from 'preact'

export default C =>
  class WithCount extends Component {
    _killTimeout = null

    _update = () => this.forceUpdate()

    render() {
      const { startDate, running, pausedAt, duration, ...props } = this.props

      let remaining = 0

      clearTimeout(this._killTimeout)

      if (running) {
        const delta = startDate + duration - Date.now()

        if (delta > 0)
          this._killTimeout = setTimeout(this._update, delta % 1000)

        remaining = Math.max(0, delta)
      } else remaining = duration - pausedAt

      return <C {...props} secRemaining={Math.ceil(remaining / 1000)} />
    }
  }
