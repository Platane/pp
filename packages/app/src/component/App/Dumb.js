import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { Splash } from '~/component/_page/Splash'
import { SessionLine } from '~/component/_page/SessionLine'
import { SessionResult } from '~/component/_page/SessionResult'
import { Instruction } from '~/component/_page/Instruction'
import { Waiting } from '~/component/_page/Waiting'
import { Wallpaper } from '~/component/Wallpaper'
import { PopupZone } from '~/component/PopupZone'

export const Content = ({ router, session, creatingSession }) => {
  if (
    (['sessionLine', 'sessionResult'].includes(router.key) && !session) ||
    creatingSession
  )
    return <Waiting />

  switch (router.key) {
    case 'home':
      return <Splash />

    case 'instruction':
      return <Instruction />

    case 'sessionLine':
      return <SessionLine {...router.param} />

    case 'sessionResult':
      return <SessionResult {...router.param} />

    default:
      return null
  }
}

export const App = props => (
  <Container>
    <Wallpaper />
    <ContentWrap>
      <Content {...props} />
    </ContentWrap>
    <PopupZone {...props} />
  </Container>
)

const ContentWrap = styled.div`
  flex: auto 1 1;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`
