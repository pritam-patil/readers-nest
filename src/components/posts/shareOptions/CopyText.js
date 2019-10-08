import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class CopyTextOnClick extends Component {
  copyText = () => {
    this.refs.input.select();

    document.execCommand('copy');
    toast.success('Copied to clipboard.', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
    return false;
  };

  render() {
    const { text } = this.props;

    return (
      <div className="copy-link">
        <span> {text} </span>
        <input
          ref="input"
          type="text"
          defaultValue={text}
          style={{ position: 'fixed', top: '-1000px' }}
        />
        <button onClick={this.copyText}> COPY </button>
      </div>
    );
  }
}
