import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import PersonalLinks from './personal-links'
import { css } from '@emotion/core'

const Header = ({ Title }) => {
  const wrapper = css`
    background: ${theme => theme.primaryColor};
    margin-bottom: 1.45rem;
    position: relative;
  `
  const titleWrapper = css`
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
  `
  const personalLinks = css`
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 25px;

    ${theme => theme.smallScreen} {
      right: 0;
      a {
        font-size: 20px;
      }
    }
  `
  const title = css`
    margin: 0;
    a {
      color: ${theme => theme.secondaryColor};
      text-decoration: none;
      &:hover {
        color: ${theme => theme.secondaryColor};
      }
      ${theme => theme.smallScreen} {
        font-size: 24px;
      }
    }
  `
  return (
    <div css={wrapper}>
      <PersonalLinks css={personalLinks} />
      <div css={titleWrapper}>
        <Title className={title} />
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
