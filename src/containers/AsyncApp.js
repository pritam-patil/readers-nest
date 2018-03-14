import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircleLoader from '../components/core/circle-loader';
import SiteIcon from '../components/core/ring-loader';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import '../App.css';

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div class="App">
        <div className="App-header">
            <SiteIcon />
            <h2> Read trending articles!</h2>
        </div>
        <Picker
          value={selectedSubreddit}
          isFetching={isFetching}
          refreshClick={this.handleRefreshClick}
          onChange={this.handleChange}
          options={['google', 'cool', 'daily', 'internet', 'reactjs', 'frontend', 'python', 'facebook', 'fullstack']}
          lastUpdated={lastUpdated}
        />
        {isFetching && (
            <CircleLoader
                color={'#123abc'}
                loading={isFetching}
            />
        )}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {!isFetching && posts.length > 0 &&
          <div>
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
            <p align="center"> The information shown here is provided by <code> https://www.reddit.com/r/ API </code> </p>
          </div>
          }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
