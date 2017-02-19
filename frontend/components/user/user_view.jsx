import React from 'react';
import { connect } from 'react-redux';
import EditProfileButton from '../buttons/edit_profile_button';
import { receiveUserInView } from '../../actions/user_actions';
import TrackIndex from '../tracks/track_index';
import { selectTracksAsArray } from '../../reducers/selectors'
import { fetchTracks } from '../../actions/track_actions';

const UserBanner = ({ user }) => {
  return (
    <div className='user-banner'>
      <div className='user-image'>
        <img src={ user.image_url } />
      </div>
      <div className='user-info'>
        <div><h1>{ user.name }</h1></div>
        { user.location &&
          <div><h2>{ user.location }</h2></div>
        }
      </div>
    </div>
  );
}

const UserNav = ({ currentTab, updateTab, user, isProfile }) => {
  return (
    <nav className='user-nav'>
      <ul className='user-view-tabs'>
        <li className='user-view-tab-item'
            onClick={ updateTab('tracks') }>
          <span className={ currentTab === 'tracks' ? 'selectedTab' : '' }>
            Tracks
          </span>
        </li>
      </ul>
      { isProfile &&
        <div className='user-edit-button-container'>
          <EditProfileButton user={user} />
        </div>
      }
    </nav>
  );
}

class UserView extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentTab: 'tracks'
    }

    this.updateTab = this.updateTab.bind(this);
    this.isProfile = this.isProfile.bind(this);
  }

  componentDidMount () {
    if (this.isProfile()) {
      this.props.receiveUserInView(this.props.user);
    }
    this.props.fetchTracks({artist_id: this.props.user.id});
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.user) { return null; }
    if (this.props.user.id !== newProps.user.id) {
      this.props.fetchTracks({artist_id: newProps.user.id})
    }
  }

  updateTab (tab) {
    return () => {
      this.setState({ currentTab: tab })
    }
  }

  isProfile () {
    return this.props.currentUser.id === this.props.user.id
  }

  render () {
    const { user, tracks } = this.props;
    if (!user) { return null; }

    return (
      <div className='user-view'>
        <UserBanner user={ user }/>
        <UserNav
          user={ user } isProfile={ this.isProfile() }
          currentTab={ this.state.currentTab }
          updateTab={ this.updateTab }/>
        <div className='user-view-main'>
          <div className='user-tracks-column'>
            <TrackIndex tracks={ tracks }/>
          </div>
          <div className='user-side-column'>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  tracks: selectTracksAsArray(state),
  currentUser: state.session.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  fetchTracks: (specs) => dispatch(fetchTracks(specs)),
  receiveUserInView: (user) => dispatch(receiveUserInView(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
