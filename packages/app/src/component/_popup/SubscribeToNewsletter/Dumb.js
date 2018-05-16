import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import {
  PopupContainer,
  ButtonBar,
  Form,
  A,
  Title,
} from '~/component/PopupContainer'
import { Separator } from '~/component/Separator'
import { SocialBar } from '~/component/SocialBar'
import { Input, emailPattern } from '~/component/Input'

const createSubmitHandler = subscribeToNewsletter => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  subscribeToNewsletter(mail)
}

export const SubscribeToNewsletter = ({
  path,
  subscribeToNewsletter,
  close,
}) => (
  <PopupContainer close={close}>
    <Title>Get the full list of questions straight to your inbox</Title>

    <Separator />

    <Form onSubmit={createSubmitHandler(subscribeToNewsletter)}>
      <Input
        type="mail"
        minlength="1"
        placeholder="founder@startup.com"
        pattern={emailPattern}
        required
      />

      <Separator />

      <ButtonBar>
        <Button type="button" onClick={close} color={vibrant[1]}>
          keep playing
        </Button>

        <Separator />

        <Button type="submit" outline color={vibrant[1]}>
          send me stuff
        </Button>
      </ButtonBar>
    </Form>

    <Separator />

    <SocialBar />

    <Separator />

    <Link href={path} query={{ submitquestion: true }}>
      <A>
        Think you know what the VC's are going to aks ?<br />
        Sugget a question to us!
      </A>
    </Link>
  </PopupContainer>
)
