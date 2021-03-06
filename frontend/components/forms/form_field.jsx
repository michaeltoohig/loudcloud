import React from 'react';

const doNotShow = {
  audio_url: true,
  artist: true,
  num_plays: true,
  queuePos: true,
  comments: true,
  num_comments: true,
  liked_by_current_user: true,
  num_likes: true,
  waveform: true,
  duration: true,
  elapsedTime: true,
  temp_queue_pos: true,
  total_plays: true
}

const FormField = ({ field, value, update }) => {
  const displayFields = {
    location: "Location",
    name: "Display name",
    email: "Email address",
    title: "Title",
    credits: "Credits"
  }

  const size = field === 'name' ? 'whole' : 'half';

  if (doNotShow[field]) { return null; }

  return (
    <div className={ 'edit-field-' + size }>
      <label className='edit-field-label'>{ displayFields[field] }</label>
      <input className='edit-field-input'
        type='text' value={ value }
        onChange={ update }/>
    </div>
  )
}

export default FormField;
