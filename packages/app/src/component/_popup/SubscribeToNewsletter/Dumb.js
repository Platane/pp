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

const createSubmitHandler = subscribeToNewsletter => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  subscribeToNewsletter(mail)
}

export const SubscribeToNewsletter = ({ subscribeToNewsletter, close }) => (
  <PopupContainer close={close}>
    <form onSubmit={createSubmitHandler(subscribeToNewsletter)}>
      <Input id="mail-form" type="mail" />

      <Separator />

      <ButtonBar>
        <Button onClick={close} color={vibrant[1]}>
          keep playing
        </Button>

        <Separator />

        <Button type="submit" outline color={vibrant[1]}>
          send me stuff
        </Button>
      </ButtonBar>
    </form>
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
const Input = styled.input`
  height: 64px;
  width: 100%;
`
