import { MessageCircle } from 'lucide-react';
import { FileText } from 'lucide-react';
import { PanelRight } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';

interface DashboardProps {
  chatHistory: string[]; // Define the expected prop type for chat history
}

function Dashboard({ chatHistory }: DashboardProps) {
  return (
    <div className="left-50  w-64 bg-[#FF9244] text-white flex flex-col p-6">
      <div>
        <h1 className="font-bold text-lg">Bear Assist</h1>
      </div>

      <div className="space-y-4 py-5">
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

      <h2 className="flex font-medium">Chat history</h2>

      <div className="rounded-lg">
        {chatHistory.map((chat, index) => (
          <div key={index} className="p-2 hover:bg-[#FF9244] rounded cursor-pointer">
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
