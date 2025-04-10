import React , { FC } from 'react';
import './DocumentCard.scss'
interface MyComponentProps {
  document: object;
  name:string
  type_document: string
  image:string
}
const DocumentCard: FC<MyComponentProps> = (props) => {
  return (
    <div className='DocumentCard'>
        <div className='DocumentCard-img-container'>
            <img src={props.document.file_url} className= "document-image" alt="" />
        </div>
        <div className= 'DocumentCard-content-container'>
            <h1 className='documentName'>{props.document.filename}</h1>

            <div className='description-container'><p className='description-content'>{props.document.mimeType}</p> </div>

        </div>
    </div>
  )
}

export default DocumentCard