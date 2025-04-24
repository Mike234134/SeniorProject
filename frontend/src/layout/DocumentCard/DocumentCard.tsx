import React , { FC } from 'react';
import './DocumentCard.scss'
import documentImage from '../../assets/Document.jpg';

interface MyComponentProps {
  document: {
    name:string
    type_document: string
    image:string
  }
  
}
const DocumentCard: FC<MyComponentProps> = ({document}) => {
  return (
    <div className='DocumentCard '>
        <div className= 'DocumentCard-content-container'>
            <h1 className='documentName'>{document.filename}</h1>

            <div className='description-container'><p className='description-content'>{document.mimeType}</p> </div>

        </div>
        <div className='DocumentCard-img-container'>
            <img src={documentImage} className= "document-image h-24 w-24" alt="" />
        </div>
        <a href={document.file_url} target='_blank' className='bg-orange-500 p-2  m-2 rounded-xl text-white text-center text-sm w-1/2'>View Document</a>
    </div>
  )
}

export default DocumentCard