import React from "react"
import { Link, graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"

import Layout from "../components/layout"
import SEO from "../components/seo"


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    // const { previous, next } = this.props.pageContext
    const disqusConfig = {
      "identifier": post.id,
      "title": post.frontmatter.title,
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article className="article">
          <header className="article-header">
            <h1 className="article-title">
              {post.frontmatter.emoji || "📝"}
              {" "}
              {post.frontmatter.title}
            </h1>
            <h2 className="article-byline">
              {"🗓 "}
              <time className="article-time">{post.frontmatter.date}</time>
              {"  👨‍💻 "}
              <Link to="/" className="article-author">
                Anson Kao
              </Link>
            </h2>
          </header>
        
          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/*}
          <ul className="article-pagination">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          */}

          <DiscussionEmbed shortname="ansonkao" config={disqusConfig} />

        </article>

      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        emoji
        description
      }
    }
  }
`
