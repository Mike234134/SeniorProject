import React, { useEffect, useState } from 'react'
import './Admin.scss'
import AdminCard from '../AdminCard/AdminCard'
import { useLocation, useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
// it hsould be upload data source 


const Admin = ({user, setUser}) => {
    const fileData = [
        {
          title: 'Document 1.file',
          size: '1.2 MB',
          uploadedOn: '2024-04-24',
        },
        {
          title: 'Document 2.file',
          size: '2.8 MB',
          uploadedOn: '2024-04-24',
        },
        {
          title: 'Final Report.file',
          size: '3.5 MB',
          uploadedOn: '2024-03-18',
        },
        {
          title: 'Meeting Notes.file',
          size: '900 KB',
          uploadedOn: '2024-02-10',
        },
      ];
    
      const [files, setFiles] = useState(
        []
      )

      const [uploading, setUploading] = useState(false);
      const [storedFiles, setStoredFiles] = useState([]); // files from the backend


      useEffect(() => {
        // Fetch files that already exist in the DB when the component mounts
        const fetchStoredFiles = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/adminRetrieveDataSource'); // adjust endpoint as needed
            setStoredFiles(response.data.files); // your backend should return a list of files
          } catch (err) {
            console.error('Failed to fetch existing files:', err);
          }
        };
    
        fetchStoredFiles();
      }, []);

      const navigate = useNavigate();

      const handleSignOut = () => {
            setUser({
            userName: null,
            Email: null,
            password: null,
            user_role: 'student'
            });
            navigate('/');
        };

      const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        console.log('Files selected:', selectedFiles);
        if (selectedFiles.length === 0) {
            alert('Please select a file first.');
            return;
        };

        const formData = new FormData();
        selectedFiles.forEach((file) => {
        formData.append('mydatasource', file); // 'mydatasource' must match backend field name
        });


        try {
            setUploading(true);

            const response = await axios.post('http://127.0.0.1:5000/adminupload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });

            // Assuming response includes new file metadata, you can update stored files list
            if (response.data.uploadedFiles) {
                setStoredFiles((prev) => [...prev, ...response.data.uploadedFiles]);
            }

            console.log('Upload success:', response.data);
            } catch (error) {
            console.error('Upload failed:', error);
            } finally {
            setUploading(false);
            }


     };

      
  return (
    <div className='admin'>
         <header className='header-nav'>
            <h1>Bear Assistance</h1>
            <button id='signout' onClick={handleSignOut}> log out</button>
        </header>
        <div className='admin-content-container'>
            <h1 className='header'>file Admin form upload</h1>
            <div className='content'>
                
                <div className='child-content-container'>

                <h1 id='upload-file-heading'>
                    Quick Actions
                </h1>
                <label 
                htmlFor="fileinput" 
                id='fileInputLable'

                >
                <h2>{uploading ? 'Uploading...' : 'Upload File'}</h2>
                <input 
                    id="fileinput"
                    type="file" 
                    name="mydatasource"
                    multiple 
                    aria-label="Upload files"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // hide the input
                />
                </label>

                </div>
                <div className='uploaded-content-container'>
                    <h1>Uploaded files</h1>
                    {storedFiles.map((file, i) => (
                    <AdminCard
                    key={i}
                    title={file.name}
                    size={file.size}
                    uploadedOn= {new Date(file.lastModified).toLocaleString()}
                    />
                ))}


                </div>

            </div>
            
            
            

            

        </div>
    </div>
  )
}

export default Admin