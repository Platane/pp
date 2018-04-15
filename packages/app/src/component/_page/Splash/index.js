import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'

export const Splash = () => (
  <Container>
    Splash Screen
    <Link href="/instruction">
      <a>instruction</a>
    </Link>
  </Container>
)

const Container = styled.div``
