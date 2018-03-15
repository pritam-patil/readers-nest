import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';
import blankshield from 'blankshield';
import './posts.css';

const Activity = ({ ups, num_comments }) => (
	<table className="activity-body">
		<tbody>
			<tr>
				<td>  { ups }&#8679; </td>
				<td>  {num_comments} replies </td>
			</tr>
		</tbody>
	</table>
);

const PostItem = ({ title, desc, ups, num_comments, url, clickHandler }) => (
	<div className="post">
		<p className="post-title" onClick={() => clickHandler(url)}> {unescape(title)} </p>
		{desc && <p className="post-desc"> { desc } </p> }
		<Activity num_comments={num_comments} ups={ups} />
	</div>
);

PostItem.propProps = {
	title: PropTypes.string,
	desc: PropTypes.string,
	num_comments: PropTypes.string,
	ups: PropTypes.string,
	onClick: PropTypes.func.isRequired
};

export default class Posts extends Component {

  handleClick = url => blankshield.open(url, '_blank');

  getDescription = selftext => {
	if (!selftext) {
		return false;
	}

	return `${selftext.slice(0, 100)} ...`;
  };

  orderPosts = posts =>
	   posts.sort((a, b) => {
		    const { ups:upsA, num_comments: commentsA } = a;
		    const { ups:upsB, num_comments: commentsB } = b;

		    if((upsA + commentsA) > (upsB + commentsB)) return -1;
		    if((upsA + commentsA) < (upsB + commentsB)) return 1;
		    return 0;
		});

  render() {
    const { posts } = this.props;
    const orderedPosts = this.orderPosts(posts);

    return (
      <div>
		{ orderedPosts.map(post => (
			<PostItem
				title={post.title}
				desc={this.getDescription(post.selftext)}
				ups={post.ups}
				num_comments={post.num_comments}
				url={post.url}
				clickHandler={this.handleClick}
			/>
			))
		}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
