import React, { useState } from "react";
import NavCommon from "../components/NavCommon";
import OngoingBet from "../components/OngoingBet";
import ClosedBets from "../components/ClosedBets";
import HomeTrending from "../components/HomeTrending";
import BetTrending from "../components/BetTrending";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import CreateBuilders from "../components/CreateBuilders";
import Loader from "../components/Loader";
import TipBuilder from "../components/TipBuilder";

const HelpBuilders = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Crypto");
                    const [isTip, setIsTip] = React.useState(false);
  
    const [spinner, setSpinner] = useState(false);

  const [isBuilderPopup, setIsBuilderPopup] = useState(false)
  const [currentKey, setCurrentKey] = useState(null)
  const { data, account, connected, read, setReload } =
    React.useContext(Context);

    React.useEffect(() => {
      console.log("help builders", data.get_all_builders_posts&& data.get_all_builders_posts[0]);
    }, []);
  
  return (
    <div className="bg-black overflow-hidden relative">
      {/* loader */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          spinner ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] ">
          <Loader run={spinner} />
        </div>
      </div>
      {/* tip builder */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          isTip ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <TipBuilder reload={setReload} popup={setIsTip} _index={currentKey} />
        </div>
      </div>
      {/* tip builder end */}
      {/* Popup create builder */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          isBuilderPopup ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] ">
          <CreateBuilders run={setIsBuilderPopup} />
        </div>
      </div>

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
                  className="flex  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 w-full gap-[10px]  items-center  h-12"
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
                <div className="flex cursor-pointer w-full gap-[10px]  items-center  h-12">
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
                  className="flex  hover:scale-105 hover:opacity-80 transition-all duration-200 cursor-pointer  w-full gap-[10px]  items-center  h-12"
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
                  className="flex  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200  w-full gap-[10px]  items-center  h-12"
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
              <div
                onClick={() => {
                  setIsBuilderPopup(true);
                }}
              >
                <img
                  className=" w-[70%]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 mx-auto mt-12  "
                  src="https://i.imgur.com/jJyvq04.png"
                  alt=""
                />
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
              Build And Help Build
            </div>

            {/* builder posts */}
            <div className="grid grid-cols-12 w-full relative">
              {data.get_all_builders_posts &&
                Object.entries(data.get_all_builders_posts[0]).map(
                  ([key, _data]) => {
                    console.log("Message key:", key, "Message data:", _data);
                    // Debugging line

                    return (
                      // Single Builder Post
                      <div key={key} className="col-span-6">
                        <div className="w-[381px] relative rounded-md bg-gradient-to-r from-purple-900 to-indigo-900 overflow-hidden flex flex-col items-start justify-start pt-[132px] pb-[11px] gap-[14px] border border-[#4c4c4c33]">
                          <section className="mt-[-136px] w-full flex flex-row items-start justify-start relative shrink-0 text-left text-base text-white font-inter">
                            <img
                              className="h-[122px] flex-1 relative w-full object-cover"
                              alt="Project Image"
                              src="https://i.imgur.com/lAZ10eU.png"
                            />
                            <div className="w-[100px] m-0 absolute top-[12px] right-[10px] rounded-8xs bg-gray border border-darkslateblue-200 overflow-hidden shrink-0 flex flex-row items-start justify-start py-2 px-[15px] z-[1]">
                              <a className="text-decoration-none relative font-medium text-inherit inline-block min-w-[68px]">
                                {_data.grants_received / 100000000}/$
                                {_data.grants_required / 100000000}
                              </a>
                            </div>
                          </section>

                          <section className="self-stretch w-[96%] mx-auto flex flex-col items-start justify-start gap-[15px] max-w-full shrink-0 text-left text-[20px] text-white font-inter">
                            <a className="w-[97px] relative tracking-[-0.04em] font-bold text-inherit inline-block text-shadow-md">
                              {_data.project_name}
                            </a>
                            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1 box-border max-w-full text-[18px]">
                              <p className="m-0 flex-1 relative tracking-[-0.04em] inline-block text-shadow-md w-[95%]">
                                {_data.project_description}
                              </p>
                            </div>
                          </section>

                          <div className="flex flex-row items-start justify-start py-0 pr-[7px] pl-1 max-w-full">
                            <div className="flex flex-row items-start justify-start gap-[14px] max-w-full">
                              <button className="py-[7px] px-[42px] bg-darkslateblue-100 rounded-8xs overflow-hidden flex flex-row items-start justify-start whitespace-nowrap border border-darkslateblue-200">
                                <div className="relative text-base font-medium font-inter text-white text-left inline-block min-w-[83px]">
                                  View More
                                </div>
                              </button>
                              <button className="py-[7px] px-[26px] bg-slateblue rounded-8xs overflow-hidden flex flex-row items-start justify-start gap-[9px] border border-darkslateblue-200">
                                <div
                                  onClick={() => {
                                    setCurrentKey(key);
                                    setIsTip(true);
                                    setReload((prev) => {
                                      prev + 1;
                                    });
                                  }}
                                  className="flex flex-col items-start justify-start pt-0.5"
                                >
                                  <div className="relative text-base font-medium font-inter text-white text-left inline-block min-w-[83px]">
                                    Tip Project
                                  </div>
                                </div>
                                <img
                                  className="h-[23px] w-[23px] relative rounded-full object-cover min-h-[23px]"
                                  alt="Tip Icon"
                                  src="https://i.imgur.com/pd8h2PJ.png"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
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
}

export default HelpBuilders
