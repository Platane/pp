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

export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`
export const Separator = styled.div`
  width: 64px;
  height: 64px;
`

export const Title = styled.h1`
  text-align: center;
`

export const Subtitle = styled.h2`
  text-align: center;
`

export const A = styled.a`
  text-align: center;
`

export const Input = styled.input`
  height: 64px;
  width: 100%;
  padding: 16px 32px;
  text-align: center;
  font-size: 1.4em;
`
