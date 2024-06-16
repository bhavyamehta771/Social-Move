import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import Loader from "../components/Loader";

const CreateBuilders = ({run}) => {
  const { createBuilderPost } = React.useContext(Context);

    const [formData, setFormData] = useState({
      projectName: "",
      demoVideoUrl: "",
      description: "",
      requirements: "",
      fundAmount: 0,
      calendlyLink: "",
      telegramUserName: "",
    });
    const [spinner, setSpinner] = useState(false);


     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prevState) => ({
         ...prevState,
         [name]: value,
       }));
  };
  

  return (
    <div className="bg-[#1a1a1a] overflow-auto w-[537px] rounded-xl border-[1px] border-solid border-[#414141]">
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
      <div className="flex flex-col p-2 gap-4">
        <div className="flex gap-2">
                  <div onClick={() => {
                    run(false)
                  }
          } className="  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200">
            <img
              className="w-6 h-6 object-cover"
              src="https://i.imgur.com/XmfPZvg.png"
              alt=""
            />
          </div>
          <div className="w-[7.813rem] relative text-[1.125rem] font-medium font-inter text-white text-left inline-block">
            Project Details
          </div>
        </div>

        {/* inputs */}
        <div className="grid grid-cols-12 gap-5 w-full">
          <div className=" col-span-6">
            <input
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Project Name"
              type="text"
            />
          </div>
          <div className=" col-span-6">
            <input
              name="demoVideoUrl"
              value={formData.demoVideoUrl}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Demo video url/ Github"
              type="text"
            />
          </div>
          <div className=" col-span-12">
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[6.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Description"
              type="text"
            />
          </div>
          <div className=" col-span-12">
            <input
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Requirements (why you need funds for this project?"
              type="text"
            />
          </div>
          <div className=" col-span-6">
            <input
              name="fundAmount"
              value={formData.fundAmount}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="How much fund in required? (In Numbers)"
              type="text"
            />
          </div>
          <div className=" col-span-6">
            <input
              name="calendlyLink"
              value={formData.calendlyLink}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Your calendly link"
              type="text"
            />
          </div>
          <div className=" col-span-12">
            <input
              name="telegramUserName"
              value={formData.telegramUserName}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-2 relative rounded box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]   text-white placeholder:text-[#ffffff33] font-inter border-[1px] border-solid border-white"
              placeholder="Telegram user name"
              type="text"
            />
          </div>
        </div>
              <div onClick={async() => {
                setSpinner(true);
                await  createBuilderPost(formData.projectName,formData.description,'s',formData.demoVideoUrl,formData.calendlyLink,formData.fundAmount,formData.requirements,formData.telegramUserName, setSpinner);
                setSpinner(false);
                  run(false);

              }
              
        } className="w-[176px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 mx-auto flex items-center justify-center my-10 relative rounded-md bg-[#003985] h-[2.875rem] overflow-hidden text-center text-[1.438rem] text-white font-inter">
          <div className=" leading-[1.25rem] font-medium">{`submit `}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateBuilders;
