import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'

const categories = [
  'metrics',
  'business_model',
  'go_to_market',
  'funding_round',
]

const category_label = {
  metrics: 'Metrics',
  business_model: 'Business model',
  go_to_market: 'Go to market',
  funding_round: 'Funding round',
}

const CategoryColumn = ({ title, answer, session }) => (
  <Column>
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

export const SessionResult = ({ session }) =>
  session ? (
    <Container>
      <CategoryColumn title="you know" session={session} answer={true} />
      <CategoryColumn title="you don't" session={session} answer={false} />
    </Container>
  ) : (
    <span>...</span>
  )

const Container = styled.div``
const Column = styled.div``
const Category = styled.div``
const ColumnTitle = styled.h1``
const CategoryTitle = styled.h2``
const QuestionLabel = styled.p``
const QuestionList = styled.div``
