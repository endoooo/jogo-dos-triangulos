import React from 'react'
import { Global, css } from '@emotion/core'
import 'fontsource-source-serif-pro'

const globalStyles = css`
  *,
  *::before,
  *::after {
    font-family: 'Source Serif Pro', serif;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
    margin: 0;
  }
`

export default function Layout({ children }) {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  )
}
