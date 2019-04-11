import React, { Component } from "react"
import SEO from "../../components/seo"
import $ from "jquery"

import "./studymonkey.less"
import arrow_a from "./images/arrow_a.png"
import arrow_b from "./images/arrow_b.png"
import logo_home from "./images/logo_home.png"
import courses_medium from "./images/courses_medium.png"
import professors_medium from "./images/professors_medium.png"
import search_large from "./images/search_large.png"
import loading from "./images/loading.gif"
import courses from "./images/courses.png"
import professors from "./images/professors.png"
import mascot from "./images/mascot.png"


class StudyMonkey extends Component {

  componentDidMount() {
    $(document).ready(function(){

      setTimeout(
        function(){
          new_speech_bubble( "Try me! Enter the name of your college or university in the search bar." );
        },
        8000
      );

      // School Search - AJAX
      $("form[name=school_search]").submit(function(){
          if ($("input[name=search]").val() !== "Type the name of your school..." && $.trim($("input[name=search]").val()) !== ""){
              $("#search_result").slideUp(100);
              $("#magnifying_glass").hide();
              $("#loading_gif").show();
              $.ajax({
                  type: "POST",
                  data: $(this).serialize(),
                  success: function( data ){
                      if( data.substring(0, 8) === "REDIRECT" ) {
                          window.location = "/" + data.substring(9) + "/courses";
                      } else {
                          $("#loading_gif").hide();
                          $("#magnifying_glass").show();
                          $("#search_result").html(data);
                          $("#search_result").slideDown();
                      }
                  }
              });
          }
          return false;
      })

      // Place holders for the search box
      $('input[name=search]').focus(function(){
          if ($(this).val() === "Type the name of your school...") {
              $(this).val("");
              $(this).css({"fontStyle":"normal", "color":"rgb(0,0,0)"});
          }
      }).blur(function(){
          if ($(this).val() === "") {
              $(this).val("Type the name of your school...");
              $(this).css({"fontStyle":"italic", "color":"rgb(119,136,119)"});
          }
      });

      // =========================== START MASCOT ==============================

      // Speech bubble flag
      var speech_bubble_open = true;

      function show_speech_bubble() {
          speech_bubble_open = true;
          $("#speech_bubble").stop().hide().css({opacity: 1}).fadeIn(500).fadeOut(12000);
      }

      function new_speech_bubble( message ) {
          $("#speech_bubble_text").html( message );
          show_speech_bubble();
      }

      $(document).ready(function(){

          // Hover to keep speech bubble alive
          $("#speech_bubble").mouseover(function(){
              if (speech_bubble_open)
                  $(this).stop().css({opacity: 1}).fadeOut(12000);
          });

          // Click to close the speech bubble
          $("#speech_bubble_close").click(function(){
              speech_bubble_open = false;
              $("#speech_bubble").stop().fadeOut(250);
              return false;
          });

          // Click on the mascot to get random messages
          var random_messages = [];
          random_messages[1] = "Hehehe stop clicking me - it tickles!";
          random_messages[2] = "Ow, stop poking me! That really hurt!";
          random_messages[3] = "Hello!  Wanna be friends?";
          random_messages[4] = "I'm so hungry! I could use a banana right now...";
          $("#mascot").click(function(){
              new_speech_bubble( random_messages[ Math.ceil( Math.random() * 4 ) ] );
          });

      });

    });
  }

  render() {
    return (
      <div className="studymonkey">
        <style dangerouslySetInnerHTML={{__html: `html,body { background: #FFF }`}} />
        <SEO
          title="Welcome to StudyMonkey!"
          keywords={[`studymonkey`]}
        />
        <div id="deprecation_notice" style={{zIndex: 200, position: 'fixed', top: '5px', right: '5px', padding: '10px', border: '1px solid #800', borderRadius: '4px', background: '#F88', color: '#800', boxShadow: '1px 2px 4px 0 #400'}}>
          StudyMonkey.ca is now defunct. 
          <br />
          This static page is hosted just as a legacy
          <br />
          reference, and the links don't work anymore. 
          <br />
          Cheers, <a href="/" style={{textDecoration: 'underline'}}>Anson</a>
        </div>
        <div id="content_wrapper">
          <div id="content">
            <div id="content_body_top">
              <img src={logo_home} alt="StudyMonkey.ca" />
              <table border={0} cellPadding={0} cellSpacing={0} style={{margin: '20px auto 0'}}>
                <tbody>
                  <tr>
                    <td valign="center">
                      <img src={courses_medium} alt="Course Reviews" />
                      &nbsp; &nbsp;
                    </td>
                    <td valign="center" align="left">
                      <h1 style={{margin: '0px'}}>Course Reviews</h1>
                    </td>
                    <td rowSpan={3} style={{width: '40px'}}>
                      &nbsp;
                    </td>
                    <td valign="center">
                      <img src={professors_medium} alt="Professor Ratings" />
                      &nbsp; &nbsp;
                    </td>
                    <td valign="center" align="left">
                      <h1 style={{margin: '0px'}}>Professor Ratings</h1>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td valign="top" align="left">
                      <p style={{fontSize: '14px'}}>
                        Picking courses for next semester?
                        <br />
                        Find out what others say are the
                        <br />
                        easiest and the best to take.
                      </p>
                    </td>
                    <td />
                    <td valign="top" align="left">
                      <p style={{fontSize: '14px'}}>
                        Who are the best (and worst)
                        <br />
                        professors at your school?
                        <br />
                        Get the inside scoop here!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" colSpan={2}>
                      <img src={arrow_a} alt="Arrow" />
                    </td>
                    <td align="center" colSpan={2}>
                      <img src={arrow_b} alt="Arrow" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="content_body_bottom">
            <form name="school_search" method="post">
              <table border={0} cellSpacing={10} cellPadding={0} style={{margin: '25px auto 0'}}>
                <tbody>
                  <tr>
                    <td valign="center">
                      <input id="search_box" className="placeholder huge" type="text" name="search" defaultValue="Type the name of your school..." />
                    </td>
                    <td valign="center">
                      <button className="huge" type="submit">
                        <img id="magnifying_glass" src={search_large} alt="Search" />
                        <img id="loading_gif" src={loading} alt="Search" style={{display: 'none'}} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <div style={{font: 'italic 12px arial', color: '#777', textAlign: 'center'}}>
              3,287 student opinions at 29 Canadian schools so far!
            </div>
            <div id="search_result">
            </div>
            <div style={{margin: '36px auto', width: '420px'}}>
              <table border={0} cellSpacing={0} cellPadding={0} style={{float: 'left', width: '200px'}}>
                <tbody>
                  <tr>
                    <td align="left" colSpan={2}>
                      <h2 style={{font: 'bold 14px arial', padding: '0 0 10px', margin: '0px', textAlign: 'left'}}>
                        Popular courses
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/psych101">
                        <img src={courses} style={{marginRight: '5px'}} alt="Course" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/psych101">
                        <strong>PSYCH101</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '45px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>77 reviews</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/econ101">
                        <img src={courses} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/econ101">
                        <strong>ECON101</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '42px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>47 reviews</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/afm101">
                        <img src={courses} style={{marginRight: '5px'}} alt="Course" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/afm101">
                        <strong>AFM101</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '41px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>33 reviews</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/chem120">
                        <img src={courses} style={{marginRight: '5px'}} alt="Course" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/chem120">
                        <strong>CHEM120</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '38px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>33 reviews</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/biol130">
                        <img src={courses} style={{marginRight: '5px'}} alt="Course" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/courses/biol130">
                        <strong>BIOL130</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '44px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>30 reviews</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border={0} cellSpacing={0} cellPadding={0} style={{float: 'left', marginLeft: '10px', width: '200px'}}>
                <tbody>
                  <tr>
                    <td align="left" colSpan={2}>
                      <h2 style={{font: 'bold 14px arial', padding: '0 0 10px', margin: '0px', textAlign: 'left'}}>
                        Popular professors
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/richard_ennis">
                        <img src={professors} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/richard_ennis">
                        <strong>Ennis, Richard</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '53px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>36 ratings</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/niels_bols">
                        <img src={professors} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/niels_bols">
                        <strong>Bols, Niels</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '51px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>26 ratings</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-toronto/professors/dax_urbszat">
                        <img src={professors} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-toronto/professors/dax_urbszat">
                        <strong>Urbszat, Dax</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Toronto</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '52px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>26 ratings</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/robert_sproule">
                        <img src={professors} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/robert_sproule">
                        <strong>Sproule, Robert</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '38px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>23 ratings</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" style={{width: '36px', height: '60px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/angela_trimarchi">
                        <img src={professors} style={{marginRight: '5px'}} alt="Professor" />
                      </a>
                    </td>
                    <td align="left" valign="top" style={{paddingTop: '5px'}}>
                      <a href="/studymonkey.ca/university-of-waterloo/professors/angela_trimarchi">
                        <strong>Trimarchi, Angela</strong>
                      </a>
                      <br />
                      <span style={{fontSize: '11px', color: '#888'}}>University of Waterloo</span>
                      <div className="transparent" style={{paddingTop: '2px'}}>
                        <div style={{marginRight: '5px', height: '12px', width: '60px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll top', textAlign: 'left', float: 'left'}}>
                          <div style={{height: '12px', width: '33px', background: 'transparent url(' + require("./images/star_rating_small.gif") + ') repeat-x scroll left bottom'}}>
                            &nbsp;
                          </div>
                        </div>
                        <div style={{float: 'left', font: 'normal 10px arial'}}>23 ratings</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="content_end" />
        </div>
        <div id="footer">
          <ul>
            <li><a href="/studymonkey.ca/terms">Terms</a> </li>
            <li><a href="/studymonkey.ca/privacy">Privacy</a> </li>
            <li><a href="/studymonkey.ca/contact">Contact</a> </li>
          </ul>
          <div style={{color: '#888', fontSize: '11px'}}>
            © 2011 StudyMonkey Inc.
          </div>
        </div>
        <div id="toolbar_wrapper">
          <div id="toolbar">
            <img id="mascot" src={mascot} alt="Spunkey the Monkey" />
            <div id="speech_bubble" className="round_box" style={{opacity: 1, display: 'none'}}>
              <a id="speech_bubble_close" href="/studymonkey.ca#">×</a>
              <span id="speech_bubble_text">Try me! Enter the name of your college or university in the search bar.</span>
              <div id="speech_bubble_tail" />
              <div id="speech_bubble_tail_border" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudyMonkey
