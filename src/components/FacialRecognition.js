import React from 'react';
import '../style/FacialRecognition.css';

const FacialRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className='displayed-image center ma'>
      <div className='absolute mt2'>
        <img
          id='input-image'
          alt=''
          src={imageUrl}
          width='500px'
          height='auto'
        />
				{
					boxes.map(box => {
						return (
							<div
								key={box.topRow} 
								className="bounding_box"
								style={{ top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
							</div>
						)
					})
				}
      </div>
    </div>
  )
}

export default FacialRecognition;
