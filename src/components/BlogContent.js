import React, { Component } from 'react'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import $ from 'jquery';
import "./css/style.css";
import Footer from '../components/Footer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './css/blogsection.css'
import BlogFooter from './Blogfooter'


class BlogContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      urlState: this.props.match.url
    }
    console.log(this.state.urlState)
  }



  componentDidMount() {

    var $header = $('.header-animated');
    var $headers = $('.header-animated opaque');
    var $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
    var $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
    $(".header").css("display", "block")
    if(window.location.pathname == `${this.state.urlState}`) {
      $header.addClass('opaque');
      $header.find('.logo > img').attr('src', $logoDefault);

    }
    if (window.location.pathname == `${this.state.urlState}`) {
      $(".header").addClass("opaque");
      $header.find('.logo > img').attr('src', $logoDefault);
    }
  }

  render() {

    console.log(this.props);

    let blog_des = this.props.location.state.blog_content
    document.title = this.props.location.state.blog_title
    return (
      <>
        <section class="team-wrap" id="blog_container">
          <div class="container">
            <div class="row" style={{ "margin-bottom": "33px" }}>
              <div class="col-md-4 margin-top-50 margin-bottom" id="blog_section">
                <h2 class="color"><span>{this.props.location.state.blog_title}</span></h2>
                <hr></hr>
                <p>{this.props.location.state.blog_content}</p>
                <Link to={"/blog"}>Return back...</Link>
              </div>
              <div class="col-md-8" id="post_img">
                <img class="img-responsive" id="center" src={this.props.location.state.media.url} alt="" />
              </div>
            </div>
          </div>
        </section>
        <div className="card">
          <BlogFooter />
        </div>
        <Footer />
      </>
    )
  }
}

export default BlogContent