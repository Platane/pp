import styled, { css } from 'preact-emotion'
import { h } from 'preact'
import {
  vibrant,
  white,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'

const PopupContainer = ({ close, children }) => (
  <Container>
    <CloseButton onClick={close}>x</CloseButton>
    {children}
  </Container>
)

const Container = styled.div`
  position: relative;
`

const CloseButton = styled.div`
  position: absolute;
`
