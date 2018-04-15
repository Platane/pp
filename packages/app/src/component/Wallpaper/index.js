import { h } from 'preact'
import styled from 'preact-emotion'
import { variant, trio, white } from '~/component/_abstract/palette'

export const Wallpaper = () => <Container />

const Container = styled.div`
  transition: background-color 280ms ease;
  background-color: #aaa;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`
