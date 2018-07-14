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

export const ThanksForTheQuestion = ({ path, isEnd, close }) => (
  <PopupContainer close={close}>
    <Title>Your question have been noted!</Title>
    <Subtitle>
      It will be added to the deck soon! <i>(assuming it's not a dick joke)</i>
    </Subtitle>

    <Separator />

    <ButtonBar>
      <Button type="button" onClick={close} color={vibrant[1]}>
        take me back
      </Button>
    </ButtonBar>

    <Separator />

    <Link href={path} query={{ submitquestion: true }}>
      <A>
        Another one ?<br />
        Sugget a question to us!
      </A>
    </Link>
  </PopupContainer>
)
