import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Button as Button_ } from '~/component/Button'

export const ButtonBar = ({
  setAnswer,
  sessionId,
  lineId,
  previousAnswer,
  fadeIn,
  fadeOut,
}) => (
  <Container>
    <Button
      onClick={() => setAnswer(sessionId, lineId, true)}
      fadeIn={fadeIn}
      fadeOut={fadeOut}
      selected={previousAnswer === true}
      color={vibrant[1]}
    >
      I've got this
    </Button>

    <Separator />

    <Button
      onClick={() => setAnswer(sessionId, lineId, false)}
      fadeIn={fadeIn}
      fadeOut={fadeOut}
      selected={previousAnswer === false}
      outline
      color={white}
    >
      not sure
    </Button>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const Separator = styled.div`
  width: 64px;
  height: 64px;
`

const fadeOut = keyframes`
  0%{ opacity: 1}
  16%{ opacity: 0}
  100%{ opacity: 0}
`

const alternativeFadeOut = keyframes`
  0%{ opacity: 1; transform: scale(1,1)}
  15%{ opacity: 1; transform: translateY(-30px) scale(1.25,1.25) rotate(3deg)}
  44%{ opacity: 0; transform: translateY(110px) rotate(18deg)}
  100%{ opacity: 0}
`

const fadeIn = keyframes`
  0%{ opacity: 0; transform: scale(1,1)}
  10%{ opacity: 0; transform: scale(0.9,0.8)}
  30%{ opacity: 1; transform: scale(1.1,1.15)}
  50%{ opacity: 1; transform: scale(1,1)}
  100%{ opacity: 1; transform: scale(1,1)}
`

const Button = styled(Button_)`
  animation: ${props =>
      (props.fadeOut && !props.selected && fadeOut) ||
      (props.fadeOut && props.selected && alternativeFadeOut) ||
      (props.fadeIn && fadeIn) ||
      null}
    ${transitionUnit * 1.6}ms linear;
`
