import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircleLoader from '../components/core/circle-loader';
import SiteIcon from '../components/core/ring-loader';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/picker';
import Posts from '../components/posts';
import '../App.css';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
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
    // TODO: Conflict between eslint and prettier, resolve it;
    // eslint-disable-next-line
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <SiteIcon />
          <img
            className="site-icon"
            src="http://readers-digest.surge.sh/icons/favicon.ico"
            alt="site-icon"
          />
          <h2>Read trending articles!</h2>
        </div>
        <Picker
          value={selectedSubreddit}
          isFetching={isFetching}
          refreshClick={this.handleRefreshClick}
          onChange={this.handleChange}
          options={[
            'Google',
            'Humor',
            'Internet',
            'Television',
            'India News',
            'Food',
            'Science',
            'Technology',
            'History',
            'Movies',
            'Smartphones',
            'Facebook',
            'Daily',
            'World News',
            'Altcoin',
            'Computers',
            'Programming',
            'ReactJS',
            'Frontend',
            'Python',
            'React Native',
            'Fullstack',
            'Self Improvement',
          ]}
          lastUpdated={lastUpdated}
        />
        {isFetching && <CircleLoader color="#123abc" loading={isFetching} />}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {!isFetching &&
          posts.length > 0 && (
            <div>
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Posts posts={posts} />
              </div>
              <p align="center">
                The information shown here is provided by
                <code> https://www.reddit.com/r/ API </code>
                <img
                  alt="reddit icon"
                  src="https://png.icons8.com/doodle/50/000000/reddit.png"
                  style={{ width: '24px', height: '24px' }}
                />
              </p>
              <p align="center" style={{ margin: '0px' }}>
                Icons are provided by{' '}
                <a href="https://icons8.com" rel="noopener noreferrer" target="_blank">
                  Icon pack by Icons8
                </a>
              </p>
            </div>
          )}
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  // TODO: PropTypes.array is deprecated, change it.
  // eslint-disable-next-line
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  // TODO: Decide if we need to use default props compulsorily
  // eslint-disable-next-line
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);
