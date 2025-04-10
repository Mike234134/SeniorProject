import React from 'react'
import './Home.scss';
import {documents} from '../../Constants'
import DocumentCard from '../DocumentCard/DocumentCard';

const Home = () => {
  return (
    <div className='home' >
      <div className='home-content-container'>
        <div className='title-container'>
          <h1>Documents</h1>
          <div className='title-underline'></div>
        </div>
        <div className='content-container'>
          {
            documents?.map((document, index) => (
              <DocumentCard key={index} document = {document} />

            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Home