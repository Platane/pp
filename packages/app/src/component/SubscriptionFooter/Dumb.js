import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Mail } from '~/component/Icon/Mail'

export const SubscriptionFooter = ({ path, ...props }) => (
  <Container>
    <Center>
      <Link href={path} query={{ subscribe: true }}>
        <A>
          <MailIcon color={white} />
          Get the complete checklist in your inbox
        </A>
      </Link>
    </Center>
  </Container>
)

const Container = styled.footer`
  position: relative;
  margin-bottom: 64px;
`
const Center = styled.div`
  margin: 0 auto;
`
const MailIcon = styled(Mail)`
  width: 20px;
  height: 20px;
  margin-right: 16px;
`

const A = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;

  color: ${white};

  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
  }
`
