import  { useState } from 'react';
import Dashboard from './components/Dashboard';
import { Send } from 'lucide-react';
import { FileUp } from 'lucide-react';
import { FileSearch } from 'lucide-react';

function App() {
  const [message, setMessage] = useState('');
  const handleSumbit = () => {
    alert(`what you entered was ${message}`)
  };
  
  


  return (
    <div className="bg-white p-4 h-screen flex flex-col">
      
      <Dashboard /> {/* Dashboard stays at the top */}
      
      {/* Chat bubble */}
      <div className="fixed left-[450px] top-[25px] flex items-start">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
          <span className="text-md">🐻</span>
        </div>
        <div className="bg-gray-200 rounded-2xl px-5 py-4 max-w-xs mt-2" >
          Hi how can i help you? is this what you wanted was 
        </div>
      </div>

      {/* Input section at the bottom */}
      <div className="fixed bottom-5  left-[1450px] transform -translate-x-1/1 w-[1000px] p-4 bg-gray-100 rounded-xl shadow-lg" >
        
        {/* Input Field with Send Button */}
        <div className="flex-nowrap bg-gradient-to-l from-[#FFAE75] via-[#F8F8F8]  to-[#F8F8F8] rounded-full border border-gray-300 p-2">
          <form onSubmit={handleSumbit}>
          <input 
            type="text" 
            placeholder="Ask me anything" 
            value={message} 
            onChange={(e)=> setMessage(e.target.value)}
            className="p-3  bg-transparent border-none outline-none rounded-full mt-1"
          />
          
          <button className="bg-[#FF8934] hover:bg-[#FF8934] text-white rounded-full p-4 relative left-170">
          <Send size={20}/>
          </button>
          </form>
        
        </div>

        {/* Upload Buttons */}
        <div className="flex justify-center gap-4 mt-4 mr-130">
        <label htmlFor="file-upload" className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white rounded-lg px-4 py-2 cursor-pointer transition">
  <FileUp/> Upload a document
  <input 
    id="file-upload" 
    type="file" 
    className="hidden" 
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log('File selected:', file.name);
        // Handle the file upload logic here
      }
    }}
  />
</label>

<label htmlFor="transcript-upload" className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white rounded-lg px-4 py-2 cursor-pointer transition">
  <FileSearch/>Audit my transcript
  <input 
    id="transcript-upload" 
    type="file" 
    accept=".txt,.pdf,.doc,.docx" 
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log('Transcript selected:', file.name);
        // Handle the transcript processing logic here
      }
    }}
  />
</label>
        </div>

        <input type="file" className="hidden" />
      </div>
    </div>
  );
}

export default App;