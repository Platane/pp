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
import { ThanksForSubscribe } from '~/component/_popup/ThanksForSubscribe'
import { ThanksForTheQuestion } from '~/component/_popup/ThanksForTheQuestion'
import { SubmitQuestion } from '~/component/_popup/SubmitQuestion'
import { Result } from '~/component/_popup/Result'
import { Break } from '~/component/_popup/Break'

export const PopupZone = ({ active }) => (
  <IndirectTransition toTransition={active} delay={transitionUnit}>
    {({ next, previous, indirectNext }) => {
      const active = next || previous

      return active ? (
        <Container>
          <Overlay fadeOut={!indirectNext && !next} />
          <Content fadeIn={next} fadeOut={previous}>
            {(active === 'subscribe' && <SubscribeToNewsletter />) ||
              (active === 'subscribeok' && <ThanksForSubscribe />) ||
              (active === 'questionok' && <ThanksForTheQuestion />) ||
              (active === 'submitquestion' && <SubmitQuestion />) ||
              (active === 'break' && <Break />) ||
              (active === 'result' && <Result />) ||
              null}
          </Content>
        </Container>
      ) : null
    }}
  </IndirectTransition>
)

const fadeIn = keyframes`
  0% { background-color: rgba(0, 0, 0, 0); }
  100% { background-color: rgba(0, 0, 0, 0.4); }
`
const fadeOut = keyframes`
  0% { background-color: rgba(0, 0, 0, 0.4); }
  100% { background-color: rgba(0, 0, 0, 0); }
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
  z-index: 10;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.4);

  animation: ${props => (props.fadeOut && fadeOut) || fadeIn}
    ${transitionUnit}ms ease;
`

const popin = keyframes`
  0% { opacity: 0; transform: translateY(200px);}
  80% { opacity: 1; transform: translateY(0px);}
  100% { opacity: 1; transform: translateY(0px);}
`

const popout = keyframes`
  0% { opacity: 1; transform: translateY(0px);}
  80% { opacity: 0; transform: translateY(200px);}
  100% { opacity: 0; transform: translateY(200px);}
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${props => (props.fadeIn && popin) || (props.fadeOut && popout)}
    ${transitionUnit * 1.1}ms ease;
`
