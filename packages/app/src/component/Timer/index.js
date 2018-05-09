import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { CountDown } from './CountDown'
import { Bar } from './Bar'

// <Bar startDate={startDate} duration={duration} />

export const Timer = ({ status, pausedAt, startDate, duration, ...props }) => (
  <Container>
    <TicPosition>
      <CountDown
        startDate={startDate}
        duration={duration}
        running={status === 'running'}
        pausedAt={pausedAt}
      />
    </TicPosition>
  </Container>
)

const Container = styled.div`
  position: relative;
`
const TicPosition = styled.div`
  position: absolute;
  right: -16px;
  top: 0;
`
