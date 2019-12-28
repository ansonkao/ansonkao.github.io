import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"

import Footer from "../components/footer"
import SEO from "../components/seo"
import AnsonPic from "../../content/assets/ansonkao.png"
import "./index.less"

class Home extends React.Component {
  render() {
    const siteTitle = "Anson Kao - Entrepreneur, Engineer, Creator";

    return (
      <div className="global-ansonkao global-ansonkao-home">
        <Helmet>
          <link href="https://fonts.googleapis.com/css?family=Fira+Sans:300,600" rel="stylesheet" />
        </Helmet>
        <main className="main">
          <SEO
            title={siteTitle}
            keywords={[
                "blog",
                "Anson",
                "Anson Kao",
                "film",
                "video",
                "production",
                "vfx",
                "music",
                "technology",
                "javascript",
                "react",
                "startups",
                "entrepreneurship",
                "business",
                "life",
                "philosophy",
            ]}
          />

          <header className="header">
            <img src={AnsonPic} alt="Anson Kao" />
            <h1>Anson Kao</h1>
            <h2>Entrepreneur, Engineer, Creator</h2>
            <h3><span role="img" aria-label="Location">📍</span> Toronto, Canada <span role="img" aria-label="Canada">🇨🇦</span></h3>
          </header>
          <section className="section">
            <p>
              <strong>Hi! My name is Anson, and I'm based out of Toronto.</strong>&nbsp;
              I'm an entrepreneur with a decade-long background in technology, startups,
              and more recently: film. I love bringing people together to
              create the future.
            </p>

            <h1>
              <span role="img" aria-label="icon">💻</span> Technology
            </h1>
            <p>
              Today, I'm a seasoned internet startup and software engineering veteran.
              I have started several ventures of my own and joined many others,
              in one instance helping scale technology to 3 million users.
              I can run small teams, advise on strategy/architecture,
              and write ReactJS code at a level few others in Toronto can.
              Some startups hire me for these reasons on a contract basis,
              and you can too (<a href="#connect">connect with me</a>).
              I studied Mechatronics Engineering at the University of Waterloo, and
              I feel very at home in a machine shop, at the drawing board, at the computer,
              as well as on the phone.
            </p>
            <h1>
              <span role="img" aria-label="icon">🎥</span> Film
            </h1>
            <p>
              While I've always been good at technology,
              I find that my highest calling is not technology itself,
              but in using technology to capture people's imaginations.
              Towards that end, what could be better medium than film?
              &nbsp;<strong>I believe film is the ultimate art form.</strong>
            </p>
            <p>
              Over the past 18 months, I have indulged in a selection of creative film projects.
              Exploring the production of live action short films has been very fulfilling
              creatively, and very exciting from an entrepreneurship standpoint.
              I am searching for overlooked opportunities to build the future in this space.
              If the same is true for you, we should connect.
            </p>
            {/*             
            <p>
              &nbsp;<strong>Film is the ultimate form of creative expression</strong>, in my opinion.
              It combines all other art forms, e.g. photography, acting,
              musical composition and performance, poetry, dance, fashion, etc.
              It is fully immersive - the director takes you into their world and you get lost in it.
              Film has the ability to capture the imagination of the masses and inspire a generation.
              I find myself hard-pressed to find a higher calling than this. 
            </p>
            <h2>
              <span role="img" aria-label="icon">🤖</span> Terminator 2: Judgement Day
            </h2>
            <p>
              Ah... the movie that started it all for me.
            </p>
            <h1>
              <span role="img" aria-label="icon">💻</span> Music
            </h1>
            <p>
              ...
            </p>
            */}
          </section>
          <a name="connect" />
          <section className="section">
            <h4>Connect with me:</h4>
            <ul className="social-links">
              <li>
                <Link to="/blog" title="Read my blog">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.994 9.095l2.974-2.884c.144-.14.331-.211.516-.211.188 0 .375.073.518.22l-4.032 3.911c-.283-.294-.268-.752.024-1.036zm-4.49 8.819c-.06.057-.136.086-.212.086-.168 0-.304-.137-.304-.304 0-.079.031-.159.093-.218l.5-.485.422.436-.499.485zm4.034-2.386c-.919.891-1.796 1.333-3.013 1.728l-.754-.779c.433-1.205.901-2.067 1.819-2.958l1.71-1.657 1.946 2.009-1.708 1.657zm6.965-6.483l-4.402 4.269-2.218-2.29 4.402-4.27c1.016-.984 2.703-.246 2.703 1.146 0 .416-.162.832-.485 1.145z"/>
                  </svg>
                </Link>
              </li>
              <li>
                <a title="Follow me on Twitter" href="https://twitter.com/anson_kao">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                    <path d="M1000 500c0 277-223 500-500 500S0 777 0 500 223 0 500 0s500 223 500 500zM875 317c-25 11-53 18-82 22 30-17 51-45 61-79-28 17-57 28-89 35-25-28-62-45-103-45-78 0-141 63-141 142 0 10 1 22 3 32-118-5-223-62-294-149-11 22-18 46-18 72 0 50 24 93 62 118-23 0-45-7-64-18v2c0 69 49 126 114 140-12 3-24 4-37 4-9 0-19-1-27-2 18 57 71 95 132 96-48 38-108 65-176 65-11 0-23-1-33-2 62 40 138 62 217 62 262 0 404-216 404-404v-18c28-19 51-45 71-73z" />
                  </svg>
                </a>
              </li>
              <li>
                <a title="Visit me on LinkedIn" href="https://www.linkedin.com/in/ansonkao/">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                    <path d="M1000 500c0 277-223 500-500 500S0 777 0 500 223 0 500 0s500 223 500 500zM375 260c-1-41-32-73-83-73-50 0-83 32-83 73s32 73 82 73h1c51 0 83-32 83-73zm-21 136H229v354h125V396zm458 166c0-114-56-187-146-187-50 0-87 30-104 75l-4-54H434c1 13 3 83 3 83v271h125V562c0-50 23-83 62-83 38 0 63 20 63 83v188h125V562z" />
                  </svg>
                </a>
              </li>
              <li>
                <a title="Read my blog at Medium" href="https://medium.com/@anson_kao">
                  <svg className="social-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm6.974 17.557v-.235l-1.092-1.072c-.096-.073-.144-.194-.124-.313v-7.874c-.02-.119.028-.24.124-.313l1.118-1.072v-.235h-3.869l-2.758 6.88-3.138-6.88h-4.059v.235l1.308 1.575c.128.115.194.285.176.457v6.188c.038.223-.032.451-.189.614l-1.471 1.784v.235h4.17v-.235l-1.471-1.784c-.158-.163-.233-.389-.202-.614v-5.352l3.66 7.985h.425l3.143-7.985v6.365c0 .17 0 .202-.111.313l-1.13 1.098v.235h5.49z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a title="Collaborate with me on GitHub" href="https://github.com/ansonkao">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a title="Listen to me on Soundcloud" href="https://soundcloud.com/anson_kao">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6.417 14.583c-.354-.318-.583-.79-.583-1.323 0-.532.229-1.003.583-1.323v2.646zm1.167.417c-.212 0-.323.003-.583-.08v-3.318c.276-.088.407-.085.583-.071v3.469zm1.167 0h-.584v-3.305l.18.105c.08-.328.222-.628.404-.895v4.095zm1.166 0h-.583v-4.706c.18-.134.373-.25.583-.33v5.036zm1.167 0h-.583v-5.167c.22-.023.286-.04.583.005v5.162zm1.167 0h-.584v-4.987l.222.107c.104-.181.228-.346.362-.5v5.38zm5.885 0h-5.302v-5.904c.465-.32 1.016-.512 1.611-.512 1.583 0 2.866 1.307 2.984 2.962 1.14-.558 2.405.34 2.405 1.642 0 1-.761 1.812-1.698 1.812z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a title="Learn with me on StackOverflow" href="https://stackoverflow.com/users/476426/anson-kao">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.869 5.903l3.114 4.567-.975.665-3.115-4.567.976-.665zm-2.812 2.585l4.84 2.838-.6 1.017-4.842-2.838.602-1.017zm-1.276 2.724l5.413 1.521-.291 1.077-5.428-1.458.306-1.14zm-.588 2.461l5.687.569-.103 1.12-5.691-.513.107-1.176zm-.169 2.16h5.835v1.167h-5.835v-1.167zm7.976 3.167h-10v-6h1v5h8v-5h1v6zm.195-8.602l-.945-5.446 1.162-.202.947 5.446-1.164.202z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </section>
          <hr/>
          {/*
          <section className="section">
            <h2>#coolstuff</h2>
            <ul className="cool-stuff-links">
              <li>
                <a href="/piano-js">Phrase.fm</a> - my second startup circa 2016, a web-based
                    digital audio workstation (now defunct)! I'll put up a full working demo of the
                    product when I have a chance. In the meantime, the link points to a super early prototype from
                    some music-hack events which eventually lead to the founding of Phrase.
              </li>
              <li>
                <a href="/gripscroll">GripScroll.js</a> - my first open-source javascript
                library, a custom scrollbar! Vanilla JS, before I discovered JS frameworks in 2014.
                Never promoted it.
              </li>
              <li>
                <a href="/studymonkey.ca">StudyMonkey.ca</a> - my first startup circa 2010,
                    a note-sharing marketplace for college students! The site is defunct now,
                    but I've kept some static relics from the branding for old-times sake.
                    Really proud of the branding and our mascot, Spunkey the Monkey!
              </li>
            </ul>
          </section>
          <hr/>
          */}
          <Footer />
        </main>
      </div>
    )
  }
}

export default Home