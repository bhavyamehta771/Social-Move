import React, { useState } from "react";
import NavHome from "../components/NavHome";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../components/RegisterUser";
import PostCard from "../components/PostCard";
import "./css/Message.css"
import ChatComp from "../components/ChatComp";

const Message = () => {
    const navigate = useNavigate();
    const [activeFriend, setActiveFriend] = useState(null)
  const [friendData, setFriendData] = useState({})
  const [allFriends,setAllFriends] = useState(null)
    const {
      data,
      account,
      connected,
      read,
      setReload,
      getUserDataFromAddress,
    } = React.useContext(Context);

     React.useEffect(() => {
       async function fetchFriendData() {
         // Check if data.user_friends is an array and has elements
         if (Array.isArray(data.user_friends) && data.user_friends.length > 0) {
           setAllFriends(data.user_friends);
           // Create an array of promises for fetching user data
           const promises = data.user_friends[0].map((friend) =>
             getUserDataFromAddress(friend)
           );
          //  if (data.user_friends.length > 0) {
          //    setActiveFriend(0)
          //  }
             try {
               // Wait for all promises to resolve
               const results = await Promise.all(promises);
               console.log("inside friend data", results);

               // Update the state with the fetched data
               setFriendData(results);
             } catch (error) {
               console.error("Error fetching friend data:", error);
             }
         }
       }

       fetchFriendData();
     }, [data]);
    return (
      <div className="bg-black h-screen overflow-hidden relative">
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
        <div className="grid w-full h-full bg-black  overflow-hidden grid-cols-12 gap-0">
          {/* 1st Column */}
          <div className=" col-span-2 bg-black border-r-[1px] border-solid border-[#210343] ">
            <div>
              <div className="flex pt-[55px]  h-full w-full flex-col items-start justify-start">
                {/* Group of buttons */}
                <div className="flex ml-[43px] flex-col gap-5">
                  <div
                    onClick={() => {
                      navigate("/home");
                    }}
                    className="flex hover:opacity-80 transition-all duration-200 cursor-pointer w-full gap-[10px]  items-center  h-12"
                  >
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
                      navigate("/bet");
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
                      navigate("/home");
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
                  <div className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12">
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
                    className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12"
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

              {/* gen meme button
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
              {/* Post button 
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
              </div> */}
            </div>
          </div>
          {/* 2nd Column */}
          <div className=" col-span-6   overflow-hidden border-r-[1px] border-solid border-[#210343] ">
            <div className="flex flex-col w-full pt-10 pl-24">
              {/* search */}
              <div className=" ">
                <div className="search relative">
                  <form className="form">
                    <button>
                      <svg
                        width="17"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="search"
                      >
                        <path
                          d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                          stroke="currentColor"
                          strokeWidth="1.333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <input
                      className="inputNav"
                      placeholder="Search"
                      required=""
                      type="text"
                    />
                    <button className="reset" type="reset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* friends */}
              <div className="pt-9 ">
                {data.user_friends &&
                  data.user_friends[0].map((_data, _index) => {
                    console.log(
                      "user friends",
                      _data,
                      _index,
                      friendData[_index]
                    );
                    return (
                      <div
                        onClick={() => {
                          setActiveFriend(_index);
                        }}
                        key={_index}
                        className={`w-[523px]  cursor-pointer  hover:opacity-80 transition-all duration-200 pl-4 py-3 p-1 flex gap-4 relative hover:bg-[#585454] ${
                          activeFriend == _index
                            ? "bg-[#57367e33]"
                            : " bg-black"
                        }  min-h-[3.813rem] overflow-hidden text-left text-[1.25rem] text-white font-inter`}
                      >
                        <div className="">
                          <img
                            className="w-[51px] rounded-full object-contain"
                            src={
                              friendData.length > 0
                                ? friendData[_index].profile_url
                                : "https://"
                            }
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col">
                          <div className="min-w-[8rem] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block">
                            {friendData.length > 0 && friendData[_index].name}
                          </div>
                          <div className="min-w-[7.063rem]  relative text-[0.875rem] font-inter text-[#757575] text-left inline-block">
                            @{friendData.length > 0 && friendData[0].username}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {!data.user_friends ? (
                  <img
                    className="w-[523px] "
                    src="https://i.imgur.com/rcSKYbX.png"
                    alt=""
                  />
                ) : null}
              </div>
            </div>
          </div>
          {/* 3rd Column */}
          <div className=" col-span-4  pb-20 w-full overflow-y-scroll">
            <div className="flex items-start justify-start w-full flex-col">
              {/* <HomeTrending />- */}
              {activeFriend != null && (
                <ChatComp
                  sender={account.address}
                  recieverProfile={friendData[activeFriend]}
                  reciever={allFriends[0][activeFriend]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Message;
