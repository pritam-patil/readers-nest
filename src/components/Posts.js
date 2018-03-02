import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) => <li key={i}>[{post.ups}|{post.num_comments}] <a target='_blank' href={post.url} key={post.url}> {unescape(post.title)}</a></li>)}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}