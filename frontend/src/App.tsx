import { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import Dashboard from './components/Dashboard'; // Ensure this import is correct
import { Send, FileUp, FileSearch } from 'lucide-react';

// Define types for our message objects
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hi how can i help you?' }
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (message.trim()) {
      // Add user message to chat
      setChatMessages([
        ...chatMessages,
        { sender: 'user', text: message }
      ]);

      // Simulate a bot response (in a real app, you'd call an API here)
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: 'bot', text: `I received your message: "${message}"` }
        ]);
      }, 500);

      // Clear the input field
      setMessage('');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`${type} selected:`, file.name);
      // Handle the file upload logic here
    }
  };

  // Filter out only the user responses from chatMessages
  const userMessages = chatMessages.filter(msg => msg.sender === 'user').map(msg => msg.text);

  return (
    <div className="bg-white p-4 h-screen flex flex-col relative">

      {/* Pass only user messages to the Dashboard */}
      <Dashboard chatHistory={userMessages} /> {/* Passing only the user's responses */}

      {/* Chat messages area with scrolling */}
      <div className="fixed left-100">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
                <span className="text-md">🐻</span>
              </div>
            )}
            <div className={`rounded-2xl px-5 py-4 max-w-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center ml-2">
                <span className="text-white text-md">👤</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input section below the chat messages */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl p-4 bg-gray-100 rounded-xl shadow-lg z-30">
        {/* Input Field with Send Button */}
        <form onSubmit={handleSubmit} className="flex items-center bg-gradient-to-l from-[#FFAE75] via-[#F8F8F8] to-[#F8F8F8] rounded-full border border-gray-300 p-2">
          <textarea
            placeholder="Ask me anything"
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            className="flex-grow p-3 bg-transparent border-none outline-none resize-none max-h-32 overflow-y-auto"
            style={{ minHeight: '42px' }}
            rows={1}
            // Auto-resize the textarea
            onInput={(e: FormEvent<HTMLTextAreaElement>) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`; // Limit to 120px height
            }}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as FormEvent);
              }
            }}
          />
          <button
            type="submit"
            className="bg-[#FF8934] hover:bg-[#FF8934] text-white rounded-full p-4 ml-2 flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </form>

        {/* Upload Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <label htmlFor="file-upload" className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white rounded-lg px-4 py-2 cursor-pointer transition">
            <FileUp size={18} className="mr-2" /> Upload a document
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'File')}
            />
          </label>

          <label htmlFor="transcript-upload" className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white rounded-lg px-4 py-2 cursor-pointer transition">
            <FileSearch size={18} className="mr-2" /> Audit my transcript
            <input
              id="transcript-upload"
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'Transcript')}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
