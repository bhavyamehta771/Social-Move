import React, { useState , } from "react";
import NavCommon from "../components/NavCommon";
import OngoingBet from "../components/OngoingBet";
import ClosedBets from "../components/ClosedBets";
import HomeTrending from "../components/HomeTrending";
import BetTrending from "../components/BetTrending";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";


const Bet = () => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState("Crypto");
    const { data, account, connected, read, setReload } =
    React.useContext(Context);
  
    
  return (
    <div className="bg-black overflow-hidden relative">
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
                  onClick={() => {
                    navigate("/profile");
                  }}
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
        <div className=" col-span-7 relative overflow-hidden border-r-[1px] border-solid border-[#210343] ">
          <div className="w-[568px] absolute right-4 top-4 z-10 [filter:blur(420.7px)] rounded-[50%] [background:linear-gradient(180deg,_rgba(173,_28,_198,_0.49))] h-[16.075rem] [transform:_rotate(-39.3deg)] [transform-origin:0_0]" />

          <div className="flex  h-screen pb-7 gap-12 overflow-hidden overflow-y-scroll  items-center justify-start flex-col p-4">
            {/* place all betting templates here */}
            <div className="w-[37.313rem] relative text-[2.25rem] tracking-[-0.04em] font-semibold font-inter text-[#D7D7D7] text-left inline-block [text-shadow:0px_30px_85.6px_#000]">
              Trade when you like,on what you like.
            </div>

            <div className="grid grid-cols-12 gap-6 w-full px-[34px]">
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Crypto");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Crypto"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E] cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className="font-medium">Crypto</div>
                </div>
              </div>
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Cricket");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Cricket"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)] "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Cricket</div>
                </div>
              </div>
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Politics");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Politics"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Politics</div>
                </div>
              </div>
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Stocks");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Stocks"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Stocks</div>
                </div>
              </div>
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Weather");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Weather"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Weather</div>
                </div>
              </div>
              <div className=" col-span-2">
                <div
                  onClick={() => {
                    setActiveButton("Economy");
                  }}
                  className={`w-full flex items-center ${
                    activeButton == "Economy"
                      ? "[background:linear-gradient(90deg,_#6015b6,_#ca9cff)]  "
                      : "bg-[#01041E]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
                  } justify-center relative rounded-[11px]  box-border h-[2.438rem] overflow-hidden text-left text-[1rem] text-white font-inter border-[2px] border-solid border-[#57367ebd]`}
                >
                  <div className=" font-medium">Economy</div>
                </div>
              </div>
            </div>
            {/* Ongoing Bets */}
            <div>
              <div className="w-[7.625rem] relative text-[1.125rem] tracking-[-0.04em] font-medium font-inter text-[#939393] text-left inline-block pb-4 [text-shadow:0px_30px_85.6px_#000]">
                Ongoing
              </div>
              <div className="flex flex-col pl-0  gap-10">
                <div className="w-[803px] mx-auto">
                  {data.get_ongoing_questions &&
                    data.get_ongoing_questions[0].map((_data, index) => {
                      // console.log(_data, index);
                      return (
                        <div
                          onClick={() => {
                            // console.log("clicked")
                          }}
                          key={index}
                          className="-z-10"
                        >
                          <OngoingBet
                            key={index}
                            index={index}
                            postData={_data}
                          />
                        </div>
                      );
                    })}
                </div>
                {/* <div className="w-[803px] mx-auto">
                  <OngoingBet />
                </div>
                <div className="w-[803px] mx-auto">
                  <OngoingBet />
                </div> */}
              </div>

              <div className="w-[10.75rem] pt-5 pb-3 relative text-[1.125rem] tracking-[-0.04em] font-medium font-inter text-[#939393] text-left inline-block [text-shadow:0px_30px_85.6px_#000]">
                Closed Bets
              </div>
              <div className="flex flex-col pl-0  gap-10">
                {data.get_completed_questions &&
                  data.get_completed_questions[0].map((_data, index) => {
                    // console.log(_data, index);
                    return (
                      <ClosedBets key={index} index={index} postData={_data} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Column */}
        <div className=" col-span-3 relative overflow-hidden border-r-[1px] border-solid border-[#210343] ">
          <div className="flex items-center justify-start flex-col">
            <BetTrending />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bet;
