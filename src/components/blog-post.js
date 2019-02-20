import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from './layout'
import ShareButtons from './share-buttons'
import BlogInfo from './blog-info'
import { css } from 'emotion'

export default function Template({ data }) {
  const post = data.markdownRemark

  function Title() {
    const wrapper = css`
      margin-bottom: 30px;
    `

    return (
      <div className={wrapper}>
        <BlogInfo post={post}>
          <h1>{post.frontmatter.title}</h1>
        </BlogInfo>
      </div>
    )
  }

  return (
    <Layout>
      <Helmet title={`HelloCode - ${post.frontmatter.title}`} />
      <Title />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ShareButtons
        shareUrl={window.location.href}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tag
      }
    }
  }
`
