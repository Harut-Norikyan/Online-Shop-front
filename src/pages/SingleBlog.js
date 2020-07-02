import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';
import {getSinglePostRequest} from "../store/actions/posts";
import {connect} from "react-redux";
import Utils from "../helpers/Utils";

class SingleBlog extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getSinglePostRequest(id)
  }

  render() {
    let{postsById} =this.props
    return (
      <Wrapper>
          <div className="single-blog-wrapper">
            <div className="single-blog-post-thumb singleBlogBlock">
              {postsById?<img className="imgSingleBlog" src={Utils.fileUrl(postsById.images)} alt="" /> :null}

            </div>
            <div className="single-blog-content-wrapper d-flex">
              <div className="single-blog--text">
                <h2>
                  {postsById?postsById.title:null}
                </h2>
                <p>
                  {postsById?postsById.content:null}
                </p>

              </div>

            </div>
          </div>


      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  postsById: state.posts.postData.post,

});

const mapDispatchToProps = {
  getSinglePostRequest
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleBlog);

export default Container;
