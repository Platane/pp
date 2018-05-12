import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import {
  black,
  vibrant,
  white,
  transitionUnit,
} from '~/component/_abstract/palette'
import { Spinner } from '~/component/Spinner'

export const Waiting = () => (
  <Container>
    <Spinner />
  </Container>
)

const fadeIn = keyframes`
  0% { opacity: 0 };
  50% { opacity: 0 };
  100% { opacity: 1 };
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  animation: ${fadeIn} ${transitionUnit * 2}ms linear;
`
