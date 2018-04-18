import { h } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import image_src from '~/asset/image/background3.jpg'

export const Wallpaper = () => <Container />

const fl = keyframes`
  ${Array.from({ length: 21 }).map((_, i, arr) => {
    const k = i / (arr.length - 1)

    const x =
      50 +
      20 * Math.cos(k * Math.PI * 2) +
      10 * Math.sin(k * Math.PI * 2 * 3) +
      20 * k * (1 - k) * (1 - k) * Math.sin(k * Math.PI * 2 * 3)

    const y =
      50 +
      25 * Math.sin(k * Math.PI * 2 + 123) +
      25 * Math.cos(k * k * Math.PI * 2 * 5 + 1223) +
      10 * Math.sin(k * k * (1 - k) * Math.PI * 3 + 23)

    const h = 360 * Math.sin(k * Math.PI * 2 + 123) + k * 360 + k * k + 360 * 3

    return `${Math.round(k * 100)}% {
      background-position: ${x}% ${y}%;
      filter: hue-rotate(${h}deg);
    }`
  })}
`

// const dataUrl =
//   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QKwRXhpZgAASUkqAAgAAAAKAAsAAgAKAAAAhgAAAAABCQABAAAACgAAAAEBCQABAAAACgAAABIBCQABAAAAAQAAABoBCQABAAAASAAAABsBCQABAAAASAAAACgBCQABAAAAAgAAADIBAgAUAAAAkAAAABMCCQABAAAAAQAAAGmHBAABAAAApAAAAPIAAABQaXggMS42LjIAMjAxODowNDoxNyAwOTozNToxOAAGAACQBwAEAAAAMDIyMQGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgCQABAAAAAQAAAAKgCQABAAAACgAAAAOgCQABAAAACgAAAAAAAAAGAAMBAwABAAAABgAAABoBCQABAAAASAAAABsBCQABAAAASAAAACgBCQABAAAAAgAAAAECBAABAAAAQAEAAAICBAABAAAAZwEAAAAAAAD/2P/gABBKRklGAAEBAAABAAEAAP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAAoACgMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAHAQX/xAAjEAAABAQHAQAAAAAAAAAAAAAAAQIDBAUREhMUIiMyUpFi/8QAFAEBAAAAAAAAAAAAAAAAAAAABv/EAB4RAAIBAwUAAAAAAAAAAAAAAAEDAgAEkQUHERMh/9oADAMBAAIRAxEAPwBchpJCKO1brNC+hFSCX3Huseg9ZiH87THd5dzG6Ti6FrV6DTbJs5c9pxQpu8OqR9Chk1//2QD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwEF/8QAIxAAAAQEBwEAAAAAAAAAAAAAAAECAwQFERITFCIjMlKRYv/EABQBAQAAAAAAAAAAAAAAAAAAAAb/xAAeEQACAQMFAAAAAAAAAAAAAAABAwIABJEFBxETIf/aAAwDAQACEQMRAD8AXIaSQijtW6zQvoRUgl9x7rHoPWYh/O0x3eXcxuk4uha1eg02ybOXPacUKbvDqkfQoZNf/9k='

const Container = styled.div`
  transition: background-color 280ms ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #9abdff;
  background-image: url(${image_src});
  background-size: 250% 250%;
  animation: ${fl} 100s linear infinite;
`
