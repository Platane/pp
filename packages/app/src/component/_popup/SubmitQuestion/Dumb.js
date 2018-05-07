import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Button } from '~/component/Button'
import { PopupContainer } from '~/component/PopupContainer'

const createSubmitHandler = submitQuestion => e => {
  e.preventDefault()

  const mail = e.currentTarget.elements[0].value

  submitQuestion(mail)
}

export const SubmitQuestion = ({ path, submitQuestion, close }) => (
  <PopupContainer close={close}>
    <Title>Got a question as tough as a VC's?</Title>

    <Subtitle>Let us know what you think they're going to ask!</Subtitle>

    <Separator />

    <form onSubmit={createSubmitHandler(submitQuestion)}>
      <Input type="text" placeholder="Who's got equity besides investors?" />

      <Separator />

      <ButtonBar>
        <Button type="submit" color={vibrant[1]}>
          Submit question
        </Button>

        <Separator />

        <Button onClick={close} color={vibrant[1]}>
          take me back
        </Button>
      </ButtonBar>
    </form>
  </PopupContainer>
)

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const Separator = styled.div`
  width: 64px;
  height: 64px;
`

const Title = styled.h1`
  text-align: center;
`

const Subtitle = styled.h2`
  text-align: center;
`

const Input = styled.input`
  height: 64px;
  width: 100%;
  padding: 16px 32px;
  text-align: center;
  font-size: 1.4em;
`
