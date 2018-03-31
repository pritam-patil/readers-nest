import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';
import blankshield from 'blankshield';
import './styles.css';

// TODO: Make prop validations, eslint (though disabled for now) is giving error

/* eslint-disable */
const Activity = ({ ups, numComments }) => (
  <table className="activity-body">
    <tbody>
      <tr>
        <td>
          <img className="img" src="https://png.icons8.com/dusk/50/000000/facebook-like.png" />
          <span>{` ${ups} `}</span>
        </td>
        <td>
          <img className="img" src="https://png.icons8.com/dusk/50/000000/quote.png" />
          <span> {` ${numComments} `}</span>
        </td>
      </tr>
    </tbody>
  </table>
);

Activity.propTypes = {
  ups: PropTypes.number.isRequired,
  numComments: PropTypes.number.isRequired,
};

const isImageUrl = url =>
  !!url && (url.includes('.jpeg') || url.includes('.png') || url.includes('.jpg'));

const PostItem = ({ title, desc, ups, numComments, url, clickHandler }) => (
  <div className="post" onClick={() => clickHandler(url)}>
    <p className="post-title"> {unescape(title)} </p>
    {isImageUrl(url) && (
      <img onClick={() => <Dialog url={url} />} className="post-image" src={url} alt={title} />
    )}
    {desc && <p className="post-desc"> {desc} </p>}
    <Activity numComments={numComments} ups={ups} />
  </div>
);

PostItem.propProps = {
  title: PropTypes.string,
  desc: PropTypes.string,
  numComments: PropTypes.string,
  ups: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

/* eslint-enable */

export default class Posts extends Component {
  getDescription = selftext => {
    if (!selftext) {
      return false;
    }
    return selftext;
    // return `${selftext.slice(0, 100)} ...`;
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
      <div className="container">
        {orderedPosts.map((post, index) => (
          <PostItem
            // eslint-disable-next-line
            key={index}
            title={post.title}
            desc={this.getDescription(post.selftext)}
            ups={post.ups}
            numComments={post.num_comments}
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
