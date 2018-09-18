import React from 'react';
import '../style/ImageLinkForm.css';
import 'tachyons';

const ImageLinkForm = ({ handleChange, handleSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className="center">
        <div className='center form pa4 br3 shadow-5'>
          <input
            className='f4 pa2 w-70 center'
            type="text"
            onChange={handleChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white"
            onClick={handleSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
