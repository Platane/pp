import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import {
  PopupContainer,
  ButtonBar,
  A,
  Title,
  Input,
} from '~/component/PopupContainer'
import { Separator } from '~/component/Separator'

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

    <form onSubmit={createSubmitHandler(subscribeToNewsletter)}>
      <Input type="mail" placeholder="founder@startup.com" />

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

    <Separator />

    <Link href={path} query={{ submitquestion: true }}>
      <A>
        Think you know what the VC's are going to aks ?<br />
        Sugget a question to us!
      </A>
    </Link>
  </PopupContainer>
)
