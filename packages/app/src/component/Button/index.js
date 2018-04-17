import styled, { css } from 'preact-emotion'
import { h } from 'preact'
import {
  vibrant,
  white,
  borderRadius,
  tranisitionUnit,
} from '~/component/_abstract/palette'

const getStyle = ({ outline, color, textColor }) => {
  if (outline)
    return css`
      border: solid 2px ${color};
      background-color: transparent;
      color: ${textColor || color};
    `
  else
    return css`
      border: solid 2px transparent;
      background-color: ${color};
      color: ${white};
    `
}

export const Button = styled.button`
  border: none;
  min-width: 200px;
  padding: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius}px;

  font-size: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${p => getStyle(p)};

  transition: transform ${tranisitionUnit}ms ease;

  &:active {
    transition: none;
    transform: scale(0.93, 0.93);
  }
`

Button.defaultProps = {
  color: vibrant[1],
  outline: false,
}
