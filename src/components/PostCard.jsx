/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { Context } from "../context/ContextProvider";

const PostCard = ({ postData, index }) => {
  // console.log(postData, index);     
  
   const videoRef = useRef(null);
   const observerRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);
  const {
    data,
    account,
    connected,
    read,
    setReload,
    getUserDataFromAddress,
    likePost,
    savePost,
  } = React.useContext(Context);

  React.useEffect(() => {
    async function l() {
      let a = await getUserDataFromAddress(postData.owner);
      console.log(a);
      setUserProfile(a);
    }
    l();
  }, []);

    useEffect(() => {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        },
        { threshold: 0.5 }
      );

      const currentObserver = observerRef.current;
      if (videoRef.current) {
        currentObserver.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          currentObserver.unobserve(videoRef.current);
        }
      };
    }, []);
  return (
    <div>
      <div className="w-[582px] flex flex-col pr-[76px] pt-[22px] pb-[37px] pl-[81px] relative rounded-md bg-[#331b4b57] box-border  overflow-hidden text-left text-[0.875rem] text-white font-inter border-[1px] border-solid border-[#1E1E1E]">
        {/* 1st layer */}
        <div className="flex justify-between mb-[22px]">
          <div className="flex gap-2 ">
            <div>
              <img
                className=" w-[51px] object-cover h-[51px]"
                src={
                  userProfile
                    ? userProfile.profile_url
                    : `https://i.imgur.com/xc1pEff.png`
                }
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 items-start justify-between">
              <div className="w-[5.313rem] relative text-[0.875rem] font-medium font-inter text-white text-left inline-block">
                @{userProfile ? userProfile.username : "Username"}{" "}
              </div>
              <div className="w-[3.25rem] relative text-[0.875rem] font-medium font-inter text-[#686868] text-left inline-block">
                10 mins
              </div>
            </div>
          </div>

          <div className="min-w-[99px] p-3 flex gap-2 items-center justify-normal relative rounded-[40px] [background:linear-gradient(90deg,_#6015b6,_#ca9cff)] h-[2.438rem]  text-left text-[0.875rem] text-white font-inter">
            <img
              className=" object-cover w-[29px] h-[29px]"
              src="https://i.imgur.com/1yixIPq.png"
              alt=""
            />
            <div className="">Tip User</div>
          </div>
        </div>
        {/* Caption */}
        <div className="w-[90%]">
          <div className="text-[0.875rem] font-medium font-inter text-white text-left inline-block">
            {postData.caption || "Caption"}
          </div>
        </div>
        {/* image layer */}
        <div>
          {postData.post_url.slice(
            ((postData.post_url.lastIndexOf(".") - 1) >>> 0) + 2
          ) == "mp4" ? (
            <video
              ref={videoRef}
              className="h-[266px] object-cover"
              autoPlay
                loop
              src={postData.post_url}
              // controls
            ></video>
          ) : (
            <img
              className="  max-h-[455px] object-contain "
              src={postData.post_url || "https://i.imgur.com/lZGZutI.png"}
              alt=""
            />
          )}
        </div>
        {/* 3rd layer */}
        <div className="flex pt-4 pl-4 gap-5">
          <img
            onClick={() => {
              likePost(index);
              // setReload(true);
            }}
            className="w-[29px] object-cover cursor-pointer"
            src="https://i.imgur.com/spXlu6y.png"
            alt=""
          />
          <img
            className="w-[29px] object-cover cursor-pointer"
            src="https://i.imgur.com/lMkvL5O.png"
            alt=""
          />

          <img
            onClick={async() => {
             await savePost(index);
              setReload(true);
            }}
            className="w-[29px] object-cover cursor-pointer"
            src="https://i.imgur.com/k5g3KXD.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
