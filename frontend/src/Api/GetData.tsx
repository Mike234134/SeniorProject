import React from 'react'
import axios from "axios";
const GetData = () => {
  // Define a type for the response (you can adjust this based on your backend response structure)
    interface TranscriptResponse {
        success: boolean;
        transcripturl: any;
        
    };

    interface Transcript {
        filename: string;
        mimeType: string;
        file_url: string;
        // other fields...
      }

    interface userTranscripts {
        success: boolean;
        transcripts: Transcript[]; // Assuming the response is an array of transcripts
      }
  
  // Define the sendingTranscript function
  const sendingTranscript = async (formData: FormData): Promise<TranscriptResponse | { success: false; error: string }> => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/uploadTranscripts",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      if (response.status === 201) {
        const transcripturl = response.data;
        console.log(transcripturl, "it works :3!");
        console.log("No errors!!!");
  
        return { success: true, transcripturl: transcripturl };
      }
  
      // Handle unexpected statuses or errors
      return { success: false, error: 'Unexpected response status' };
    } catch (error) {
      console.error(error);
      return { success: false, error: error?.response?.data || 'Unknown error' };
    }
  };

  const getTranscript = async (): Promise<userTranscripts | { success: false; error: string }> => {
    try {
      console.log('the business name is:')
      const response = await axios.get(`http://127.0.0.1:5000/retrieveTranscripts` );// Make sure your backend API URL is correct
      
  
      if (response.status === 200) {
        const transcript = response.data;
        console.log(transcript, "it works :3!");
        console.log("No errors!!!");
  
        return { success: true, transcripts: response.data };
      }
  
      // Handle unexpected statuses or errors
      return { success: false, error: 'Unexpected response status' };
    } catch (error) {
      console.error(error);
      return { success: false, error: error?.response?.data || 'Unknown error' };
    }
  };
  
  return {
    sendingTranscript,
    getTranscript
  }
}

export default GetData