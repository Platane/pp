import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Button } from '~/component/Button'
import {
  PopupContainer,
  ButtonBar,
  A,
  Title,
  Subtitle,
  Input,
} from '~/component/PopupContainer'
import { Separator } from '~/component/Separator'

const createSubmitHandler = subscribeToNewsletter => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  subscribeToNewsletter(mail)
}

export const Result = ({
  isEnd,
  score,
  subscribeToNewsletter,
  startOver,
  close,
}) => (
  <PopupContainer close={close}>
    <Title>{`You're ${score}% Pitch Perfect`}</Title>

    <Subtitle>Not bad! You're nearly ready to pitch the VC</Subtitle>

    <Separator />

    <form onSubmit={createSubmitHandler(subscribeToNewsletter)}>
      <Input
        type="mail"
        placeholder="enter your email address for full results"
      />

      <Separator />

      <ButtonBar>
        <Button type="submit" color={vibrant[1]}>
          Send my results
        </Button>

        <Separator />

        <Button onClick={isEnd ? startOver : close} color={vibrant[1]}>
          {isEnd ? 'Start over' : 'Continue'}
        </Button>
      </ButtonBar>
    </form>
  </PopupContainer>
)
