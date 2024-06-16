import React,{useEffect} from 'react'

const Recieve = ({ d }) => {
    useEffect(() => {
      console.log("Recieve",d)
    
      
    }, [])
    
  return (
      <div key={d} className=" w-full mb-3
    ">
      <div className="w-[346px] p-3 relative rounded-[14px] bg-[#210a3ba8] box-border  overflow-hidden text-left text-[0.938rem] text-white font-inter border-[1px] border-solid border-[#210343]">
        <div className="  inline-block w-[90%]">
         {d.message}
        </div>
        <div className=" text-[#666666] pt-1 w-full flex justify-end">{d.time}</div>
      </div>
    </div>
  );
}

export default Recieve
