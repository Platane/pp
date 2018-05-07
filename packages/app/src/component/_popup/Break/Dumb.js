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

export const Break = ({ path, sessionId, close }) => (
  <PopupContainer close={close}>
    <Title>Do you want to keep praticing your pitch?</Title>

    <Separator />

    <ButtonBar>
      <Button onClick={close} color={vibrant[1]}>
        Yes, bring it on
      </Button>

      <Separator />

      <Link href={`/session/${sessionId}/result`}>
        <Button color={vibrant[1]}>Noi, show results</Button>
      </Link>
    </ButtonBar>

    <Separator />

    <Link href={path} query={{ submitquestion: true }}>
      <A>
        Think you know what the VC's are going to aks ?<br />
        Sugget a question to us!
      </A>
    </Link>
  </PopupContainer>
)
