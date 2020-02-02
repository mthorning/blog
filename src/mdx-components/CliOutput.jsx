import React from 'react'
import { css } from '@emotion/core'

const style = css`
  display: block;
  overflow-x: auto;
  background: #f1f1f1;
  color: #6e6b5e;
  padding: 0.5em;
`
const errorStyle = css`
  outline: 0.5em solid #e8111294;
  padding: 0;
`
export default function CliOutput({ output, error }) {
  const styles = [style]
  if (error) styles.push(errorStyle)
  return <pre css={styles}>{output}</pre>
}
