import { connect as createDB } from '~/service/gcpDatastore'

const questions = [
  { text: 'What problem are you trying to solve?', category: 'business_model' },
  { text: "What's your business model?", category: 'business_model' },
  { text: "Who's your competition?", category: 'business_model' },
  { text: "Who's this product for?", category: 'business_model' },
  { text: 'Why your unfair advantage?', category: 'business_model' },
  { text: 'Why did you come up with this idea?', category: 'business_model' },
  {
    text: 'How many users do you need to break even?',
    category: 'business_model',
  },
  { text: 'How does your cash flow?', category: 'business_model' },
  { text: 'When do you need to pay suppliers?', category: 'business_model' },
  { text: 'Where are your customers?', category: 'business_model' },
  { text: "What's your last valuation?", category: 'funding' },
  { text: "What's your valuation for this round?", category: 'funding' },
  { text: 'Who invested in the last round?', category: 'funding' },
  { text: 'Who is partecipating in this round?', category: 'funding' },
  { text: 'Why our fund?', category: 'funding' },
  { text: 'How much are your raising?', category: 'funding' },
  { text: 'How many commitments so far?', category: 'funding' },
  { text: "How's the cap table looking like?", category: 'funding' },
  { text: 'How can we help you beside the cash?', category: 'funding' },
  { text: 'How do I access your databank?', category: 'funding' },
  { text: 'How are you going to spend this round?', category: 'funding' },
  { text: 'When are you closing this round?', category: 'funding' },
  { text: 'When did you start this round?', category: 'funding' },
  { text: 'Where can I see your financial model?', category: 'funding' },
  {
    text: 'What milestones are you planning to achieve as part of this round?',
    category: 'metrics',
  },
  { text: 'What are the potential exits?', category: 'metrics' },
  {
    text: "What's your scalable aquisition channel to date?",
    category: 'metrics',
  },
  {
    text: 'What can we expect at the back of this round?',
    category: 'metrics',
  },
  { text: 'Who is your ideal customer?', category: 'metrics' },
  { text: 'Why are you unique?', category: 'metrics' },
  { text: 'How are you planning to scale?', category: 'metrics' },
  { text: 'How do you aquire customers?', category: 'metrics' },
  { text: 'How does your funnel look like?', category: 'metrics' },
  {
    text: "How's your brand part of your overall strategy?",
    category: 'metrics',
  },
  { text: 'When are you planning to expand abroad?', category: 'metrics' },
  { text: 'Where do you plan to open next?', category: 'metrics' },
  { text: "What's your CAC?", category: 'metrics' },
  { text: "What's your LTV?", category: 'metrics' },
  { text: "What's your TAM?", category: 'metrics' },
  { text: "What's your CPL?", category: 'metrics' },
  { text: "What's your CPC?", category: 'metrics' },
  { text: "What's your ARR?", category: 'metrics' },
  { text: 'Revenues in years: 1,2,3,4 and 5?', category: 'metrics' },
  { text: 'EBITDA in year 5?', category: 'metrics' },
  { text: 'Multilples in your vertical?', category: 'metrics' },
  { text: 'What are your unit economics?', category: 'metrics' },
  { text: "What's your traction to date?", category: 'metrics' },
  { text: "What's your marketing spend?", category: 'metrics' },
  { text: 'What are your DAUs?', category: 'metrics' },
  { text: 'What are your MAUs?', category: 'metrics' },
  { text: "What's your churn rate?", category: 'metrics' },
  { text: "What's your retention rate?", category: 'metrics' },
  { text: "What's your conversion rate?", category: 'metrics' },
  { text: "What's your ARPU?", category: 'metrics' },
  { text: "What's your margin on each sale?", category: 'metrics' },
  { text: "What's your NPS score?", category: 'metrics' },
  { text: 'How much do you make out of every sale?', category: 'metrics' },
  { text: 'When do you expect to break even?', category: 'metrics' },
  { text: "What's your background?", category: 'metrics' },
  { text: "Who's your CTO?", category: 'team' },
  { text: "Who's your co-founder?", category: 'team' },
  { text: "Who's your marketing guy?", category: 'team' },
  { text: "Who's your sales guy?", category: 'team' },
  { text: 'Who is full time on your team?', category: 'team' },
  { text: "Who's got equity beside investors?", category: 'team' },
  { text: "Who's got options?", category: 'team' },
  { text: 'Why are you better than anyone else out there?', category: 'team' },
  { text: 'How many people work for you?', category: 'team' },
  { text: 'How did you come up with the idea?', category: 'team' },
  { text: 'How do you think about culture?', category: 'team' },
  {
    text: 'How much are you paying your staff, inc yourselves?',
    category: 'team',
  },
  { text: 'How much of the option pool have you got left?', category: 'team' },
  { text: 'How many people are in the team?', category: 'team' },
  { text: 'When did you come up with this idea?', category: 'team' },
  { text: 'When did you start the company?', category: 'team' },
  { text: 'Where are you offices?', category: 'team' },
  {
    text: 'Where is your headcount distributerd across departments?',
    category: 'team',
  },
].map((x, id) => ({
  ...x,
  id: id + 1,
}))

const sessions = [
  {
    id: 'aaaa',
    userId: 'aaaa',
    lines: [
      {
        answer: true,
        date_answered: new Date('03-01-2017').getTime(),
        question: questions[0],
      },
      {
        answer: false,
        date_answered: new Date('03-01-2017').getTime(),
        question: questions[1],
      },
      {
        answer: true,
        date_answered: new Date('04-01-2017').getTime(),
        question: questions[2],
      },
      {
        answer: null,
        date_answered: null,
        question: questions[4],
      },
      {
        answer: null,
        date_answered: null,
        question: questions[5],
      },
    ],
    date_created: new Date('03-01-2017'),
  },
]

const getAll = datastore => async entityName => {
  const query = datastore.createQuery(entityName)

  const [results] = await datastore.runQuery(query)

  return results
}

export const run = async () => {
  const datastore = await createDB()

  console.log('---flush')

  const entities = [].concat(
    ...(await Promise.all(
      ['question', 'session', 'line'].map(getAll(datastore))
    ))
  )

  await datastore.delete(entities.map(x => x[datastore.KEY]))

  console.log('---questions')

  await datastore.save(
    questions.map(o => ({
      key: datastore.key(['question', o.id]),
      data: o,
    }))
  )

  console.log('---session')

  await datastore.save(
    [].concat(
      ...sessions.map(session => [
        {
          key: datastore.key(['session', session.id]),
          data: { userId: session.userId, date_created: session.date_created },
        },
        ...session.lines.map((l, index) => ({
          key: datastore.key(['session', session.id, 'line', l.question.id]),
          data: {
            index,
            answer: l.answer,
            date_answered: l.date_answered,
          },
        })),
      ])
    )
  )
}
