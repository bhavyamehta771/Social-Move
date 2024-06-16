import React,{useState,useEffect} from 'react'
import BetTrending from '../components/BetTrending';
import BackgroundImageDiv from '../components/BGImageDiv';
import NavCommon from '../components/NavCommon';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import "./css/Betview.css";
import { useLocation } from "react-router-dom";
import { Context } from "../context/ContextProvider";


const BetView = (
  
) => {
   const { data, account, connected, read, setReload, placeBet } =
     React.useContext(Context);
   const location = useLocation();
   const [index, setIndex] = useState(null);
  const [activeButton, setActiveButton] = useState("Crypto");
  const [postData, setPostData] = useState(null)

  const [traders, setTraders] = useState(null);
  const [daysDifference, setDaysDifference] = useState(null);

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
    setTraders(totalLength);
  }

  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const _index = queryParams.get("index");
    if (_index !== null) {
      setIndex(parseInt(_index));
    }
  }, [location.search]);

  // Set post data when index and data are available
  useEffect(() => {
    if (index !== null && data.get_all_questions) {
      const questions = data.get_all_questions[0];
      if (questions && questions[index]) {
        setPostData(questions[index]);
      }
    }
  }, [index, data.get_all_questions]);
  
  

  React.useEffect(() => {
    if (postData) {
      if (postData.answered === false) {
        calculateDaysDifference(postData.end_time);
      }
      sumOfArrayLengths(postData.no_bets, postData.yes_bets);
    }
  }, [postData]);
  
  
  
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
                  <div className="flex cursor-pointer w-full gap-[10px]  items-center  h-12">
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
                  <div className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12">
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
                  <div className="flex cursor-pointer  w-full gap-[10px]  items-center  h-12">
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
            <div
              className={`flex flex-col w-[90%] mx-auto ${
                postData ? "" : "hidden"
              }`}
            >
              <div className="w-[784px] pt-[34px] pb-[22px]">
                <div className="relative w-[784px] min-h-[180px] max-h-max">
                  <BackgroundImageDiv
                    classs={"flex flex-col pl-4 pr-3 pb-3 h-auto rounded-md"}
                    imageUrl="https://i.imgur.com/t7r7lK4.png"
                  >
                    <div className="flex pb-[32px] flex-col pt-[22px] w-full  ">
                      <div className="min-w-[3.75rem] mb-[10px] relative text-[0.75rem] font-inter text-white text-left inline-block">
                        {traders ? traders : 0} traders
                      </div>
                      <div className="w-[80%] relative text-[0.875rem] font-medium font-inter text-white text-left inline-block">
                        {postData?.question}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div
                        onClick={async (e) => {
                          if (postData.answered == false) {
                            await placeBet(postData.question_id, true);
                            setReload((prev) => prev + 1);
                          }
                        }}
                        className="w-[126px] cursor-pointer flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#dbe7ff,_#9fc0ff)] box-border h-[2.188rem] text-left text-[0.875rem] text-[#006DFF] font-inter border-[1px] border-solid border-[#C5DEFF]"
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
                          if (postData.answered == false) {
                            await placeBet(postData.question_id, false);
                            setReload((prev) => prev + 1);
                          }
                        }}
                        className="w-[126px] cursor-pointer flex items-center gap-1  justify-center relative rounded-sm [background:linear-gradient(90deg,_#f9e2df,_#ffb3a9)] box-border h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-[#fc0101] font-inter border-[1px] border-solid border-[#ffdbdb]"
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
                  </BackgroundImageDiv>
                </div>
              </div>

              <div className="w-[784px] p-[10px] relative rounded-md [background:linear-gradient(104.17deg,_rgba(29,_14,_45,_0.29))] box-border h-[29.188rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-[1px] border-solid border-[#4c4c4c33]">
                <div className="grid grid-cols-12 w-full gap-y-3 gap-x-2 ">
                  <div className=" col-span-7 w-[425px] h-[140px] ">
                    <div className="w-[425px] p-1 relative h-[140px] ">
                      <BackgroundImageDiv
                        classs={""}
                        imageUrl={"https://i.imgur.com/n7t2BX1.png"}
                      >
                        <div className="flex flex-col pl-2">
                          <div className="w-[95%] relative text-[2.788rem] font-bebas-neue text-gray text-left inline-block">
                            this bet{" "}
                            {postData && postData.answered ? "ended" : "Ends"}{" "}
                            on
                          </div>
                          <div className="w-[90%] relative text-[1.5rem] font-bebas-neue text-white text-left inline-block">
                            {postData?.end_time}
                          </div>
                          <div className="w-[14.063rem] relative text-[1.5rem] font-bebas-neue text-white text-left inline-block">
                            {postData?.answered == true
                              ? ""
                              : daysDifference + " Days left"}
                          </div>
                        </div>
                      </BackgroundImageDiv>
                    </div>
                  </div>
                  <div className=" col-span-5 ">
                    <img
                      className=" object-fill w-[630px]"
                      src="https://i.imgur.com/EYYSxto.png"
                      alt=""
                    />
                  </div>
                  <div className=" text-white mt-5 relative col-span-5 w-full">
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: "l_id",
                              value: postData?.yes_bets.length,
                              label: "yes",
                            },
                            {
                              id: 1,
                              value: postData?.no_bets.length,
                              label: "no",
                            },
                          ],
                          arcLabel: "label",
                        },
                      ]}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fontWeight: "bold",
                          color: "white",
                        },
                        [`.MuiBarElement-series-l_id`]: {
                          stroke: "white",
                          color: "white",
                        },
                      }}
                      className="text-white"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className=" col-span-7 ">
                    <img src="https://i.imgur.com/WprHb4G.png" alt="" />
                  </div>
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
}

export default BetView
