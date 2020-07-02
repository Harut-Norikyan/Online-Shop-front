import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import breadcumb2 from '../assets/img/bg-img/breadcumb2.jpg';
import Wrapper from '../components/Wrapper';
import {connect} from "react-redux";
import {getPostsRequest} from "../store/actions/posts";
import Utils from "../helpers/Utils";

class Blog extends Component {
  componentDidMount() {
    this.props.getPostsRequest();
  }

  render() {
    let {postsList} = this.props
    return (
      <Wrapper>

        <div
          className="breadcumb_area breadcumb-style-two bg-img"
          style={{ backgroundImage: `url(${breadcumb2})` }}
        >

          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="page-title text-center">
                  <h2>Fashion Blog</h2>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="blog-wrapper section-padding-80">
          <div className="container">
            <div className="row">

              {postsList?postsList.map(m=>
                <div key={m.id} className="col-12 col-lg-6">
                  <div  className="single-blog-area mb-50 blogBlock">
                    <img src={Utils.fileUrl(m.images)} alt="" />

                    <div className="post-title">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a>{m.title}</a>
                    </div>

                    <div className="hover-content">

                      <div className="hover-post-title">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a>{m.title}</a>
                      </div>
                      <p className="blogDesc">{m.content}</p>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link to={`single-blog/${m.id}`}>
                        Continue reading
                        <i className="fa fa-angle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ):null}

            </div>
          </div>
        </div>

      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  postsList: state.posts.postsData,

});

const mapDispatchToProps = {
  getPostsRequest,

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog);

export default Container;
