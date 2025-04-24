import React, { useEffect, useState } from 'react'
import './Document.scss';
// import {documents} from '../../Constants'
import DocumentCard from '../DocumentCard/DocumentCard';
import Dashboard from '../../components/Dashboard';
const Document = () => {
   const [transcripts,setTranscripts] = useState([])
   useEffect(()=>{
    const getDocuments =  async() =>{
      const response = await fetch('http://127.0.0.1:5000/retrieveTranscripts')
      const data = await response.json()
      console.log(data);
      setTranscripts(Array.isArray(data.transcripts) ? data.transcripts : [])
      console.log(data.transcripts)
     }
     getDocuments()
   },[])

   
    return (
        <div className='home' >
          <Dashboard chatHistory={[]}/>
          <div className='home-content-container'>
            <div className='title-container'>
              <h1>Documents</h1>
              <div className='title-underline'></div>
            </div>
            <div className='content-container'>
              {transcripts?.map((transcript,index)=>(
                  <DocumentCard key={index} document={{ file_url: transcripts[index], filename: `Document ${index + 1}`, mimeType: 'text/plain' }} />
                ))}
              
            </div>
          </div>
    
        </div>
      )
}

export default Document