import { MessageCircle } from 'lucide-react';
import { FileText } from 'lucide-react';
import { PanelRight } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';

interface DashboardProps {
  chatHistory: string[]; // Define the expected prop type for chat history
}

function Dashboard({ chatHistory }: DashboardProps) {
  return (
    <div className="left-50 h-300 w-1/5 bg-[#FF9244] text-white flex flex-col rounded-4xl p-10">
      <div className="flex mb-5">
        <span className="flex"><MessageCircle /></span>
        <span>Bear Assist</span>
        <button className="ml-40"><PanelRight /></button>
      </div>

      <button className="flex">
        <span className="mb-4"><FileText /></span>
        <span><a href="./Signup">Document</a></span>
      </button>
      <button className="flex">
        <span className="gap-20"><MessageCircleMore /></span>
        <span className="mb-8"><a href="#">Chats</a></span>
      </button>

      <h2 className="flex font-medium mb-2 ml-2">Chat history</h2>

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
