import React from "react";
import NavHome from "../components/NavHome";
import BackgroundImageDiv from "../components/BGImageDiv";
import NavCommon from "../components/NavCommon";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black overflow-hidden w-full">
      {/* navbar */}
      <div>
        <NavCommon />
      </div>

      {/* 1st */}
      <div className="flex flex-col w-[1440px] h-[680px]">
        <BackgroundImageDiv
          classs={""}
          imageUrl={"https://i.imgur.com/ZkumtvP.png"}
        >
          <div className="pt-[130px] pl-[58px]">
            <div className="">
              <img
                className=" w-[471px] object-contain"
                src="https://i.imgur.com/b9qyEUh.png"
                alt=""
              />
            </div>

            <div className=" pt-20">
              <div className="w-[57.75rem] relative text-[2rem] tracking-[-0.04em] text-left inline-block [filter:drop-shadow(0px_30px_60px_rgba(0,_0,_0,_0.5))] text-[#D9D9D9] font-inter">
                <span className="font-semibold">{`A vibrant `}</span>
                <i className="font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#ffd39a_12.4%,_#349997_27.5%,_#ffc478_41.9%,_#737373)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  SOCIAL MEDIA
                </i>
                <span className="font-semibold">
                  {" "}
                  for Memes, staking games, fundings, news updates, blogging and
                  many more.
                </span>
              </div>
            </div>

            <div className=" pt-16">
              <div className="w-[176px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative [backdrop-filter:blur(13.6px)] rounded-[5px] bg-[#ffffff2b] h-[3.5rem] overflow-hidden text-left text-[1.25rem] text-[#d9d9d9] font-inter">
                <div
                  onClick={() => {
                    navigate("/home");
                  }}
                  className=" tracking-[-0.04em] font-medium [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]"
                >
                  Get Started
                </div>
              </div>

              <div className=" pt-5">
                <div className="w-[9.313rem] relative text-[1.438rem] tracking-[-0.04em] font-inter text-[#d9d9d9] text-left inline-block [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)] opacity-[0.3]">
                  Build On Aptos
                </div>
                <div>
                  <div className="w-[15.5rem] relative text-[1.438rem] tracking-[-0.04em] font-inter text-[#d9d9d9] text-left inline-block [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)] opacity-[0.3]">
                    Powered by GARI tokens
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full relative">
            <img src="https://i.imgur.com/CBLO2Nn.png" alt="" />
            <div
              onClick={() => {
                navigate("/home");
              }}
              className="w-[176px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 bottom-40 left-16 absolute [backdrop-filter:blur(13.6px)] rounded-[5px] bg-[#FFFFFF2B] h-[3.5rem]  text-left text-[1.25rem] text-[#D9D9D9] font-inter"
            >
              <div className="w-full  flex items-center justify-center h-full  tracking-[-0.04em] font-medium [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]">
                Create memes
              </div>
            </div>
          </div>

          <div className="relative px-[57px] bg-black w-full">
            <div className="w-[17.313rem] pt-[130px] pb-[51px] relative text-[3rem] tracking-[-0.04em] font-semibold font-inter text-[#D9D9D9] text-left inline-block [text-shadow:0px_30px_85.6px_#000]">{`Our Features `}</div>
            <div className="grid pb-8 grid-cols-12 gap-6 w-full ">
              <div className=" col-span-4">
                <img
                  className="h-full"
                  src="https://i.imgur.com/EMxooA7.png"
                  alt=""
                />
              </div>
              <div className=" col-span-5">
                <img src="https://i.imgur.com/xA05ktb.png" alt="" />
              </div>
              <div className=" col-span-3">
                <img
                  className="h-full"
                  src="https://i.imgur.com/kBQnKiG.png"
                  alt=""
                />
              </div>
              <div className=" col-span-7">
                <img src="https://i.imgur.com/OJ4OhNQ.png" alt="" />
              </div>
              <div className=" col-span-5">
                <img
                  className="h-full"
                  src="https://i.imgur.com/dYQYnD5.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full  bg-black">
            <img src="https://i.imgur.com/B58WGaw.png" alt="" />
          </div>
          <div className="flex bg-black flex-col pt-[168px] pl-[80px] ">
            <div className=" bg-black pb-[53px]">
              <img
                className="w-[93%]"
                src="https://i.imgur.com/P93jTCj.png"
                alt=""
              />
            </div>
            <div className="w-full pb-7 flex items-center justify-center relative text-[1.5rem] tracking-[-0.04em] font-semibold font-inter text-left  [filter:drop-shadow(0px_30px_85.6px_#000)] text-[#808080]">
              <span>Build by{` `}</span>
              <span className="text-white">
                <span className="text-white">{` `}</span>
                {` `} &nbsp;#Builders&nbsp;{` `}
                <span className="text-white">{` `}</span>
              </span>
              {` `}
              <span> in Move it with Aptos</span>
            </div>
            <div className="w-full pb-7 flex items-center justify-center relative text-[1.125rem] capitalize font-semibold font-inter text-white text-left ">
              © 2024 AptoVerse | All rights reserved
            </div>
          </div>
        </BackgroundImageDiv>
      </div>
    </div>
  );
};

export default Preview;
