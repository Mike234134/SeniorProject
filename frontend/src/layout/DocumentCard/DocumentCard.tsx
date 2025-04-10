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
            <img src={props.document.image} className= "document-image" alt="" />
        </div>
        <div className= 'DocumentCard-content-container'>
            <h1 className='documentName'>{props.document.name}</h1>

            <div className='description-container'><p className='description-content'>{props.document.type_document}</p> </div>

        </div>
    </div>
  )
}

export default DocumentCard