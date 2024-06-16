import React, { useState } from "react";
import NavHome from "../components/NavHome";
import PostCard from "../components/PostCard";
import HomeTrending from "../components/HomeTrending";
import CreateMemePopup from "../components/CreateMemePopup";
import PostPopup from "../components/PostPopup";
import { Context } from "../context/ContextProvider";
import RegisterUser from "../components/RegisterUser";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate();
  const [memePopup, setMemePopup] = useState(false)
  const [postPopup, setPostPopup] = useState(false)
  const { data, account, connected, read, setReload  } =
    React.useContext(Context);
  
  
  React.useEffect(() => {
    // console.log(data.view_all_posts[0]);
   
  // console.log()
   
  }, [data])
  
  return (
    <div className=" bg-black overflow-hidden relative">
      {/* Meme Popup */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          memePopup ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <CreateMemePopup run={setMemePopup} />
        </div>
      </div>
      {/* Post Popup */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          postPopup ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <PostPopup run={setPostPopup} />
        </div>
      </div>

      {/* Register Popup */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          data.get_user_profile == null && account && read > 0
            ? "fixed"
            : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <RegisterUser reload={setReload} />
        </div>
      </div>

      {/* Navbar */}
      <div>
        <NavHome />
      </div>
      <div className="w-full relative box-border h-[0.063rem] border-t-[1px] border-solid border-[#210343]" />

      {/* Hero */}
      <div className="grid w-full h-full bg-black  overflow-hidden grid-cols-12 gap-2">
        {/* 1st Column */}
        <div className=" col-span-2 bg-black border-r-[1px] border-solid border-[#210343] ">
          <div>
            <div className="flex pt-[55px]  h-full w-full flex-col items-start justify-start">
              {/* Group of buttons */}
              <div className="flex ml-[43px] flex-col gap-5">
                <div className="flex hover:opacity-80 transition-all duration-200 cursor-pointer w-full gap-[10px]  items-center  h-12">
                  <div>
                    <img
                      className="w-[1.313rem] relative  object-cover overflow-hidden shrink-0"
                      src="https://i.imgur.com/K98zvYM.png"
                      alt=""
                    />
                  </div>
                  <div className="relative min-w-[57px] flex items-center h-11 text-[1.25rem] font-medium font-inter text-white text-left">
                    Home
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate("/builders");
                  }}
                  className="flex   hover:opacity-80 transition-all duration-200 cursor-pointer w-full gap-[10px]  items-center  h-12"
                >
                  <div>
                    <img
                      className="w-[1.313rem] relative  object-cover overflow-hidden shrink-0"
                      src="https://i.imgur.com/ju5PmMu.png"
                      alt=""
                    />
                  </div>
                  <div className="relative min-w-[57px] flex items-center h-11 text-[1.25rem] font-medium font-inter text-white text-left">
                    Fund to Build
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate("/chat");
                  }}
                  className="flex hover:opacity-80 transition-all duration-200 cursor-pointer  w-full gap-[10px]  items-center  h-12"
                >
                  <div>
                    <img
                      className="w-[1.313rem] relative  object-cover overflow-hidden shrink-0"
                      src="https://i.imgur.com/LktABoR.png"
                      alt=""
                    />
                  </div>
                  <div className="relative min-w-[57px] flex items-center h-11 text-[1.25rem] font-medium font-inter text-white text-left">
                    Chats
                  </div>
                </div>
                <div className="flex   hover:opacity-80 transition-all duration-200 cursor-pointer  w-full gap-[10px]  items-center  h-12">
                  <div className="hover:opacity-80 transition-all duration-200 cursor-pointer">
                    <img
                      className="w-[1.313rem] relative  object-cover overflow-hidden shrink-0"
                      src="https://i.imgur.com/r6587bA.png"
                      alt=""
                    />
                  </div>
                  <div className="relative min-w-[57px] flex items-center h-11 text-[1.25rem] font-medium font-inter text-white text-left">
                    Communities
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="flex  cursor-pointer hover:opacity-80 transition-all duration-200  w-full gap-[10px]  items-center  h-12"
                >
                  <div className="hover:opacity-80 transition-all duration-200 cursor-pointer">
                    <img
                      className="w-[1.313rem] relative  object-cover overflow-hidden shrink-0"
                      src="https://i.imgur.com/ruI1LFA.png"
                      alt=""
                    />
                  </div>
                  <div className="relative min-w-[57px] flex items-center h-11 text-[1.25rem] font-medium font-inter text-white text-left">
                    Profile
                  </div>
                </div>
              </div>
            </div>

            {/* gen meme button */}
            <div className="pt-[97px] pl-7 pb-7 ">
              <div
                onClick={() => {
                  if (connected) {
                    setMemePopup(true);
                  } else {
                    alert("Connect your wallet first");
                  }
                }}
                className=" cursor-pointer hover:scale-105 hover:opacity-85 transition-all duration-200 w-[174px] flex items-center justify-center relative shadow-[0px_0px_0px_#acff43] rounded-[7px] bg-[#081E20] box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-[3px] border-solid border-[#396600]"
              >
                <b className="">Gen Memes</b>
              </div>
            </div>
            {/* Post button */}
            <div className="pl-7 pb-7 ">
              <div
                onClick={() => {
                  if (connected) {
                    setPostPopup(true);
                  } else {
                    alert("Connect your wallet first");
                  }
                }}
                className=" cursor-pointer hover:scale-105 hover:opacity-85 transition-all duration-200 w-[174px] flex items-center justify-center relative shadow-[0px_0px_0px_#acff43] rounded-[7px] bg-[#acff43] box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem] text-black font-inter border-[3px] border-solid border-[#396600]"
              >
                <b className="">Post</b>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd Column */}
        <div className=" col-span-7   overflow-hidden border-r-[1px] border-solid border-[#210343] ">
          <div className="flex h-screen pb-7 gap-12 overflow-hidden overflow-y-scroll  items-center justify-start flex-col p-4">
            {data.view_all_posts &&
              data.view_all_posts[0].map((_data, index) => {
                // console.log(_data, index);
                return <PostCard key={index} index={index} postData={_data} />;
              })}
            {/* <PostCard />
            <PostCard /> */}
          </div>
        </div>
        {/* 3rd Column */}
        <div className=" col-span-3 h-screen overflow-y-clip">
          <div className="flex items-center justify-start flex-col">
            <HomeTrending />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
