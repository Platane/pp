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
  Subtitle,
  Input,
} from '~/component/PopupContainer'
import { Separator } from '~/component/Separator'

export const ThanksForSubscribe = ({ path, isEnd, close }) => (
  <PopupContainer close={close}>
    <Title>You successfully subscribe to the newsletter</Title>
    <Subtitle>You will receive pitchperfect news soon</Subtitle>

    <Separator />

    <ButtonBar>
      <Button type="button" onClick={close} color={vibrant[1]}>
        {isEnd ? 'keep playing' : 'close'}
      </Button>
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
