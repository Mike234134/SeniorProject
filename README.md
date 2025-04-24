#  Bearassist – Senior Project (Group 6)

Bearassist is a smart assistant designed for **Morgan State University Computer Science students**, built to provide **academic guidance, class recommendations**, and **career development resources**—especially for **incoming freshmen** navigating the CS department.

---

##  Team Members
- Lenny  
- Daniel  
- Michael  
- Dimitri  

---

## Preqs
-Node.js – For running the React frontend

-Docker – Desktop app or VSCode extension for containerization

-Python (with Flask) – Required for running the backend server
##  Project Overview

Bearassist helps students by allowing them to:
- Upload **transcripts** to receive academic planning support.
- Ask department-specific questions and receive AI-generated responses.
- Track and revisit previous interactions with the assistant.

Our goal is to empower CS students with accessible and intelligent support, helping them plan their coursework, seek mentorship, and improve their professional readiness.

---

##  Tech Stack

| Layer            | Technology Used                                                |
|------------------|-----------------------------------------------------------------|
| **Frontend**     | React (UI/UX)                                                  |
| **Backend**      | Python, LangChain (RAG), Groq LLaMA API                        |
| **Text-to-Speech** | ElevenLabs + FFmpeg                                          |
| **Database**     | PostgreSQL (vector store for knowledge base)                  |
| **File Storage** | AWS S3 (for transcripts, resumes)                              |
| **Containerization** | Docker (for cross-platform deployment)                    |
| **Speech-to-Text** | ElevenLabs + FFmpeg                                          |

---

##  Key Features

### RAG (Retrieval-Augmented Generation)
- Powered by **LangChain**, Bearassist retrieves and integrates relevant information from a custom knowledge base to improve model response accuracy and contextual relevance.

###  Knowledge Base with PostgreSQL
- Our **vectorized PostgreSQL database** serves as the intelligent core, storing verified CS department data, including course information and faculty references.

###  AWS S3 Integration
- Secure cloud storage for uploaded **transcripts** and **resumes** via **S3 buckets**, ensuring sensitive student documents are safely preserved.

###  React Frontend with Chat Interface
- A simple and intuitive interface that lets users:
  - Ask questions about the CS department.
  - Upload important documents.
  - View chat history with the assistant.
  - Receive **recommendations** for classes, careers, and resume improvement.

###  User Authentication
- Secure login system to protect user data and provide personalized access.

### Document Dashboard
- Users can view all previously uploaded documents in a dedicated **Documents Page**.
- All past conversations are stored in the **Chat History Page** for easy reference.

###  Dockerized Deployment
- The entire application is containerized with **Docker**, making it easy to run across **Mac, Linux, and Windows**. This supports rapid development, innovation, and collaboration among future contributors.

###  ElevenLabs + FFmpeg Audio Pipeline
- Converts chatbot text responses to audio using **ElevenLabs** TTS API.
- **FFmpeg** processes and plays audio directly in the browser for seamless audio feedback.
### Speech to text
- Able to detect the users voice for text to speech features that enable the user to be able to talk to the model and get direct responses
### Usage 

- cd frontend 
- npm install to install all the node packages
- npm run dev to run the development server on your local computer
- cd backend
- pip install -r requirements.txt
- python app.py
---

##  Final Notes

Bearassist is more than just a chatbot—it's a personalized academic assistant built by students, for students. Whether you're just starting out in CS or preparing for your next opportunity, Bearassist helps you **plan smarter, move faster, and grow confidently**.

