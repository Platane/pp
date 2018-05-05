import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import { Timer } from '~/component/Timer'
import { Spinner } from '~/component/Spinner'
import { PopupContainer } from '~/component/PopupContainer'
import { Transition } from 'react-propstransition'
import { IndirectTransition } from 'react-propstransition'

export const SubscribeToNewsletter = props => (
  <PopupContainer close={props.close}>
    <ButtonBar>
      <Button onClick={props.close} color={vibrant[1]}>
        keep playing
      </Button>

      <Separator />

      <Button
        onClick={() => setAnswer(sessionId, lineId, false)}
        outline
        color={white}
      >
        send me stuff
      </Button>
    </ButtonBar>
  </PopupContainer>
)

const ButtonBar = styled.div`
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
