"use client"

import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react"
import { Send, FileUp, FileSearch } from "lucide-react"

// Define types for our message objects
interface ChatMessage {
  sender: "user" | "bot"
  text: string
}

function App() {
  const [message, setMessage] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ sender: "bot", text: "Hi how can i help you?" }])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // Prevent default form submission

    if (message.trim()) {
      // Add user message to chat
      setChatMessages([...chatMessages, { sender: "user", text: message }])

      // Simulate a bot response (in a real app, you'd call an API here)
      fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          setChatMessages((prev) => [
            ...prev,
            { sender: "bot", text: data.answer }, // Assuming the response has an 'answer' field
          ])
        })
        .catch((error) => {
          console.error("Error:", error)
          setChatMessages((prev) => [
            ...prev,
            { sender: "bot", text: "Sorry, there was an error processing your request." },
          ])
        })

      // Clear the input field
      setMessage("")
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log(`${type} selected:`, file.name)
      // Handle the file upload logic here
    }
  }

  // Filter out only the user responses from chatMessages
  const userMessages = chatMessages.filter((msg) => msg.sender === "user").map((msg) => msg.text)

  return (
    <div className="bg-white h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#FF9244] text-white flex flex-col">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="font-bold text-lg">Bear Assist</h1>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <span>Document</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span>Chats</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg">Chat history</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat messages area with scrolling */}
        <div className="flex-grow overflow-y-auto p-6 pb-40">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-md">🐻</span>
                </div>
              )}
              <div
                className={`rounded-2xl px-5 py-4 max-w-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center ml-2">
                  <span className="text-white text-md">👤</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input section fixed at the bottom */}
        <div className="bottom-5 mx-auto p-4 m-2 bg-gray-100 rounded-xl w-[80%] z-10">
          {/* Input Field with Send Button */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gradient-to-l from-[#FFAE75] via-[#F8F8F8] to-[#F8F8F8] rounded-full border border-gray-300 p-2"
          >
            <textarea
              placeholder="Ask me anything"
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              className="flex-grow p-3 bg-transparent text-sm border-none outline-none resize-none max-h-32 overflow-y-auto"
              style={{ minHeight: "42px" }}
              rows={1}
              onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`
              }}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as unknown as FormEvent)
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
            <label
              htmlFor="file-upload"
              className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white text-sm rounded-lg px-4 py-2 cursor-pointer transition"
            >
              <FileUp size={18} className="mr-2" /> Upload a document
              <input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, "File")} />
            </label>

            <label
              htmlFor="transcript-upload"
              className="flex items-center bg-[#FF9244] hover:bg-orange-500 text-white text-sm rounded-lg px-4 py-2 cursor-pointer transition"
            >
              <FileSearch size={18} className="mr-2" /> Audit my transcript
              <input
                id="transcript-upload"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileChange(e, "Transcript")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
