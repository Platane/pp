import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'

export const SessionLine = ({ setAnswer, question, sessionId, lineId }) =>
  question ? (
    <Container>
      <Center>
        <QuestionLabel>{question.text}</QuestionLabel>

        <ButtonBar>
          <Button onClick={() => setAnswer(sessionId, lineId, true)}>
            I've got this
          </Button>

          <Separator />

          <Button
            onClick={() => setAnswer(sessionId, lineId, false)}
            outline
            color={white}
          >
            not sure
          </Button>
        </ButtonBar>
      </Center>
    </Container>
  ) : (
    <span>...</span>
  )

const QuestionLabel = styled.h1`
  color: ${white};
  margin: 64px 0;
  text-align: center;
  font-size: 2em;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
const Center = styled.div`
  width: calc(100% - 64px);
  max-width: 800px;
  margin: 64px auto;
`
const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Separator = styled.div`
  width: 64px;
  height: 64px;
`
