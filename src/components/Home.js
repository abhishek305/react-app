import React, { Component } from 'react'
import Typed from 'react-typed';
import Footer from './Footer'
import $ from "jquery";
import './css/style.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { getData } from './Helper'



class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      home: "",

    }
  }

  componentDidMount() {

    getData(process.env.REACT_APP_URL_HOME)
      .then((data) => {
        // console.log(data);
        this.setState({
          home: data
        }, () => {
          console.log(this.state.home)

        })
      }).catch((err) => {
        console.log(err);
      })

    var $header = $('.header-animated');
    var $headers = $('.header-animated opaque');
    var $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
    var $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $(".header").css("display", "block")

    if (window.location.pathname != "/features" && window.location.pathname != "/about") {
      $header.removeClass('opaque');
      $header.find('.logo > img').attr('src', $logoAlt);
    }

    $(window).on('scroll', function () {
      if (window.location.pathname != "/features" && window.location.pathname != "/about" && window.location.pathname != "/blog" && window.location.pathname != "/blog/first-blog" && window.location.pathname != "/blog/second-blog" && window.location.pathname != "/blog/third-blog" && window.location.pathname != "/blog/fourth-blog") {
        console.log('true');
        if ($(window).scrollTop() > 100) {
          $header.fadeIn().addClass('opaque');
          $header.find('.logo > img').attr('src', $logoDefault);

        } else {
          $header.removeClass('opaque');
          $header.find('.logo > img').attr('src', $logoAlt);
        }
      }
    });

  }



  render() {
    if (this.state.home !== "") {

      document.title = this.state.home.data.entry.title

      const html = this.state.home.data.entry.hero_banner.description;

      return (
        <>
          <section>
            <div className="wrapper">
              <div className="home-hero-bg hero-bg" id="home">
                <div className="background-overlay"></div>
                <div className="aligned-container typed-container">
                  <div className="container">
                    <div className="typing-block">
                      <div className="typing-block">
                        {this.state.home.data.entry.hero_banner.title} <span> <Typed strings={[`${this.state.home.data.entry.hero_banner.rolling_text[0]}`]} typeSpeed={50} />  </span>
                      </div>
                    </div>
                    {ReactHtmlParser(html)}
                    <a href="#" className="btn btn-primary mrm">{this.state.home.data.entry.hero_banner.cta[0].title}</a>
                    <a href="#" className="underline-text">{this.state.home.data.entry.hero_banner.cta[1].title}<i className="fa fa-angle-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="main-container">
              </div>
            </div>
            {/* <!-- Video --> */}
            <div className="modal videoModal fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="embed-responsive embed-responsive-16by9" id="yt-player">

                      <img className="img-responsive" src="img/hero-bg.jpg" />
                      <iframe className="embed-responsive-item" src="http://player.vimeo.com/video/27408483?title=0&byline=0&portrait=0&color=ffffff"></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>

      );
    }
    else if (this.state.home === "") {
      return (
        null
      )
    }
  }
}

export default Home
