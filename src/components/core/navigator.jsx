import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-lightweight-tooltip';
import ShareOptions from '../posts/shareOptions';
import './styles.css';

const greenRoundedStyle = {
  wrapper: {
    position: 'relative',
    display: 'inline-block',
    zIndex: '98',
    color: '#555',
    cursor: 'help',
  },
  tooltip: {
    borderRadius: '10px',
    position: 'absolute',
    zIndex: '99',
    background: '#000',
    bottom: '100%',
    left: '20%',
    marginBottom: '10px',
    padding: '5px',
    WebkitTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)',
    OTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
  },
  content: {
    background: '#000',
    color: '#fff',
    fontSize: '.8em',
    padding: '.3em 1em',
    whiteSpace: 'nowrap',
  },
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    bottom: '-5px',
    left: '60%',
    marginLeft: '-5px',
    borderLeft: 'solid transparent 5px',
    borderRight: 'solid transparent 5px',
    borderTop: 'solid #000 5px',
  },
  gap: {
    position: 'absolute',
    width: '100%',
    height: '40px',
    bottom: '-20px',
  },
};

export const Navigator = props => (
  <div className="home-page">
    <div className="snackbar">
      <div className="sb-left">
        <i class="fab fa-connectdevelop fa-2x"></i>
        {props.picker}
      </div>
      <div className="sb-right">
        <i class="fas fa-thumbs-up fa-1g border"> {props.likes} </i>
        <i class="fas fa-ellipsis-v fa-1g center"></i>
      </div>
    </div>
    {true && props.children}
    {false && <p> This is a post content </p>}
    <div className="navbar">
      <i class="fas fa-reply fa-2x" onClick={props.onPrevious}></i>
      <i class="fas fa-thumbs-down fa-2x"></i>
      <div id="reddit" onClick={props.onClick}>
        <i class="fab fa-reddit fa-4x"></i>
      </div>
      <i class="fas fa-thumbs-up fa-2x"></i>
      {false && <Tooltip
        content={
          [
            <ShareOptions title={props.title} url={props.url} ups={props.ups} numComments={props.numComments}/>
          ]
        }
        styles={greenRoundedStyle}>
        <i class="fas fa-share-alt fa-2x"></i>
      </Tooltip>
      }
      <i class="fas fa-share-alt fa-2x"></i>
    </div>
  </div>
);