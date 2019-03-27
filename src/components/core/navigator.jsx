import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Navigator = props => (
  <div className="home-page">
    <div className="snackbarWrapper">
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
    </div>    
    <div className="main-content">{props.children}</div>
    <div className='footerWrapper'> 
      <footer>
        <i class="fas fa-reply fa-2x" onClick={props.onPrevious}></i>
        <i class="far fa-thumbs-down fa-2x" onClick={props.onDislike}></i>
        <div id="reddit" onClick={props.onClick}>
          <i class="fab fa-reddit fa-4x"></i>
        </div>
        <i class="far fa-thumbs-up fa-2x"></i>
        <i class="fas fa-share-alt fa-2x" onClick={props.onShareClick}></i>
      </footer>
    </div>
  </div>
);

Navigator.propTypes = {
  onShareClick: PropTypes.func.isRequired
};

export default Navigator;
