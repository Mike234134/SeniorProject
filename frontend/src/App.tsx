
import { useState, useEffect, useRef, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react"
import { Send, FileUp, FileSearch, Volume2, VolumeX } from "lucide-react"
import { ElevenLabsClient, play } from 'elevenlabs'; // Import play function

// Define types for our message objects
interface ChatMessage {
  sender: "user" | "bot"
  text: string
  isStreaming?: boolean
  audioUrl?: string
}

// Add custom animation styles
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`

// ElevenLabs API configuration
const ELEVENLABS_API_KEY = import.meta.env.ELEVENLABS_API_KEY || "";
const ELEVENLABS_VOICE_ID = "EXAVITQu4vr4xnSDxMaL" // Default voice ID (Rachel)

function App() {
  const [message, setMessage] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ sender: "bot", text: "Hi how can i help you?" }])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const client = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY }); // Create the client instance

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Function to generate speech from text using ElevenLabs API
  const generateSpeech = async (text: string): Promise<string | null> => {
    if (!ELEVENLABS_API_KEY) {
        console.error("ElevenLabs API key is not set");
        return null;
    }

    try {
        const audio = await client.textToSpeech.convert(ELEVENLABS_VOICE_ID, {
            text: text,
            model_id: "eleven_multilingual_v2",
            output_format: "mp3_44100_128", // Important: match the output format
        });

        return URL.createObjectURL(audio);
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};
  // Function to play audio
  const playAudio = (audioUrl: string) => {
    if (!audioEnabled || !audioRef.current) return;

    audioRef.current.src = audioUrl;

    audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
    });
};
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (!audioEnabled && audioRef.current) {
      audioRef.current.pause()
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // Prevent default form submission

    if (message.trim()) {
      // Add user message to chat
      setChatMessages([...chatMessages, { sender: "user", text: message }])

      // Add a placeholder for the bot message that will be streamed
      setChatMessages((prev) => [...prev, { sender: "bot", text: "", isStreaming: true }])

      // Simulate a bot response (in a real app, you'd call an API here)
      try {
        const response = await fetch("http://127.0.0.1:5000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: message }),
        })

        const data = await response.json()

        // Get the full response text
        const fullText = data.answer

        // Generate speech for the full text
        let audioUrl = null
        if (audioEnabled && ELEVENLABS_API_KEY) {
          audioUrl = await generateSpeech(fullText)
        }

        // Remove the placeholder streaming message
        setChatMessages((prev) => prev.filter((msg) => !msg.isStreaming))

        // Add an empty message that we'll update character by character
        setChatMessages((prev) => [...prev, { sender: "bot", text: "", audioUrl }])

        // Play the audio if available
        if (audioUrl) {
          playAudio(audioUrl)
        }

        // Start streaming the text character by character
        let currentIndex = 0
        const streamInterval = setInterval(() => {
          if (currentIndex < fullText.length) {
            setChatMessages((prev) => {
              const newMessages = [...prev]
              const lastMessage = newMessages[newMessages.length - 1]
              lastMessage.text = fullText.substring(0, currentIndex + 1)
              return newMessages
            })
            currentIndex++
          } else {
            clearInterval(streamInterval)
          }
        }, 15) // Adjust speed by changing this value (milliseconds)
      } catch (error) {
        console.error("Error:", error)
        setChatMessages((prev) => {
          // Remove the streaming placeholder
          const filtered = prev.filter((msg) => !msg.isStreaming)
          return [...filtered, { sender: "bot", text: "Sorry, there was an error processing your request." }]
        })
      }

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
    <>
      <style jsx global>
        {fadeInAnimation}
      </style>
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
          {/* Audio toggle button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${audioEnabled ? "bg-[#FF9244]" : "bg-gray-300"} text-white`}
              title={audioEnabled ? "Mute audio" : "Enable audio"}
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

          {/* Chat messages area with scrolling */}
          <div className="flex-grow overflow-y-auto p-6 pb-40">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-md">🐻</span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-5 py-4 max-w-md animate-fadeIn ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-gray-500 animate-pulse"></span>}
                  {msg.audioUrl && msg.sender === "bot" && (
                    <button
                      onClick={() => playAudio(msg.audioUrl!)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      title="Play audio again"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
                {msg.sender === "user" && (
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                    <span className="text-white text-md">👤</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
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
    </>
  )
}

export default App
