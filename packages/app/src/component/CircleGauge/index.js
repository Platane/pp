import { h } from 'preact'

const round = x => Math.round(x * 10) / 10

export const arcPath = (angle: number) =>
  angle >= Math.PI * 1.99
    ? ['M 0 -100', `A 100 100 0 1 1 0 100`, `A 100 100 0 1 1 0 -100`].join('')
    : [
        'M 0 -100',
        `A 100 100 0 ${angle < Math.PI ? 0 : 1} 1 `,
        `${round(Math.sin(angle) * 100)} ${round(-Math.cos(angle) * 100)}`,
      ].join('')

export const CircularGauge = ({
  x,
  color,
  tickness,
  lineCap,
  className,
  style,
}) => (
  <svg
    viewBox={`-${100 + tickness / 2} -${100 + tickness / 2} ${200 +
      tickness} ${200 + tickness}`}
    className={className}
    style={style}
  >
    <path
      fill="none"
      strokeWidth={`${tickness}px`}
      strokeLinecap={lineCap}
      stroke={color}
      d={arcPath(Math.min(1, x) * Math.PI * 2)}
    />
  </svg>
)

CircularGauge.defaultProps = {
  color: '#000',
  tickness: 20,
  lineCap: 'round',
  x: 0,
}
