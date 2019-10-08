import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-responsive-modal';
import CircleLoader from '../components/core/circle-loader';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/picker';
import { PostItem } from '../components/posts';
import Navigator from '../components/core/navigator';
import ShareOptions from '../components/posts/shareOptions';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postAt: 0,
      renderSplash: true,
      isOpen: false,
    };
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

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  onCloseModal = () => {
    this.setState({ isOpen: false });
  };

  getNextPost = () => {
    this.setState((prevState, props) => ({ postAt: prevState.postAt + 1 }));
  };

  getLastPost = () => {
    if (this.state.postAt === 0) {
      this.toastFirstPost();
    }

    this.setState((prevState, props) => ({
      postAt: prevState.postAt !== 0 ? prevState.postAt - 1 : 0,
    }));
  };

  toastFirstPost = () =>
    toast.info('⛷️ No previous post. ', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

  resetAndGetMorePosts = () => {
    toast.info(`You've reached the end of the feed. Getting new posts ...`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

    this.setState({ postAt: 0 });
    // const { dispatch, selectedSubreddit } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  orderPosts = posts =>
    posts.sort((a, b) => {
      const { ups: upsA, num_comments: commentsA } = a;
      const { ups: upsB, num_comments: commentsB } = b;

      if (upsA + commentsA > upsB + commentsB) return -1;
      if (upsA + commentsA < upsB + commentsB) return 1;
      return 0;
    });

  getCategoryPicker = ({ selected, selectedSubreddit, isFetching }) => (
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
    />
  );

  render() {
    // TODO: Conflict between eslint and prettier, resolve it;
    const online = window.navigator.onLine;
    // eslint-disable-next-line
    const { selected, selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    const { postAt: index, renderSplash, isOpen } = this.state;
    console.log(`>> state of modal: ${isOpen}`);
    const sortedPosts = posts && posts.length && this.orderPosts(posts);

    if (!online) {
      return (
        <div className="offline">
          <i class="fas fa-sad-tear fa-3x" />
          <span className="off-header"> Uh oh. </span>
          <span className="off-msg"> You seem to be offline. </span>
        </div>
      );
    }

    // TODO: adding this causes picker value reset. disable for now.
    if (false && renderSplash && !sortedPosts) {
      return (
        <div className="splashscreen">
          <i class="fab fa-connectdevelop fa-3x animate-icon" />
          <span className="wait-msg"> Loading your feed ... </span>
        </div>
      );
    }

    // last post, go to first
    if (index === posts.length - 1) {
      this.resetAndGetMorePosts();
    }

    return (
      <div className="web-container">
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {!isFetching && (
          <Modal
            classNames={{ modal: 'modal-custom' }}
            open={this.state.isOpen}
            onClose={this.onCloseModal}
            showCloseIcon={true}
            little
          >
            <ShareOptions
              title={sortedPosts[index].title}
              url={sortedPosts[index].url}
              ups={sortedPosts[index].ups}
              numComments={sortedPosts[index].num_comments}
              onSharedClick={this.onCloseModal}
            />
          </Modal>
        )}
        {
          <Navigator
            picker={this.getCategoryPicker({ selected, selectedSubreddit, isFetching })}
            likes={(posts[index] && posts[index].ups) || 0}
            onClick={this.getNextPost}
            onDislike={this.getNextPost}
            onPrevious={this.getLastPost}
            title={sortedPosts && sortedPosts[index].title}
            url={sortedPosts && sortedPosts[index].url}
            numComments={sortedPosts && sortedPosts[index].num_comments}
            ups={sortedPosts && sortedPosts[index].ups}
            onShareClick={this.toggleModal}
          >
            {isFetching ? (
              <CircleLoader color="#123abc" loading={isFetching} />
            ) : sortedPosts ? (
              <Fragment>
                <PostItem
                  // eslint-disable-next-line
                  key={0}
                  title={sortedPosts[index].title}
                  details={sortedPosts[index].selftext}
                  ups={sortedPosts[index].ups}
                  numComments={sortedPosts[index].num_comments}
                  url={sortedPosts[index].url}
                  preview={sortedPosts[index].preview}
                  thumbnail={sortedPosts[index].thumbnail}
                  thumb_width={sortedPosts[index].thumbnail_width}
                  thumb_height={sortedPosts[index].thumbnail_height}
                  author={sortedPosts[index].author}
                  created={sortedPosts[index].created}
                />
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnVisibilityChange={false}
                  draggable={true}
                  pauseOnHover={true}
                />
              </Fragment>
            ) : (
              <h2>Empty.</h2>
            )}
          </Navigator>
        }
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
  const { selectedSubreddit, postsBySubreddit, startApp } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  const { appStarted } = startApp;

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    appStarted,
  };
}

export default connect(mapStateToProps)(AsyncApp);
