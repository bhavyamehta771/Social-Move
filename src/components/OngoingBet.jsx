/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import BackgroundImageDiv from "./BGImageDiv";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";


const OngoingBet = ({ postData, index }) => {
  const navigate = useNavigate();
   const { data, account, connected, read, setReload, placeBet } =
     React.useContext(Context);
  // const [daysLeft, setDaysLeft] = useState(null);
  const [traders, setTraders] = useState(null)
  const [daysDifference, setDaysDifference] = useState(null)


   const calculateDaysDifference = (p) => {
     const currentDate = new Date();
     const targetDate = new Date(p);

     // Calculate the difference in time
     const timeDifference = targetDate.getTime() - currentDate.getTime();

     // Calculate the difference in days
     const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

     setDaysDifference(daysDifference);
  };
  
  function sumOfArrayLengths(array1, array2) {
    // Get the lengths of both arrays
    const length1 = array1.length;
    const length2 = array2.length;

    // Sum the lengths
    const totalLength = length1 + length2;

    // Return the sum
    setTraders(totalLength)
  }
  
  useEffect(() => {
    console.log(postData, index);

    calculateDaysDifference(postData.end_time);
    sumOfArrayLengths(postData.no_bets, postData.yes_bets);
  
    
  }, [data])
  
  return (
    <div
      onClick={() => {
        navigate(`/betview?index=${postData.question_id}`);
      }}
      className="w-full mb-4 relative rounded-md [background:linear-gradient(104.17deg,_#5f2f93,_#1d0e2d)] box-border  overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]"
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
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  await placeBet(postData.question_id, true);
                  setReload((prev) => prev + 1);
                }}
                className="w-[126px]  z-30 cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#dbe7ff,_#9fc0ff)] box-border h-[2.188rem] text-left text-[0.875rem] text-[#006DFF] font-inter border-[1px] border-solid border-[#C5DEFF]"
              >
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

              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  await placeBet(postData.question_id, false);
                  setReload((prev) => prev + 1);
                }}
                className="w-[126px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#f9e2df,_#ffb3a9)] box-border h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-[#fc0101] font-inter border-[1px] border-solid border-[#ffdbdb]"
              >
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
              src="https://i.imgur.com/epVNhrn.png"
              alt=""
              className="absolute rotate-6 z-10 top-[-21px] w-[384px] right-[-20px] h-[246px] object-fill "
            />
            <div className="flex flex-col gap-2 justify-center h-full">
              <div className="w-[128px] top-3 pl-1 right-3 relative flex items-center justify-start shadow-[1px_1px_1.6px_rgba(0,_0,_0,_0.37)] rounded-[3px] bg-[#1c61bf] box-border h-[1.938rem] overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]">
                <div className=" font-semibold">
                  {postData ? daysDifference : 0} DAYS LEFT
                </div>
              </div>

              <div className="relative top-4 right-6 w-[136px] h-[31px]">
                <BackgroundImageDiv
                  classs={""}
                  imageUrl={"https://i.imgur.com/QVv73cB.png"}
                >
                  <div className="w-full flex items-center pl-1 relative shadow-[1px_1px_1.6px_rgba(0,_0,_0,_0.37)] rounded-[3px] bg-darkslateblue box-border h-[1.938rem] overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]">
                    <div className=" font-semibold">
                      Volume{" "}
                      {postData
                        ? (Number(postData.total_no_bets) +
                            Number(postData.total_yes_bets)) /
                          100000000
                        : 0}
                    </div>
                  </div>
                </BackgroundImageDiv>
              </div>

              <div className="w-[136px] top-5 right-8 relative shadow-[1px_1px_1.6px_rgba(0,_0,_0,_0.37)] rounded-[3px] bg-[#5f2f93] box-border h-[1.938rem] overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]">
                <div className="absolute top-[0.4rem] left-[0.575rem] font-semibold">
                  Traders- {traders ? traders : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingBet;
