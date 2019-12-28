import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <article className="article">
          <header className="article-header">
            <h1 className="article-title"><span role="img" aria-label="icon">📚</span> All Posts</h1>
          </header>

          <div className="article-list">

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3 className="article-preview-title-link">
                    <span role="img" aria-label="icon" style={{ "textDecoration": "none" }}>{node.frontmatter.emoji || "📝"} </span>
                    <Link to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <time className="article-time">{node.frontmatter.date}</time>
                  <Link to={node.fields.slug} style={{ "textDecoration": "none" }}>
                    <p
                      className="article-preview-content"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </Link>
                </div>
              )
            })}

          </div>
        </article>

      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            emoji
            description
          }
        }
      }
    }
  }
`
