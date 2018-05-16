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
import { SocialBar } from '~/component/SocialBar'
import { Link } from '~/component/Link'
import { Input, emailPattern } from '~/component/Input'

const createSubmitHandler = subscribeToNewsletter => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  subscribeToNewsletter(mail)
}

export const Result = ({
  isEnd,
  email_sent,
  currentSessionId,
  score,
  subscribeToNewsletter,
  startOver,
  close,
}) => (
  <PopupContainer close={close}>
    <Title>{`You're ${score}% Pitch Perfect`}</Title>

    <Subtitle>Not bad! You're nearly ready to pitch the VC</Subtitle>

    <Separator />

    {!email_sent ? (
      <Form onSubmit={createSubmitHandler(subscribeToNewsletter)}>
        <Input
          type="mail"
          minlength="1"
          pattern={emailPattern}
          required
          placeholder="enter your email address for full results"
        />

        <Separator />

        <ButtonBar>
          <Button type="submit" color={vibrant[1]}>
            Send my results
          </Button>

          <Separator />

          <Button
            type="button"
            onClick={isEnd ? startOver : close}
            color={vibrant[1]}
          >
            {isEnd ? 'Start over' : 'Continue'}
          </Button>
        </ButtonBar>
      </Form>
    ) : (
      <ButtonBar>
        <Link href={`/session/${currentSessionId}/result`}>
          <Button color={vibrant[1]}>See my results</Button>
        </Link>

        <Separator />

        <Button onClick={isEnd ? startOver : close} color={vibrant[1]}>
          {isEnd ? 'Start over' : 'Continue'}
        </Button>
      </ButtonBar>
    )}

    <Separator />

    <SocialBar />
  </PopupContainer>
)
