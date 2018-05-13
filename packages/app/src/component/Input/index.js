import styled, { css } from 'preact-emotion'
import { h } from 'preact'
import {
  vibrant,
  white,
  black,
  borderRadius,
  transitionUnit,
} from '~/component/_abstract/palette'

export const emailPattern =
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

export const Input = styled.input`
  height: 64px;
  width: 100%;
  padding: 16px 32px;
  text-align: center;
  font-size: 1.4em;
`
