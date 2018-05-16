import { h } from 'preact'
import styled, { css } from 'preact-emotion'
import { Linkedin as Linkedin_ } from '~/component/Icon/social/Linkedin'
import { Facebook as Facebook_ } from '~/component/Icon/social/Facebook'
import { Twitter as Twitter_ } from '~/component/Icon/social/Twitter'
import { APP_ORIGIN } from '~/config/'

const facebookUrl = ({ url }) =>
  `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

const linkedinUrl = ({ url, title, summary, source }) =>
  `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
    title
  )}&summary=${encodeURIComponent(summary)}&url=${encodeURIComponent(
    url
  )}&source=${encodeURIComponent(source)}`

const twitterUrl = ({ url, message }) =>
  `https://twitter.com/intent/tweet/?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(message)}`

const url = APP_ORIGIN
const title = 'PitchPerfect'
const message = 'Oh look! This is awesome'

export const SocialBar = () => (
  <Container>
    <A
      href={facebookUrl({ url })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Facebook"
    >
      <Facebook />
    </A>

    <A
      href={twitterUrl({ url, message })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Twitter"
    >
      <Twitter />
    </A>

    <A
      href={linkedinUrl({ url, source: url, title, summary: message })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Linkedin"
    >
      <Linkedin />
    </A>
  </Container>
)

const A = styled.a``

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ball = css`
  width: 50px;
  height: 50px;
  margin: 10px;
`

const Facebook = styled(Facebook_)`
  ${ball};
`
const Twitter = styled(Twitter_)`
  ${ball};
`
const Linkedin = styled(Linkedin_)`
  ${ball};
`
