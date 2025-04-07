import { MessageCircle } from 'lucide-react';
import { FileText } from 'lucide-react';
import { PanelRight } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';



function Dashboard() {
  const chatHistory = [
    "How do i go to hackathons",
    "Signup for the new hackathon",
    "How do i sign up for Math 241",
    "Who is my advisor"
  ];
  /*const[isCollapsedSidebar,settoogleSidebarCollapse] = useState <boolean>(false)
  const toogleSidebarCollapses = () =>{
        settoogleSidebarCollapse((prev )=> !prev)
  }/** */

  return (
    <div className=" left-50  h-300 w-1/5 bg-[#FF9244] text-white  flex flex-col rounded-4xl p-10">
      <div  className="flex  mb-5">
        <span className='flex'><MessageCircle/></span>
        <span>Bear Assist</span>
        <button className='ml-31'><PanelRight/></button>
        
        </div>
      
  
      <button className="flex">
        <span className="mb-4"><FileText/></span>
        <span><a href="./Signup">Document</a></span>
      </button>
      <button className="flex">
        <span className="gap-20"><MessageCircleMore/></span>
        <span className='mb-8'><a href="#">Chats</a></span> 
      </button>

      <h2 className="flex font-medium mb-2 ml-2">Chat history</h2>

      <div className=" rounded-lg">
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
