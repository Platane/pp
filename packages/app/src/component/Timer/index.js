import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { CountDown } from './CountDown'
import { Bar } from './Bar'

export const Timer = ({ startDate, duration, ...props }) => (
  <Container>
    <Bar startDate={startDate} duration={duration} />
    <TicPosition>
      <CountDown startDate={startDate} duration={duration} />
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
