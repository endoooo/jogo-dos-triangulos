// NPM imports
import React from 'react'
import styled from '@emotion/styled'

// Project imports
import Layout from '../components/Layout'
import ShapeList from '../components/ShapeList'

// Styled

const Content = styled.div`
  max-width: 640px;
  margin: 0 auto;
`

// Component

export default function Home() {
  return (
    <Layout>
      <Content>
        <p>Hello world! asfsefas sfjlekjfljlkfeas</p>
        <ShapeList />
      </Content>
    </Layout>
  )
}
