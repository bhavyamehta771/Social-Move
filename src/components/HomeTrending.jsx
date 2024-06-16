import React from 'react'
import ProboTemplate from './ProboTemplate';
import BackgroundImageDiv from './BGImageDiv';

const HomeTrending = () => {
  return (
    <div className="flex flex-col gap-2 pt-[0px] pl-[0px] pr-6 pb-4 ">
      <div className="min-w-[8.688rem] relative text-[1.375rem] tracking-[-0.04em] font-semibold font-inter text-white text-left inline-block [text-shadow:0px_30px_85.6px_#000]">
        Trending Now
      </div>
      <div className="relative">
        <ProboTemplate />
      </div>

      <div className="relative w-[290px] h-[150px]  ">
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

      <div
        // style={{ gridTemplateRows: ` auto` }}
        className="grid w-full grid-cols-12 gap-2 "
      >
        <div className="relative w-full cursor-pointer  col-span-6 h-[150px]">
          <BackgroundImageDiv
            imageUrl={"https://i.imgur.com/6kk1aya.png"}
            classs={"rounded-md"}
          >
            <div className="flex items-start justify-end pt-2 pr-2">
              <div className="w-[68px] flex items-center justify-center relative rounded-[47px] bg-[#2a1541cc] box-border h-[1.188rem] text-left text-[0.75rem] text-white font-inter border-[0.5px] border-solid border-[#57367ebd]">
                <div className=" capitalize">News</div>
              </div>
            </div>
          </BackgroundImageDiv>
        </div>

        <div className="relative w-full cursor-pointer  col-span-6 h-[150px]">
          <BackgroundImageDiv
            imageUrl={"https://i.imgur.com/vzbnTn8.png"}
            classs={"rounded-md"}
          >
            <div className="flex items-start justify-end pt-2 pr-2">
              <div className="w-[68px] flex items-center justify-center relative rounded-[47px] bg-[#2a1541cc] box-border h-[1.188rem] text-left text-[0.75rem] text-white font-inter border-[0.5px] border-solid border-[#57367ebd]">
                <div className=" capitalize">Article</div>
              </div>
            </div>
          </BackgroundImageDiv>
        </div>

        <div className="relative w-full cursor-pointer  col-span-12 h-[160px]">
          <BackgroundImageDiv
            imageUrl={"https://i.imgur.com/aKiT6pL.png"}
            classs={
              "rounded-md w-full h-full flex items-end justify-end pr-[6px]"
            }
          >
            <div className="w-min relative text-[2.813rem] font-bebas-neue text-white text-left inline-block [text-shadow:0px_0px_10.1px_#000]">
              Community
            </div>
          </BackgroundImageDiv>
        </div>
      </div>
    </div>
  );
}

export default HomeTrending
