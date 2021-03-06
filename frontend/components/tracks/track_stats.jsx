import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import EditTrackButton from '../buttons/edit_track_button';
import DeleteTrackButton from '../buttons/delete_track_button';
import LikeButton from '../buttons/like_button';

const TrackStats = ({ track, currentUser, showDelete }) => {
  const isOwnSong = currentUser ?
    (track.artist.id === currentUser.id) : false;

  return (
    <div className='track-stats flex-row'>
      <div className='track-stats-left'>
        <div className='flex-item'>
          <LikeButton track={ track }/>
          { isOwnSong &&
            <EditTrackButton track={ track } />
          }
          { showDelete && isOwnSong &&
            <DeleteTrackButton track={ track } />
          }
        </div>
      </div>
      <div className='track-stats-right'>
        <div className='flex-item'>
          <i className='fa fa-play' aria-hidden='true'></i>
          <span>{ track.num_plays }</span>
        </div>
        { showDelete ?
          <div>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>{ track.num_likes }</span>
          </div> :
          <Link className='flex-row' to={`/tracks/${track.id}`}>
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span>{ track.num_comments }</span>
          </Link>
        }
      </div>
    </div>
  )
}


const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
})

export default connect (
  mapStateToProps
)(TrackStats);
