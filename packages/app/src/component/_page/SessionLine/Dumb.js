import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'

export const SessionLine = ({ setAnswer, question, sessionId, lineId }) =>
  question ? (
    <Container>
      {question.text}
      <a onClick={() => setAnswer(sessionId, lineId, true)} href="#">
        yes
      </a>
      <a onClick={() => setAnswer(sessionId, lineId, true)} href="#">
        no
      </a>
    </Container>
  ) : (
    <span>...</span>
  )

const Container = styled.div``
