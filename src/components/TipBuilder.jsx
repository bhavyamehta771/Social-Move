import React,{useState,useEffect} from 'react'
import BackgroundImageDiv from './BGImageDiv';
import { Context } from "../context/ContextProvider";


const TipBuilder = ({ _index, popup ,reload }) => {
  const [_tip, set_tip] = useState(0);
  const { data, account, connected, tipBuilder, setReload } =
    React.useContext(Context);
  return (
    <div className="relative  w-[370px] h-[200px] flex flex-col">
      <BackgroundImageDiv
        classs={""}
        imageUrl={"https://i.imgur.com/oCHPvtW.png"}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <b className="w-[90%] mb-7 flex justify-center items-center relative text-[1.125rem] font-inter text-white text-left">
            Fund To Build
          </b>
          <div className="flex gap-4">
            <input
              value={_tip}
              onChange={(e) => {
                set_tip(e.target.value);
              }}
              className="w-[115px] p-3 relative rounded-sm bg-[#250E3E] h-[2.188rem] overflow-hidden text-left text-[1.25rem] text-white font-inter"
              type="number"
            />
            <div
              onClick={async() => {
               await tipBuilder(_index, _tip);
                              setReload(true);
                              popup((prev)=>{prev+1})
              }}
              className="w-[52px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 relative rounded-sm bg-[#006DFF] h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-white font-inter"
            >
              <b className="absolute top-[0.563rem] left-[0.5rem]">Send</b>
            </div>
          </div>
        </div>
      </BackgroundImageDiv>
    </div>
  );
};

export default TipBuilder
