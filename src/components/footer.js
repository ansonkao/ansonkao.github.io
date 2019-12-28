import React from "react"

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        © {new Date().getFullYear()} Anson Kao. Built with{` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        <br/>
        <div className="footer-bottom">Last updated Dec 28th, 2019</div>
      </footer>
    )
  }
}

export default Footer