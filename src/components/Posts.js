import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';
import blankshield from 'blankshield';
import './posts.css';

// TODO: Make prop validations, eslint (though disabled for now) is giving error
// TODO: Make num_comments camelCase
/* eslint-disable */
const Activity = ({ ups, num_comments }) => (
  <table className="activity-body">
    <tbody>
      <tr>
        <td>
        <img style={{width: '10px'}} src="https://png.icons8.com/metro/50/000000/thumb-up.png"/>
         { `  ${ups}  `}  </td>
        <td>
          <img style={{width: '10px'}} src="https://png.icons8.com/metro/50/000000/quote.png"/>
          { `  ${num_comments}  `}
         </td>
      </tr>
    </tbody>
  </table>
);

Activity.propTypes = {
  ups: PropTypes.number.isRequired,
  num_comments: PropTypes.number.isRequired,
};

const PostItem = ({ title, desc, ups, num_comments, url, clickHandler }) => (
  <div className="post">
    <p className="post-title" onClick={() => clickHandler(url)}>
      {' '}
      {unescape(title)}{' '}
    </p>
    {desc && <p className="post-desc"> {desc} </p>}
    <Activity num_comments={num_comments} ups={ups} />
  </div>
);

PostItem.propProps = {
  title: PropTypes.string,
  desc: PropTypes.string,
  num_comments: PropTypes.string,
  ups: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

/* eslint-enable */

export default class Posts extends Component {
  getDescription = selftext => {
    if (!selftext) {
      return false;
    }
    return `${selftext.slice(0, 100)} ...`;
  };

  handleClick = url => blankshield.open(url, '_blank');

  orderPosts = posts =>
    posts.sort((a, b) => {
      const { ups: upsA, num_comments: commentsA } = a;
      const { ups: upsB, num_comments: commentsB } = b;

      if (upsA + commentsA > upsB + commentsB) return -1;
      if (upsA + commentsA < upsB + commentsB) return 1;
      return 0;
    });

  render() {
    const { posts } = this.props;
    const orderedPosts = this.orderPosts(posts);

    return (
      <div>
        {orderedPosts.map(post => (
          <PostItem
            title={post.title}
            desc={this.getDescription(post.selftext)}
            ups={post.ups}
            num_comments={post.num_comments}
            url={post.url}
            clickHandler={this.handleClick}
          />
        ))}
      </div>
    );
  }
}

// TODO: PropTypes.array is forbidden, change it and use arrayOf
Posts.propTypes = {
  // eslint-disable-next-line
  posts: PropTypes.array.isRequired,
};
