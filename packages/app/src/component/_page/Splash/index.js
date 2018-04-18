import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'

export const Splash = () => (
  <Container>
    <Center>
      <Title>PitchPerfect</Title>
      <Subtitle>know what you don't</Subtitle>

      <Separator />

      <Link href="/instruction">
        <A>
          <Button color={white} outline>
            I'm ready
          </Button>
        </A>
      </Link>
    </Center>
  </Container>
)

const A = styled.a`
  text-decoration: none;

  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
  }
`

const Title = styled.h1`
  font-size: 5em;
  text-align: center;
  color: ${white};
`
const Subtitle = styled.h2`
  font-size: 2em;
  text-align: center;
  color: ${white};
`

const Separator = styled.div`
  width: 64px;
  height: 64px;
`

const Center = styled.div`
  width: calc(100% - 64px);
  max-width: 800px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
