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

const ICON_SIZE = 40;
class ShareOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: true };
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
          <Fragment>
            <div className="push">
              <WhatsappShareButton url={url} title={this.getSharePostFooter(title)} separator=" - ">
                <WhatsappIcon size={ICON_SIZE} round />
              </WhatsappShareButton>
            </div>
            <div className="push">
              <FacebookShareButton url={url} quote={this.getSharePostFooter(title)}>
                <FacebookIcon size={ICON_SIZE} round />
              </FacebookShareButton>
            </div>
            <div className="push">
              <TwitterShareButton url={url} via="http://readers-digest.surge.sh" title={title}>
                <TwitterIcon size={ICON_SIZE} round />
              </TwitterShareButton>
            </div>
            <div className="push">
              <LinkedinShareButton
                url={url}
                title={this.getSharePostFooter(title)}
                windowWidth={750}
                windowHeight={600}
              >
                <LinkedinIcon size={ICON_SIZE} round />
              </LinkedinShareButton>
            </div>
            <div className="push">
              <EmailShareButton url={url} subject={title} body={this.getSharePostFooter(url)}>
                <EmailIcon size={ICON_SIZE} round />
              </EmailShareButton>
            </div>
          </Fragment>
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
