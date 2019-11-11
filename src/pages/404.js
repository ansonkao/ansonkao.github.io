import React from "react"
import { Link, graphql } from "gatsby"

import "./404.less";
import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Page Not Found" />
        <article className="article article-404">
          <header className="article-header">
            <h1 className="article-title">
              <span role="img" aria-label="ERROR">⛔️</span> Page Not Found
            </h1>
            <p>Don't give up! The paths that don't lead anywhere are the ones that guide us to the paths we seek.</p>
            <p>
              <Link to="/" className="article-404-nav-links">
                <span role="img" aria-label="icon">🏠</span> Home
              </Link>
              &middot;
              <Link to="/blog" className="article-404-nav-links">
                <span role="img" aria-label="icons Volumes">📚</span> Blog
              </Link>
            </p>
          </header>
        </article>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
