import { h, Component } from 'preact'

export default C =>
  class WithCount extends Component {
    _killTimeout = null

    _update = () => this.forceUpdate()

    render() {
      const delta = this.props.startDate + this.props.duration - Date.now()

      clearTimeout(this._killTimeout)
      if (delta > 0) {
        this._killTimeout = setTimeout(this._update, delta % 1000)
      }

      const secRemaining = Math.max(0, Math.ceil(delta / 1000))

      return <C {...this.props} secRemaining={secRemaining} />
    }
  }
