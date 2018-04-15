import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { Splash } from '~/component/_page/Splash'
import { Instruction } from '~/component/_page/Instruction'
import { Wallpaper } from '~/component/Wallpaper'

export const Content = ({ router }) => {
  switch (router.key) {
    case 'home':
      return <Splash />

    case 'instruction':
      return <Instruction />

    case 'sessionLine':
    // return <SessionLine {...router.param} />

    case 'sessionResult':
    // return <SessionStat {...router.param} />

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
  </Container>
)

const ContentWrap = styled.div`
  flex: 0px 1 1;
  position: relative;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`