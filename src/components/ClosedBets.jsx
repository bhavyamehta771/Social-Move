import React, { useState, useRef, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import BackgroundImageDiv from "./BGImageDiv";
import { useNavigate } from "react-router-dom";


const ClosedBets = ({ postData, index }) => {
  const navigate = useNavigate();
  const [traders, setTraders] = useState(null);

  const { data, account, connected, read, setReload, placeBet } =
    React.useContext(Context);
  
  function sumOfArrayLengths(array1, array2) {
    // Get the lengths of both arrays
    const length1 = array1.length;
    const length2 = array2.length;

    // Sum the lengths
    const totalLength = length1 + length2;

    // Return the sum
    setTraders(totalLength);
  }

  useEffect(() => {
    console.log(postData, index);

    sumOfArrayLengths(postData.no_bets, postData.yes_bets);
  }, []);

  return (
    <div
      onClick={() => {
        navigate(`/betview?index=${postData.question_id}`);
      }}
      className="w-full relative rounded-md [background:linear-gradient(104.17deg,_#5f2f93,_#1d0e2d)] box-border  overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]"
    >
      <div className="grid grid-cols-12 relative overflow-hidden">
        <div className=" col-span-6 ">
          <div className="flex flex-col pt-[22px] pl-[15px] pb-4 w-full">
            <div className="w-[3.75rem] pb-2 relative text-[0.75rem] font-inter text-[#b2b2b2] text-left inline-block">
              {traders ? traders : 0} traders
            </div>
            <div className="w-[90%] relative text-[0.875rem] pb-7 font-medium font-inter text-white text-left inline-block">
              {postData?.question}
            </div>
            <div className="flex gap-9">
              <div className="w-[126px]  cursor-not-allowed  flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#dbe7ff,_#9fc0ff)] box-border h-[2.188rem] text-left text-[0.875rem] text-[#006DFF] font-inter border-[1px] border-solid border-[#C5DEFF]">
                <div className=" font-medium">Yes</div>
                <img
                  className=" rounded-[91px] w-[0.813rem] h-[0.813rem] object-cover"
                  alt=""
                  src="https://i.imgur.com/LeWoECY.png"
                />
                <div className=" font-medium">
                  {postData?.bet_cost_yes / 100000000}
                </div>
              </div>

              <div className="w-[126px]  cursor-not-allowed flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#f9e2df,_#ffb3a9)] box-border h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-[#fc0101] font-inter border-[1px] border-solid border-[#ffdbdb]">
                <div className=" font-medium">No</div>
                <img
                  className=" rounded-[91px] w-[0.813rem] h-[0.813rem] object-cover"
                  alt=""
                  src="https://i.imgur.com/LeWoECY.png"
                />
                <div className=" font-medium">
                  {postData?.bet_cost_no / 100000000}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" col-span-6 relative">
          <div className="relative">
            <img
              src="https://i.imgur.com/k1MI32F.png"
              alt=""
              className="absolute z-10 object-cover right-0 w-[224px]"
            />
            <div className="w-[18.25rem] right-3 relative text-[3.188rem] font-bebas-neue text-[#ffffff29] text-left inline-block">
              <p className="m-0">this bet has been</p>
              <p className="m-0">ended</p>
            </div>
            <div className="w-[128px] absolute left-[180px] top-16 rounded-[3px] bg-[#ACFF43D4] box-border h-[1.938rem] overflow-hidden text-left text-[0.75rem] text-[#1F3800] font-inter border-[1px] border-solid border-[#4C4C4C33]">
              <div className="absolute top-[0.3rem] left-[0.275rem] font-semibold">
                {postData.yes_bets.length} Won {postData.no_bets.length} Lost
              </div>
            </div>

            <div className="w-[128px] left-[170px] top-24 relative rounded-[3px] bg-[#5f2f93] box-border h-[1.938rem] overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]">
              <div className="absolute top-[0.5rem] left-[0.875rem] font-semibold">
                View Winners
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedBets;
