import React, { useReducer } from 'react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { SEO } from 'components'
import { BlogPostPreview } from 'components/blog'
import { TagSelector } from 'components/tags'

export default function({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return {
          selectedTags: [...state.selectedTags, action.payload],
        }
      case 'remove':
        const index = state.selectedTags.indexOf(action.payload)
        return {
          selectedTags: [
            ...state.selectedTags.slice(0, index),
            ...state.selectedTags.slice(index + 1),
          ],
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, { selectedTags: [] })
  const { selectedTags } = state

  const tags = posts.reduce((tags, post) => {
    if (filterBySelectedTags(post)) {
      return (tags = [...tags, ...post.node.frontmatter.tags])
    }
    return tags
  }, [])

  function filterBySelectedTags(post) {
    const { tags } = post.node.frontmatter
    const { selectedTags } = state
    if (!selectedTags.length) return true
    if (selectedTags.filter(selected => !tags.includes(selected)).length)
      return false

    return true
  }

  return (
    <Layout animateHeader>
      <SEO
        title="Hello Code"
        keywords={[
          `JavaScript`,
          `web`,
          `development`,
          `frontend`,
          `linux`,
          `networking`,
          `programming`,
        ]}
      />
      <TagSelector {...{ tags, selectedTags, dispatch }} />
      <div>
        {posts
          .filter(filterBySelectedTags)
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <BlogPostPreview key={post.id} post={post} />
          ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }
`
