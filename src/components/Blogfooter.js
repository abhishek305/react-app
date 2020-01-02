import React, { Component } from 'react'
import "./css/style.css";
import "./css/blog.css";
import { getData } from './Helper'




class Blogfooter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            image: ""
        }
    }

    componentDidMount() {
        getData(process.env.REACT_APP_URL_BLOG_IMAGE)
            .then((data) => {
                this.setState({
                    image: data
                }, () => { console.log(this.state.image) })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        if (this.state.image !== "") {
            return (
                <div>

                    <h3>{this.state.image.data.entry.blog_footer_section}</h3>
                    <p>{this.state.image.data.entry.blog_footer_description}</p>

                </div>
            )
        } else {
            return null
        }

    }
}

export default Blogfooter
