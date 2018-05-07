import styled, { css, keyframes } from 'preact-emotion'
import { h } from 'preact'
import { IndirectTransition } from 'react-propstransition'
import {
  vibrant,
  white,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'
import { SubscribeToNewsletter } from '~/component/_popup/SubscribeToNewsletter'
import { SubmitQuestion } from '~/component/_popup/SubmitQuestion'
import { Result } from '~/component/_popup/Result'
import { Break } from '~/component/_popup/Break'

export const PopupZone = ({ active }) => (
  <IndirectTransition toTransition={active} delay={transitionUnit}>
    {({ next, previous, transition }) =>
      next || previous ? (
        <Container>
          {(active === 'subscribe' && <SubscribeToNewsletter />) ||
            (active === 'submitquestion' && <SubmitQuestion />) ||
            (active === 'break' && <Break />) ||
            (active === 'result' && <Result />) ||
            null}
        </Container>
      ) : null
    }
  </IndirectTransition>
)

const fadeIn = keyframes`
  0% { background-color: rgba(0, 0, 0, 0); }
  100% { background-color: rgba(0, 0, 0, 0.4); }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.4);

  animation: ${fadeIn} ${transitionUnit}ms ease;
`
const Center = styled.div`
  width: calc(100% - 64px);
  max-width: 940px;
  margin: 64px auto;
  background-color: ${white};
  border-radius: 32px;
  padding: 64px;

  @media (max-width: 600px) {
    border-radius: 0;
    padding: 64px;
    width: 100%;
    margin: 0;
  }
`
