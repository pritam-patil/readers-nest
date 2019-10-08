import React, { Component, Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { func, number, string } from 'prop-types';
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
import CopyTextOnClick from './CopyText';
import './styles.css';

const ICON_SIZE = 44;

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
    const { title, url, /* numComments, ups, */ onSharedClick } = this.props;
    // const { isChecked } = this.state;

    return (
      <Fragment>
        <div className="box" id="share-popup">
          <div className={'share-title'}>Share a link</div>
          <div className="share-options" onClick={onSharedClick}>
            <div className="push">
              <WhatsappShareButton url={url} title={this.getSharePostFooter(title)} separator=" - ">
                <WhatsappIcon size={ICON_SIZE} round />
              </WhatsappShareButton>
              <span className="icon-hint"> WhatsApp </span>
            </div>
            <div className="push">
              <FacebookShareButton url={url} quote={this.getSharePostFooter(title)}>
                <FacebookIcon size={ICON_SIZE} round />
              </FacebookShareButton>
              <span className="icon-hint"> Facebook </span>
            </div>
            <div className="push">
              <TwitterShareButton url={url} via="http://readers-digest.surge.sh" title={title}>
                <TwitterIcon size={ICON_SIZE} round />
              </TwitterShareButton>
              <span className="icon-hint"> Twitter </span>
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
              <span className="icon-hint"> LinkedIn </span>
            </div>
            <div className="push">
              <EmailShareButton url={url} subject={title} body={this.getSharePostFooter(url)}>
                <EmailIcon size={ICON_SIZE} round />
              </EmailShareButton>
              <span className="icon-hint"> Email </span>
            </div>
          </div>
          <CopyTextOnClick text={url} />
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
  onSharedClick: func,
};

export default ShareOptions;
