import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'

export const Instruction = ({ creating, startNewSession }) =>
  creating ? (
    <Container> ... </Container>
  ) : (
    <Container>
      Instruction
      <a onClick={startNewSession} href="#">
        start
      </a>
    </Container>
  )

const Container = styled.div``
