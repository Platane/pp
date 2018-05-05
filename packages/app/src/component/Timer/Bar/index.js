import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import {
  white,
  vibrant,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'

export class Bar extends Component {
  _killTimeout = null

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.duration != this.props.duration ||
      nextProps.startDate != this.props.startDate
    )
  }

  componentDidMount() {}

  afterRender = () => {
    if (!this.base) return

    const x = (Date.now() - this.props.startDate) / this.props.duration

    if (x > 1) return

    const animationKey = [
      {
        transform: `scaleX(${1 - x})`,
      },
      {
        transform: 'scaleX(0)',
      },
    ]

    this.base.children[0].animate(animationKey, {
      duration: (1 - x) * this.props.duration,
      easing: 'linear',
    })
  }

  render() {
    clearTimeout(this._killTimeout)
    this._killTimeout = setTimeout(this.afterRender, 1)

    return (
      <Container>
        <BarInside />
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  background-color: ${white};
  border-radius: ${borderRadius}px 0 0 ${borderRadius}px;
  width: 100%;
  height: 32px;
  overflow: hidden;
`
const BarInside = styled.div`
  transform-origin: left;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${vibrant[1]};
  transform: scaleX(0);
`
