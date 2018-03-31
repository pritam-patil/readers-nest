import React, { Component, Fragment } from 'react';
import { number, string } from 'prop-types';

import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import './styles.css';

class ShareOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  onShareClick = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  getSharePostFooter = text => `${text}\n Shared via - http://readers-digest.surge.sh`;

  render() {
    const { title, url, numComments, ups } = this.props;
    const { isChecked } = this.state;

    return (
      <Fragment>
        <div className="box">
          <div>
            <img
              className="img"
              src="https://png.icons8.com/dusk/50/000000/facebook-like.png"
              alt="likes"
            />
            <span className="space">{`${ups}`}</span>
          </div>
          <div className="space">
            <img
              className="img"
              src="https://png.icons8.com/dusk/50/000000/quote.png"
              alt="comments"
            />
            <span> {`${numComments}`}</span>
          </div>
          {!isChecked && (
            <div className="push">
              <img
                className="img right-align"
                onClick={this.onShareClick}
                src="https://png.icons8.com/flat_round/50/000000/share.png"
                alt="Share"
              />
            </div>
          )}
          {isChecked && (
            <Fragment>
              <div className="push">
                <WhatsappShareButton
                  url={url}
                  title={this.getSharePostFooter(title)}
                  separator=" - "
                >
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </div>
              <div>
                <FacebookShareButton url={url} quote={this.getSharePostFooter(title)}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton url={url} via="http://readers-digest.surge.sh" title={title}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  url={url}
                  title={this.getSharePostFooter(title)}
                  windowWidth={750}
                  windowHeight={600}
                >
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>
              </div>
              <div>
                <EmailShareButton url={url} subject={title} body={this.getSharePostFooter(url)}>
                  <EmailIcon size={24} round />
                </EmailShareButton>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

ShareOptions.propTypes = {
  title: string.isRequired,
  url: string.isRequired,
  ups: number.isRequired,
  numComments: number.isRequired,
};

export default ShareOptions;
