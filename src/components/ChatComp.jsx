import React,{useEffect, useState} from 'react'
import Sender from './Sender';
import Recieve from './Recieve';
import "./css/ChatComp.css"
import { Context } from "../context/ContextProvider";


const ChatComp = ({ sender, recieverProfile, reciever }) => {
  const {
    data,
    account,
    connected,
    read,
    setReload,
      getUserDataFromAddress,
    sendMessage,
    recieveMessage,
  } = React.useContext(Context);
    const [messages, setMessages] = useState(null)
    const [sendMsg, setSendMsg] = useState('')
  React.useEffect(() => {
    console.log("inside message box ", sender, recieverProfile, reciever);
      console.log("recieved messagess", recieveMessage(sender, reciever));
     async function p() {
          let s =await recieveMessage(sender, reciever);
        
          console.log("S",s)
          setMessages(s);
      }
      p()
  }, [reciever, sender]);
    
useEffect(() => {
  const updateDateTime =async () => {
      let s = await recieveMessage(sender, reciever);
      setMessages(s)
  };

  updateDateTime(); // Set initial date and time
  const intervalId = setInterval(updateDateTime, 5000); // Update every 5 seconds

  return () => clearInterval(intervalId); // Clean up on unmount
}, []);
 

  return (
    <div key={reciever} className="w-full relative">
      <div
        id="top-fixed"
        className="w-full flex gap-4 fixed   z-10 bg-black py-[5px] px-4 h-[3.813rem] text-left text-[1.25rem] text-white font-inter"
      >
        <div className="flex w-full gap-2">
          <div>
            <img
              className="relative rounded-full w-[51px] object-cover"
              src={recieverProfile.profile_url}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="w-[90%] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block">
              {recieverProfile.name}
            </div>
            <div className="w-[90%] relative text-[0.875rem] font-inter text-[#757575] text-left inline-block">
              @{recieverProfile.username}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[4.813rem] py-20 pl-4">
        {/* Add top padding to make space for the fixed div */}
        {messages &&
          Object.entries(messages).map(([key, _data]) => {
            console.log("Message key:", key, "Message data:", _data); // Debugging line
            return _data.sender == sender ? (
              <Sender d={_data} />
            ) : (
              <Recieve d={_data} />
            );
          })}
        {/* <Recieve key={0} d={"_data"} /> */}

        {/* <Recieve />
        <Sender />
        <Sender /> */}
      </div>

      <div className="fixed bottom-0 w-full flex h-[5rem] bg-black items-center ">
        <div className="relative flex items-center justify-start pl-10 w-full ">
          <div className="relative  ">
            <input
                          type="text"
                          value={sendMsg}
                          onChange={(e) => {
                              setSendMsg(e.target.value);
                          }}
              placeholder="Type Something .."
              // autoComplete="email"
              // aria-label="Email address"
              className="block w-[430px] rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-white ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
            />
            <div className="absolute inset-y-1 right-1 flex justify-end">
                          <button
                              onClick={() => {
                                  sendMessage(reciever,sendMsg)
                              }}
                type="submit"
                aria-label="Submit"
                className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComp
