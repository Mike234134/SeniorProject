import React from 'react'
import './AdminCard.scss'
const AdminCard = (props) => {
  return (
    <div className='admin-card'>
        <div className='icon'>
            📄 
        </div>
        <div className="text-content">
        <h2>{props.title}</h2>
        <div className='metadata-content'>
            <p>{props.size} • Uploaded on {props.uploadedOn}</p>
        </div>
        
      </div>     
    </div>
  )
}

export default AdminCard