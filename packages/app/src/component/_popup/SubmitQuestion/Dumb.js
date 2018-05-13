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
  Form,
} from '~/component/PopupContainer'
import { Separator } from '~/component/Separator'
import { Input } from '~/component/Input'

const createSubmitHandler = submitQuestion => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  submitQuestion(mail)
}

export const SubmitQuestion = ({ submitQuestion, close }) => (
  <PopupContainer close={close}>
    <Title>Got a question as tough as a VC's?</Title>

    <Subtitle>Let us know what you think they're going to ask!</Subtitle>

    <Separator />

    <Form onSubmit={createSubmitHandler(submitQuestion)}>
      <Input
        type="text"
        placeholder="Who's got equity besides investors?"
        minlength="1"
        required
      />

      <Separator />

      <ButtonBar>
        <Button type="submit" color={vibrant[1]}>
          Submit question
        </Button>

        <Separator />

        <Button type="button" onClick={close} color={vibrant[1]}>
          take me back
        </Button>
      </ButtonBar>
    </Form>
  </PopupContainer>
)
