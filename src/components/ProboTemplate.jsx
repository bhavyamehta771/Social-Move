import React from "react";
import BackgroundImageDiv from "./BGImageDiv";

const ProboTemplate = () => {
  return (
    <div>
      <div className="relative w-[290px] min-h-[170px] max-h-max">
        <BackgroundImageDiv
          classs={"flex flex-col pl-4 pr-3 pb-3 h-auto rounded-md"}
          imageUrl="https://i.imgur.com/0HvA1f6.png"
        >
          <div className="flex pb-[32px] flex-col pt-[22px] w-full  ">
            <div className="min-w-[3.75rem] mb-[10px] relative text-[0.75rem] font-inter text-white text-left inline-block">
              34 traders
            </div>
            <div className="w-[80%] relative text-[0.875rem] font-medium font-inter text-white text-left inline-block">
              National employment rate to be 92.6% or more by June 30?
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-[126px] cursor-pointer flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#dbe7ff,_#9fc0ff)] box-border h-[2.188rem] text-left text-[0.875rem] text-[#006DFF] font-inter border-[1px] border-solid border-[#C5DEFF]">
              <div className=" font-medium">Yes</div>
              <img
                className=" rounded-[91px] w-[0.813rem] h-[0.813rem] object-cover"
                alt=""
                src="https://i.imgur.com/LeWoECY.png"
              />
              <div className=" font-medium">6</div>
            </div>

            <div className="w-[126px] cursor-pointer flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#f9e2df,_#ffb3a9)] box-border h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-[#fc0101] font-inter border-[1px] border-solid border-[#ffdbdb]">
              <div className=" font-medium">No</div>
              <img
                className=" rounded-[91px] w-[0.813rem] h-[0.813rem] object-cover"
                alt=""
                src="https://i.imgur.com/LeWoECY.png"
              />
              <div className=" font-medium">6</div>
            </div>
          </div>
        </BackgroundImageDiv>
      </div>
    </div>
  );
};

export default ProboTemplate;
