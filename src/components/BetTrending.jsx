import React from 'react'
import BackgroundImageDiv from './BGImageDiv';

const BetTrending = () => {
  return (
    <div className="flex flex-col gap-2 pt-[0px] pl-[0px] pr-6 pb-4 ">
      <div className="min-w-[8.688rem] relative text-[1.375rem] tracking-[-0.04em] font-semibold font-inter text-white text-left inline-block [text-shadow:0px_30px_85.6px_#000]">
        Trending Now
      </div>
      {/* <div className="relative">
        <ProboTemplate />
      </div> */}

      <div className="relative w-[290px] h-[180px]  ">
        <BackgroundImageDiv
          imageUrl={"https://i.imgur.com/JZY6COh.png"}
          classs={
            "rounded-md w-full h-full flex items-end justify-end pr-[6px]"
          }
        >
          <div className="w-[7.063rem] relative text-[2.813rem] font-bebas-neue text-white text-left inline-block [text-shadow:0px_0px_10.1px_#000]">
            Cricket
          </div>
        </BackgroundImageDiv>
      </div>
      <div className="relative w-[290px] h-[180px]  ">
        <BackgroundImageDiv
          imageUrl={"https://i.imgur.com/euNWaDe.png"}
          classs={
            "rounded-md w-full h-full flex items-end justify-end pr-[6px]"
          }
        >
          <div className="w-[7.063rem] relative text-[2.813rem] font-bebas-neue text-white text-left inline-block [text-shadow:0px_0px_10.1px_#000]">
            News
          </div>
        </BackgroundImageDiv>
      </div>

      <div
        // style={{ gridTemplateRows: ` auto` }}
        className="grid w-full grid-cols-12 gap-2 "
      >
        <div className="relative w-full cursor-pointer  col-span-12 h-[180px]">
          <BackgroundImageDiv
            imageUrl={"https://i.imgur.com/4aocvCq.png"}
            classs={
              "rounded-md w-full h-full flex items-end justify-end pr-[6px]"
            }
          >
            <div className="w-min relative text-[2.813rem] font-bebas-neue text-white text-left inline-block [text-shadow:0px_0px_10.1px_#000]">
              Stocks
            </div>
          </BackgroundImageDiv>
        </div>
      </div>

      <div className=" pt-[38px] ">
        <div className="w-full flex items-center justify-center  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 relative shadow-[0px_0px_0px_#acff43] rounded-[7px] bg-[#2e1747bf] box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-[4px] border-solid border-[#30283978]">
          <div className=" font-medium">HOW IT WORKS ?</div>
        </div>
      </div>
    </div>
  );
}

export default BetTrending
