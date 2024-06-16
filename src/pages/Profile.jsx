import React, { useState } from "react";
import NavCommon from "../components/NavCommon";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import ProboCustomCard from "../components/ProboCustomCard";

const Profile = () => {
    const navigate = useNavigate()
    const [activeButton, setActiveButton] = useState("Posts");
       const { data, account, connected, read, setReload } =
        React.useContext(Context);
    React.useEffect(() => {
        console.log(
          "inside profile",
          data.view_all_posts && data.get_user_questions1[0][0]
        );
      
    
      
    }, [data?.view_all_posts])
    

  return (
    <div className="bg-black overflow-hidden h-screen relative">
      <div>
        <NavCommon />
      </div>
      <div className="w-full relative box-border h-[0.063rem] border-t-[1px] border-solid border-[#210343]" />
      <div className="grid w-full h-full bg-black  overflow-hidden grid-cols-12 gap-2">
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
                  className="flex cursor-pointer w-full gap-[10px]  items-center  h-12"
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
                    navigate("/builders");
                  }}
                  className="flex cursor-pointer w-full gap-[10px]  items-center  h-12"
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
                  className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12"
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
                  <div>
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
                
                  className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12"
                >
                  <div>
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
            {/* <div className="pt-[97px] pl-7 pb-7 ">
              <div onClick={() => {
                setMemePopup(true)
              }} className=" cursor-pointer hover:scale-105 hover:opacity-85 transition-all duration-200 w-[174px] flex items-center justify-center relative shadow-[0px_0px_0px_#acff43] rounded-[7px] bg-[#081E20] box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-[3px] border-solid border-[#396600]">
                <b className="">Gen Memes</b>
              </div>
            </div> */}
            {/* Post button */}
            {/* <div className="pl-7 pb-7 ">
              <div onClick={() => {
                setPostPopup(true)
              }} className=" cursor-pointer hover:scale-105 hover:opacity-85 transition-all duration-200 w-[174px] flex items-center justify-center relative shadow-[0px_0px_0px_#acff43] rounded-[7px] bg-[#acff43] box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem] text-black font-inter border-[3px] border-solid border-[#396600]">
                <b className="">Post</b>
              </div>
            </div> */}
          </div>
        </div>
        {/* 2nd column */}
        <div className=" col-span-7 relative overflow-scroll border-r-[1px] border-solid border-[#210343] ">
          <div className="flex flex-col  p-4">
            <div className="flex mb-10 relative min-h-[240px] ">
              <div className="flex flex-col w-full gap-4">
                <img src="https://i.imgur.com/aFIemgx.png" alt="" />
              </div>
              <img
                className=" absolute top-1/2 left-5  rounded-[164px] max-w-full  h-[9.125rem] object-cover"
                alt=""
                src={
                  data.get_user_profile && data.get_user_profile[0].profile_url
                }
              />
            </div>

            <b className="w-[90%] pl-10 relative text-[1.625rem] inline-block font-inter text-white text-left">
              {data.get_user_profile && data.get_user_profile[0].name}
            </b>
            <div className="w-[90%] pl-10 relative text-[1rem] font-inter text-[#757575] text-left inline-block">
              {data.get_user_profile && data.get_user_profile[0].username}
            </div>
            {/* buttons */}
            <div className="grid mt-6 grid-cols-12 gap-6 w-full px-[34px]">
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Posts");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Posts"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E] cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className="font-medium">Posts</div>
                </div>
              </div>
              <div className=" col-span-3">
                <div
                  onClick={() => {
                    setActiveButton("Saved Post");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Saved Post"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)] "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Saved Post</div>
                </div>
              </div>
              <div className=" col-span-3">
                <div
                  onClick={() => {
                    setActiveButton("Game Played");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Game Played"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem]  text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Game Played</div>
                </div>
              </div>
            </div>
            {/* buttons end */}

            <div
              className="grid grid-cols-12 gap-7 mb-20
             mt-8"
            >
              {activeButton === "Posts" &&
                (data.get_user_profile && data.get_user_profile[0].posts
                  ? data.get_user_profile[0].posts.map((_data, index) => {
                      const url =
                        data.view_all_posts &&
                        data.view_all_posts[0][_data].post_url;
                      const isMp4 = url.endsWith(".mp4");

                      return (
                        <div
                          className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 col-span-4"
                          key={index}
                        >
                          {console.log(index, _data)}
                          {/* Render the properties of _data as needed */}
                          {isMp4 ? (
                            <video className="w-full h-full" controls>
                              <source src={url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img src={url} alt={`media-${index}`} />
                          )}
                        </div>
                      );
                    })
                  : null)}

              {activeButton === "Saved Post" &&
                (data.get_user_profile && data.get_user_profile[0].saved_posts
                  ? data.get_user_profile[0].saved_posts.map((_data, index) => {
                      const url =
                        data.view_all_posts &&
                        data.view_all_posts[0][_data].post_url;
                      const isMp4 = url.endsWith(".mp4");

                      return (
                        <div
                          className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 col-span-4"
                          key={index}
                        >
                          {console.log(index, _data)}
                          {/* Render the properties of _data as needed */}
                          {isMp4 ? (
                            <video className="w-full h-full" controls>
                              <source src={url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img src={url} alt={`media-${index}`} />
                          )}
                        </div>
                      );
                    })
                  : null)}
              {activeButton === "Game Played" &&
                (data.get_user_questions1 && data.get_user_questions1[0]
                  ? data.get_user_questions1[0].map((_data, index) => {
                      return (
                        <div
                          onClick={() => {
                            navigate(`/betview?index=${_data.question_id}`);
                          }}
                          className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 col-span-6"
                          key={index}
                        >
                          <ProboCustomCard bet_data={_data} />
                        </div>
                      );
                    })
                  : null)}
            </div>
            {/* <div key={index} className=" col-span-4">
                      <p className="text-white">
                        {data.view_all_posts && data.view_all_posts[0]._data}
                      </p>
                      <img
                        src={
                          data.view_all_posts &&
                          data.view_all_posts[0][_data].post_url
                        }
                        alt=""
                      />
                    </div> */}
          </div>
        </div>

        {/* 3rd Column */}
        <div className=" col-span-3 relative overflow-hidden border-r-[1px] border-solid border-[#210343] ">
          <div className="flex items-center justify-start flex-col">
            {/* <BetTrending /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
