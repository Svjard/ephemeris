import * as React from 'react'
import styled from '@emotion/styled'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

function IndexPage() {
  return (
    <Page>
      <Container>
        <PageContent>

        </PageContent>
      </Container>
    </Page>
  )
}

export default IndexPage

const PageContent = styled('article')`
  margin: 0 auto;
  line-height: 1.6;
`
