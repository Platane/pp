import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import { Timer } from '~/component/Timer'
import { Spinner } from '~/component/Spinner'
import { Transition } from 'react-propstransition'
import { IndirectTransition } from 'react-propstransition'
import { ButtonBar } from './ButtonBar'

const equal = (a, b) => a.lineId === b.lineId

export const SessionLine = props => (
  <IndirectTransition
    delay={transitionUnit * 1.2}
    toTransition={props}
    equal={equal}
  >
    {({ next, previous, transition }) =>
      !(next || previous).question ? (
        <Spinner />
      ) : (
        <Container>
          <Center>
            <Timer {...(next || previous).timeout} />

            <Separator />

            <QuestionLabel visible={next}>
              {(next || previous).question.text}
            </QuestionLabel>

            <ButtonBar
              {...next || previous}
              fadeOut={previous}
              fadeIn={next}
              transition={transition}
              previousAnswer={props.previousAnswer}
            />
          </Center>
        </Container>
      )
    }
  </IndirectTransition>
)

const QuestionLabel = styled.h1`
  color: ${white};
  margin: 64px 0;
  text-align: center;
  font-size: 2em;
  min-height: 3.5em;

  transition: opacity ${transitionUnit}ms ease;
  opacity: ${props => (props.visible ? 1 : 0)};
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

const Separator = styled.div`
  width: 64px;
  height: 64px;
`
