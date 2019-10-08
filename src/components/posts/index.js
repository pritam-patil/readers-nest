import React, { Component } from 'react';
import { unescape } from 'lodash';
import PropTypes from 'prop-types';
import blankshield from 'blankshield';
import LazyLoad from 'react-lazyload';
import ShareOptions from './shareOptions/';
import './styles.css';

const NAVBAR_HEIGHT = 65;
const isImageUrl = url =>
  !!url && (url.includes('.jpeg') || url.includes('.png') || url.includes('.jpg'));

const isVideoURL = url => !!url && (url.includes('youtube.com') || url.includes('youtu.be'));

const getTimeDiff = start => {
  const mins = (Date.now() - start * 1000) / (1000 * 60);
  if (mins < 60) {
    return `Less than an hour ago`;
  }

  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    return `About ${hours} hours ago`;
  }

  return 'More than a day ago';
};

const PostInfo = props => (
  <div className="post-info">
    <img className="pi-img" src={props.thumb} alt={props.thumb} />
    <div className="view-details">
      <div className="pi-tile">
        <div className="author">
          <i class="fas fa-user-secret" />
          <span>{props.author} </span>
        </div>
        <div>
          <i class="far fa-calendar-alt" />
          <span>{getTimeDiff(props.created)}</span>
        </div>
      </div>
      <i
        class="fas fa-external-link-alt fa-2x"
        onClick={() => blankshield.open(props.url, '_blank')}
      />
    </div>
  </div>
);

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

    return true;
  });

  if (deviceHeight > 420) {
    deviceHeight = 420;
  }

  return [deviceWidth, deviceHeight];
};

const ImageItem = props => {
  const { alt, preview, source } = props;
  const details = getSupportedImageSize(preview);
  const [width, height] = details;

  return (
    <LazyLoad height={height} once placeholder={<div>Loading</div>}>
      <img style={{ width, height }} className="image-view" src={source} alt={alt} />
    </LazyLoad>
  );
};

const CustomLazyLoad = props => {
  const backgroundStyle = {
    backgroundImage: `url(${props.url})`,
  };
  return <div className={`${props.className}`} style={backgroundStyle} />;
};

// eslint-disable-next-line
const getMetaTags = postLink => {
  return fetch(`https://api.urlmeta.org?url=${postLink}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // eslint-disable-next-line
      const image = !!data.meta && (data.meta.favicon || data.meta.image);
      return !!data.meta && data.meta;
    });
};

export class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: null,
    };
  }

  componentDidMount() {
    fetch(`https://api.urlmeta.org?url=${this.props.url}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const image = !!data.meta && data.meta.favicon;
        console.log('title, meta', this.props.title, data.meta);
        this.setState({ meta: image });
      });
  }

  render() {
    const {
      thumbnail,
      // thumb_width,
      // thumb_height,
      preview,
      details,
      title,
      ups,
      numComments,
      url,
      clickHandler,
      author,
      created,
    } = this.props;

    const postIcon =
      this.state.meta ||
      'https://cdn3.iconfinder.com/data/icons/social-network-2/512/650856-reddit-512.png';

    return (
      <div className="post">
        {
          <div className={'thumb-title'}>
            <p className="post-title" onClick={() => clickHandler(url)}>
              {unescape(title)}
            </p>
          </div>
        }
        {true && isImageUrl(url) && <ImageItem preview={preview} source={url} alt={title} />}
        {false && isImageUrl(url) && <CustomLazyLoad className="movie-backdrop" url={url} />}
        {isVideoURL(url) && (
          <iframe title="Video content" width="100%" height="440px" src={getEmbedURL(url)} />
        )}

        {details && <p className="post-desc"> {unescape(details)} </p>}
        {false &&
          !details &&
          !isImageUrl(url) && (
            <img
              style={{
                height: '96px',
                width: '96px',
                borderRadius: '50px',
                border: '4px solid orangered',
              }}
              src={thumbnail}
              alt=""
            />
          )}
        {!isImageUrl(url) &&
          !isVideoURL(url) && (
            <PostInfo url={url} thumb={postIcon} author={author} created={created} />
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
  }
}

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
