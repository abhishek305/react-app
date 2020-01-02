import React, { Component } from 'react'
import "./css/style.css";
import "./css/blog.css";
import $ from 'jquery'
import { getData } from './Helper'
import Footer from './Footer'
import BlogFooter from './Blogfooter'

class Blog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            blogPage: "",
            image: ""
        }
    }


    componentDidMount() {

        getData(process.env.REACT_APP_URL_BLOG)
            .then((data) => {
                // console.log(data);
                this.setState({
                    blogPage: data
                }, () => {
                    console.log(this.state.blogPage)

                })

            }).catch((err) => {
                console.log(err);
            })

        getData(process.env.REACT_APP_URL_BLOG_IMAGE)
            .then((data) => {
                this.setState({
                    image: data
                }, () => { console.log(this.state.image) })
            }).catch((err) => {
                console.log(err);
            })




        var $header = $('.header-animated');
        var $headers = $('.header-animated opaque');
        var $logoAlt = $header.find('.logo > img').data('logo-alt'); // white logo
        var $logoDefault = $header.find('.logo > img').data('logo-default'); // black logo
        $(".header").css("display", "block")

        if (window.location.pathname == "/blog") {
            $(".header").addClass("opaque");
            $header.find('.logo > img').attr('src', $logoDefault);
           // console.log(window.location.pathname)
        }
        else {
            $(".header").removeClass("opaque")
        }

    }

    render() {


        if (this.state.blogPage !== "") {
            document.title = "Blog"
            return (
                <>
                    <section>
                        <div class="wrapper">

                            <div class="main-container">
                                <section class="team-wrap">
                                    <div class="container">
                                        <div class="row" style={{ "margin-top": "70px", "margin-bottom": "40px" }}>
                                            <div class="col-md-4 margin-top-33 margin-bottom">
                                                <h1 id="welcome_header">WELCOME TO BLOG PAGE</h1>
                                                <hr />
                                                < div >
                                                    {
                                                        this.state.blogPage.data.entries.map((value) => {
                                                            return (
                                                                <>
                                                                    <h1 style={{"cursor":"pointer"}} id="blog_title" onClick={() => this.props.history.push(`/blog/${value.url.split("/")[1]}`, value)}><span>{value.title}</span></h1>
                                                                    <p class="content_style">{value.blog_content}</p> <span style={{"cursor":"pointer"}} onClick={() => this.props.history.push(`/blog/${value.url.split("/")[1]}`, value)}>Read More...</span>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                            {this.state.image !== "" && <div class="col-md-8" id="blog_img">
                                                <img className="img-responsive" src={this.state.image.data.entry.file.url} alt="" />

                                            </div>}

                                        </div>
                                    </div>
                                </section>
                                <div class="card">
                                    <BlogFooter />
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </>

            )
        }
        else if (this.state.blogPage === "") {
            return (
                null
            )
        }
    }
}


export default Blog