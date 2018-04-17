import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { white, vibrant, transitionUnit } from '~/component/_abstract/palette'

export const CountDown = ({ secRemaining }) => (
  <Container>
    <Label key={secRemaining}>{secRemaining}</Label>
  </Container>
)

const hop = keyframes`
  0%{ transform:scale(1,1) }
  30%{ transform:scale(1.4,1.4) }
  100%{ transform:scale(1,1) }
`
const Label = styled.span`
  display: block;
  color: ${white};
  width: 32px;
  height: 32px;
  animation: ${hop} ${transitionUnit}ms linear;
  transform-origin: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

const Container = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${vibrant[0]};
`
