import styled, { css } from 'preact-emotion'
import { h } from 'preact'
import {
  vibrant,
  white,
  black,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'
export { Input } from '~/component/Input'

export const PopupContainer = ({ close, children }) => (
  <Container>
    <CloseButton onClick={close} href="#">
      ×
    </CloseButton>
    <Content>{children}</Content>
  </Container>
)

const Container = styled.div`
  padding: 32px;
  background-color: ${white};
  position: relative;
  border-radius: ${borderRadius}px;
  position: relative;

  min-height: 256px;

  width: 80%;
  max-width: 800px;
`

const Content = styled.div`
  max-width: 480px;
  margin: 0 auto;
`

const CloseButton = styled.a`
  position: absolute;
  top: 8px;
  right: 8px;
  text-decoration: none;
  color: ${black};
  padding: 4px;
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
  display: block;
`

export const Form = styled.form`
  &:invalid {
    button[type='submit'] {
      transition: filter ${transitionUnit}ms ease;
      filter: grayscale(1);
    }
  }
  &:valid {
    button[type='submit'] {
    }
  }
`
