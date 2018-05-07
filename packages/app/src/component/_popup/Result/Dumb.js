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

const createSubmitHandler = submitQuestion => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  submitQuestion(mail)
}

export const Result = ({ path, submitQuestion, close }) => (
  <PopupContainer close={close}>
    <Title>{`You're ${45}% Pitch Perfect`}</Title>

    <Subtitle>Not bad! You're nearly ready to pitch the VC</Subtitle>

    <Separator />

    <form onSubmit={createSubmitHandler(submitQuestion)}>
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

        <Button onClick={startOver} color={vibrant[1]}>
          Start over
        </Button>
      </ButtonBar>
    </form>
  </PopupContainer>
)
