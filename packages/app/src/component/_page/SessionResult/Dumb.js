import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import {
  black,
  vibrant,
  white,
  transitionUnit,
} from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Button } from '~/component/Button'
import { Spinner } from '~/component/Spinner'
import { SubscriptionFooter } from '~/component/SubscriptionFooter'
import { categories, category_label } from '~/constant'

const CategoryColumn = ({ title, answer, session, color }) => (
  <Column color={color}>
    <ColumnTitle>{title}</ColumnTitle>
    {categories.map(category => (
      <Category>
        <CategoryTitle>{category_label[category]}</CategoryTitle>
        <QuestionList>
          {session.lines
            .filter(l => l.question.category == category && l.answer == answer)
            .map(l => (
              <QuestionLabel key={l.question.id}>
                {l.question.text}
              </QuestionLabel>
            ))}
        </QuestionList>
      </Category>
    ))}
  </Column>
)

export const SessionResult = ({ session, router, startNewSession }) =>
  session ? (
    <Container>
      <Center>
        <Row>
          <CategoryColumn
            title="You know"
            session={session}
            answer={true}
            color={vibrant[0]}
          />

          <Separator />

          <CategoryColumn
            title="You don't"
            session={session}
            answer={false}
            color={vibrant[1]}
          />
        </Row>

        <Separator />

        <ButtonBar>
          <Button onClick={startNewSession} color={vibrant[1]}>
            Start over
          </Button>

          <Separator />

          <Button outline color={vibrant[0]}>
            share PitchPerfect
          </Button>
        </ButtonBar>
      </Center>

      <SubscriptionFooter router={router} />
    </Container>
  ) : (
    <Spinner />
  )

const appear = keyframes`
  0%{ opacity: 0; transform: translateY(300px) scale(0.8,0.5)}
  100%{ opacity: 1; transform: scale(1,1)}
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
  max-width: 940px;
  margin: 64px auto;
  background-color: ${white};
  border-radius: 32px;
  padding: 64px;

  animation: ${appear} ${transitionUnit}ms ease;

  @media (max-width: 600px) {
    border-radius: 0;
    padding: 64px;
    width: 100%;
    margin: 0;
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  flex: 50% 0 1;
  color: ${props => props.color};
`
const Category = styled.div``
const ColumnTitle = styled.h1`
  text-align: center;
`
const CategoryTitle = styled.h2``
const QuestionList = styled.ul`
  margin: 0;
  min-height: 32px;
  margin-bottom: 16px;
`
const QuestionLabel = styled.li`
  color: ${black};
`

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const Separator = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`
