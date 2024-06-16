import React, { useState, useRef } from "react";
import Loader from './Loader';
import "./css/PostPopup.css"
import { Context } from "../context/ContextProvider";
import axios from "axios";



const PostPopup = ({ run }) => {

  const { PostMeme } = React.useContext(Context);
  
  
    const [spinner, setSpinner] = useState(false);
    const [caption, setCaption] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null)


  const fileInputRef = useRef(null);
  
  const handleImageGen2 = async () => {
    setSpinner(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "http://127.0.0.1:5000/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data.link_preview);

      setImgUrl(response.data.link_preview);

      // handleUpload();
      setSpinner(false);
      return response.data.link_preview;
    } catch (error) {
      setSpinner(false);

      console.error("Error sending POST request:", error);
    }
  };

     const handleFileChange = (event) => {
       const file = event.target.files[0];
       setImage(file);
       if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
           setSelectedImage(e.target.result);
         };
         reader.readAsDataURL(file);
       }
    };

      const handleImageClick = () => {
        fileInputRef.current.click();
      };
    

  return (
    <div className=" bg-black overflow-auto w-[537px] rounded-xl border-[1px] border-solid border-[#414141]">
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

      {/* Input Post
       */}
      <div className="flex flex-col p-1">
        <div className="flex gap-2 pb-[24px]">
          <div
            onClick={() => {
              
              run(false);
            }}
            className=" cursor-pointer hover:scale-125 hover:opacity-80 transition-all duration-200"
          >
            <img
              className=" w-6 h-6 object-cover"
              src="https://i.imgur.com/XmfPZvg.png"
              alt=""
            />
          </div>
          {/* <div className="w-[5.813rem] relative text-[1.125rem] font-medium font-inter text-white text-left inline-block">
            Meme Gen
          </div> */}
        </div>

        {/* first input
         */}
        <div className="relative pb-[130px]">
          <div className="input-group relative mx-auto w-[90%]">
            <input
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              required=""
              type="text"
              name="text"
              autoComplete="off"
              className="inputPost  w-[90%] mx-auto "
            />
            <label className="user-label">{`What's on your mind?`}</label>
          </div>
        </div>
        <div className="relative  pb-[21px] ">
          <div className="w-full top-3 absolute z-[0] box-border h-[0.63rem] border-t-[2px] border-solid border-[#374151]" />
          <div className="w-[113px] left-5 relative rounded-[38px] bg-[#374151] box-border h-[1.625rem] overflow-hidden text-left text-[0.75rem] text-white font-inter border-[1px] border-solid border-[#374151]">
            <div className="absolute top-[0.313rem] left-[1rem]">
              Add Hashtags
            </div>
          </div>
        </div>

        {/* text area */}
        <div className=" p-3 pb-8 ">
          <textarea
            className="bg-black w-full p-4 min-h-20 text-white border border-[#374151] box-border placeholder-gray-500"
            placeholder="Enter your text here"
            name="hash"
            id="hash"
          ></textarea>
        </div>
        {/* image and submit */}
        <div className="flex justify-between px-4 pb-6 items-center">
          <div className=" cursor-pointer">
            <img
              className=" w-[26px] object-cover  "
              src={`${!selectedImage ? "https://i.imgur.com/lfZjBZs.png" : ""}`}
              alt=""
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="*"
              onChange={handleFileChange}
            />
          </div>
          <div onClick={async () => {
            setSpinner(true);
            let url=await handleImageGen2();
            PostMeme(caption, url, setSpinner);
          }} className="w-[81px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[97px] bg-[#1D9BF0] box-border h-[2.063rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-t-[1px] border-solid border-[#A1C2FF] border-r-[1px] border-l-[1px]">
            <div className="font-semibold">Post</div>
          </div>
        </div>
        {/* <img
            src={selectedImage || ""}
            alt="Selected"
            className={`cursor-pointer w-[90%] mx-auto object-cover ${
              selectedImage ? "" : "hidden"
            }`}
          /> */}
      </div>
    </div>
  );
}

export default PostPopup
