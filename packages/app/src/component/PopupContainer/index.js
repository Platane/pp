import styled, { css } from 'preact-emotion'
import { h } from 'preact'
import {
  vibrant,
  white,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'

export const PopupContainer = ({ close, children }) => (
  <Container>
    <CloseButton onClick={close}>x</CloseButton>
    {children}
  </Container>
)

const Container = styled.div`
  padding: 32px;
  background-color: ${white};
  position: relative;
  border-radius: ${borderRadius}px;
  position: relative;

  min-height: 256px;
`

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`
