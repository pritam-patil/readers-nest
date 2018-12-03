import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';
import blankshield from 'blankshield';
import ShareOptions from './shareOptions/';
import './styles.css';

const NAVBAR_HEIGHT = 65;
const isImageUrl = url =>
  !!url && (url.includes('.jpeg') || url.includes('.png') || url.includes('.jpg'));

const isVideoURL = url => !!url && (url.includes('youtube.com') || url.includes('youtu.be'));

const getEmbedURL = url => {
  if (!!url && url.includes('youtube.com')) {
    const vid = url.split('v=');
    return `https://www.youtube.com/embed/${vid[1]}`;
  }

  if (!!url && url.includes('youtu.be')) {
    const vid = url.split('/');
    const fid = vid[vid.length - 1].split('?')[0];
    return `https://www.youtube.com/embed/${fid}`;
  }
  return url;
};

const getSupportedImageSize = image_arr => {
  const images = image_arr && image_arr.images && image_arr.images[0];
  const resolutions = images.resolutions;
  let width;
  let deviceWidth, deviceHeight;

  resolutions.map(data => {
    width = data.width;

    if (width === 320) {
      deviceHeight =
        data.height < 300 ? data.height + 2 * NAVBAR_HEIGHT : data.height - 2 * NAVBAR_HEIGHT;
      deviceWidth = width;
    }
  });

  return [deviceWidth, deviceHeight];
};

const ImageItem = props => {
  const { alt, preview, source } = props;
  const details = getSupportedImageSize(preview);
  const [width, height] = details;
  console.log(`>> function returned ${width} ${height} ${source}`);

  return (
    <img style={{ width: width, height: height }} className="image-view" src={source} alt={alt} />
  );
};

export const PostItem = ({
  thumbnail,
  thumb_width,
  thumb_height,
  preview,
  details,
  title,
  ups,
  numComments,
  url,
  clickHandler,
}) => {
  if (isImageUrl(url)) {
    console.log(`>> function returned ${url}`);
  }

  return (
    <div className="post">
      <p className="post-title" onClick={() => clickHandler(url)}>
        {' '}
        {unescape(title)}{' '}
      </p>
      {isImageUrl(url) && <ImageItem preview={preview} source={url} alt={title} />}
      {false && isImageUrl(url) && <img className="image-view" src={url} alt={title} />}
      {isVideoURL(url) && <iframe width="100%" height="100%" src={getEmbedURL(url)} />}
      {details && <p className="post-desc"> {details} </p>}
      {!details && !isImageUrl(url) && (
        <img styles={{ height: thumb_height, width: thumb_width }} src={thumbnail} />
      )}
      {false && (
        <ShareOptions
          {...{
            title,
            url,
            numComments,
            ups,
          }}
        />
      )}
    </div>
  );
};

PostItem.propProps = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  numComments: PropTypes.string.isRequired,
  ups: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
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

  // eslint-disable-next-line
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
