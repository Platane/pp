import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import { PopupContainer } from '~/component/PopupContainer'

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

    <Link href={path} query={{ submitquestion: true }}>
      <A>
        Think you know what the VC's are going to aks ?<br />
        Sugget a question to us!
      </A>
    </Link>
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

const A = styled.a`
  text-align: center;
`

const Input = styled.input`
  height: 64px;
  width: 100%;
  padding: 16px 32px;
  text-align: center;
  font-size: 1.4em;
`
