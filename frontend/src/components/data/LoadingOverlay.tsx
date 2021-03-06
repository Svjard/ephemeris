import { transparentize } from 'polished'
import styled from '@emotion/styled'

const LoadingOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${props => transparentize(0.25, '#fff')};
`

export default LoadingOverlay
