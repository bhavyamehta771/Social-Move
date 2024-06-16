import React, { useState, useRef } from "react";
import "./css/CreateMemePopup.css";
import Loader from "./Loader";
import { Context } from "../context/ContextProvider";

import axios from "axios";

const CreateMemePopup = ({run}) => {
  const [activeButton, setActiveButton] = useState("IMG TO IMG");
  const [videoPrompt, setVideoPrompt] = useState('')
  const [isImg, setIsImg] = useState(null)
  const [animePrompt, setAnimePrompt] = useState('')
    const [image, setImage] = useState(null);
  const [resultImg, setResultImg] = useState(null)
  const [resultImgDL, setResultImgDL] = useState(null)
  const [resultVid, setResultVid] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
  const [spinner, setSpinner] = useState(false)
  
  const { PostMeme, genAi } = React.useContext(Context);

   const [reRender, setReRender] = useState(false);

   React.useEffect(() => {
     // Set up an interval to update the reRender state every 15 seconds
     const interval = setInterval(() => {
       setReRender((prev) => !prev); // Toggle the reRender state
     }, 14000);

     // Clean up the interval on component unmount
     return () => clearInterval(interval);
   }, []);

     
    const handleImageToMeme= async () => {
      setSpinner(true);

      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("prompt", '');

        const response = await axios.post(
          "http://127.0.0.1:5000/uploadphoto",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response", response.data);

        setResultImg(response.data.link_preview);
        setResultImgDL(response.data.link_download);

        // handleUpload();
        setSpinner(false);
        return response.data.link_preview;
      } catch (error) {
        setSpinner(false);

        console.error("Error sending POST request:", error);
      }
  };
  
   const handlePromptToVideo = async () => {
     setSpinner(true);

     try {
       

       const response = await axios.post("http://127.0.0.1:5000/video", {
         prompt: videoPrompt,
       });
       console.log("response", response.data);

       setResultImg(response.data.link_preview);
       setResultImgDL(response.data.link_download);

       // handleUpload();
       setSpinner(false);
       return response.data.link_preview;
     } catch (error) {
       setSpinner(false);

       console.error("Error sending POST request:", error);
     }
  };
  
    const handlePromptToAnime = async () => {
      setSpinner(true);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/imgen",
          {
            prompt: animePrompt,
          }
        );
        console.log("response", response.data);

        setResultImg(response.data.link_preview);
        setResultImgDL(response.data.link_download);

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
    
     const handleVideoInputChange = (event) => {
       setVideoPrompt(event.target.value);
     };
    
     const handleAnimeInputChange = (event) => {
       setAnimePrompt(event.target.value);
    };
    
    function handleVideoSubmit() {
        console.log("video prompt",videoPrompt)
    }

     function handleAnimeSubmit() {
       console.log("anime prompt", animePrompt);
    }
    
    const handleKeyPressV = (event) => {
      if (event.key === "Enter") {
        handleVideoSubmit();
      }
    };
     const handleKeyPressA = (event) => {
       if (event.key === "Enter") {
         handleAnimeSubmit();
       }
     };

  const renderContent = () => {
    switch (activeButton) {
      case "IMG TO IMG":
            return (
              <>
                <div className="flex flex-col gap-20 w-full">
                  <img
                    src={`${
                      !selectedImage ? "https://i.imgur.com/5HofRMD.png" : ""
                    }`}
                    alt="Upload"
                    className={`cursor-pointer w-[90%] mx-auto object-cover ${
                      !selectedImage ? "" : "hidden"
                    }`}
                    onClick={handleImageClick}
                  />
                  <img
                    src={selectedImage || ""}
                    alt="Selected"
                    className={`cursor-pointer w-[90%] mx-auto object-cover ${
                      selectedImage ? "" : "hidden"
                    }`}
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className=" pt-[52px] w-full flex justify-center items-start">
                  <div
                    onClick={async () => {
                      let c = await genAi();
                      if (c) {
                        
                        handleImageToMeme()
                      }
                    }}
                    className="w-[146px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center  items-center  relative shadow-[-7px_7px_15.7px_rgba(0,_0,_0,_0.19)] rounded-md bg-[#6f19d42e] box-border h-[2.875rem] overflow-hidden text-center text-[1.438rem] text-white font-inter border-[3px] border-solid border-[#623098]"
                  >
                    <div className=" leading-[1.25rem] font-medium">
                      Generate
                    </div>
                  </div>
                </div>
              </>
            );
      case "VIDEO MEME":
            return (
              <div className="w-full">
                <div className=" w-full flex items-center justify-center">
                  <input
                    placeholder="Enter the prompt"
                    type="text"
                    name="text"
                    value={videoPrompt}
                    onChange={handleVideoInputChange}
                    className="input mx-auto"
                    onKeyDown={handleKeyPressV}
                  ></input>
                </div>
                <div
                  onSubmit={handleVideoSubmit}
                  onClick={handleVideoSubmit}
                  className=" pt-[52px] w-full flex justify-center items-start"
                >
                  <div
onClick={async () => {
                      let c = await genAi();
                  if (c) {handlePromptToVideo() }
                    }}
                    className="w-[146px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center  items-center  relative shadow-[-7px_7px_15.7px_rgba(0,_0,_0,_0.19)] rounded-md bg-[#6f19d42e] box-border h-[2.875rem] overflow-hidden text-center text-[1.438rem] text-white font-inter border-[3px] border-solid border-[#623098]"
                  >
                    <div className=" leading-[1.25rem] font-medium">
                      Generate
                    </div>
                  </div>
                </div>
              </div>
            );
      case "ANIME OP":
        return (
          <div className="w-full">
            <div className=" w-full flex items-center justify-center">
              <input
                placeholder="Enter the prompt"
                type="text"
                name="text"
                value={animePrompt}
                onKeyDown={handleKeyPressA}
                onChange={handleAnimeInputChange}
                className="input mx-auto"
              ></input>
            </div>
            <div className=" pt-[52px] w-full flex justify-center items-start">
              <div
                onClick={async () => {
                  let c = await genAi();
                  if (c) { handlePromptToAnime() }
                }}
                className="w-[146px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center  items-center  relative shadow-[-7px_7px_15.7px_rgba(0,_0,_0,_0.19)] rounded-md bg-[#6f19d42e] box-border h-[2.875rem] overflow-hidden text-center text-[1.438rem] text-white font-inter border-[3px] border-solid border-[#623098]"
              >
                <div className=" leading-[1.25rem] font-medium">Generate</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

   React.useEffect(() => {
     // Assuming you have a function that processes the video and returns the processed URL
     const processVideo = async (url) => {
       // Mock processing time
       setSpinner(true)
       await new Promise((resolve) => setTimeout(resolve,30000));
       setSpinner(false);

       return url; // Return the processed video URL
     };

     // Process the video URL if it's not a JPG image
     if (
       resultImg &&
       resultImg.slice(((resultImg.lastIndexOf(".") - 1) >>> 0) + 2) !== "jpg"
     ) {
       processVideo(resultImg).then((processedUrl) => {
         setResultVid(processedUrl);
       });
     }
   }, [resultImg]);
  return (
    <div className=" bg-black rounded-xl border-[1px] border-solid border-[#414141]">
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
      <div className="p-[7px] flex flex-col w-[537px] pb-6 rounded-md">
        <div className="flex gap-2 pb-[22px]">
          <div
            onClick={() => {
              setResultImg(null);
              setAnimePrompt("");
              setVideoPrompt("");
              setSelectedImage(null);
              setResultVid(null);
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
          <div className="w-[5.813rem] relative text-[1.125rem] font-medium font-inter text-white text-left inline-block">
            Meme Gen
          </div>
        </div>

        {!resultImg ? (
          <div className="flex flex-col">
            <div className="flex pl-7 gap-[18px]">
              {/* img to img */}
              <div
                onClick={() => setActiveButton("IMG TO IMG")}
                className={`w-[147px] _0px_#acff43] rounded-[7px] 
                ${
                  activeButton === "IMG TO IMG"
                    ? "bg-[#ACFF43] text-black border-[#396600]"
                    : "bg-[#081E20] cursor-pointer border-[#396600] text-white hover:scale-105 hover:opacity-80 transition-all duration-200"
                } flex items-center justify-center  relative shadow-[0px_0px_0px_#acff43] rounded-[7px]  box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]  font-inter border-[3px] border-solid `}
              >
                <b className="">IMG TO IMG</b>
              </div>
              {/* video meme */}
              <div
                onClick={() => setActiveButton("VIDEO MEME")}
                className={`w-[147px] _0px_#acff43] rounded-[7px] 
                ${
                  activeButton === "VIDEO MEME"
                    ? "bg-[#ACFF43] text-black border-[#396600]"
                    : "bg-[#081E20] cursor-pointer border-[#396600] text-white hover:scale-105 hover:opacity-80 transition-all duration-200"
                } flex items-center justify-center  relative shadow-[0px_0px_0px_#acff43] rounded-[7px]  box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]  font-inter border-[3px] border-solid `}
              >
                <b className="">VIDEO MEME</b>
              </div>

              {/* anime meme */}
              <div
                onClick={() => setActiveButton("ANIME OP")}
                className={`w-[147px] _0px_#acff43] rounded-[7px] 
                ${
                  activeButton === "ANIME OP"
                    ? "bg-[#ACFF43] text-black border-[#396600]"
                    : "bg-[#081E20] cursor-pointer border-[#396600] text-white hover:scale-105 hover:opacity-80 transition-all duration-200"
                } flex items-center justify-center  relative shadow-[0px_0px_0px_#acff43] rounded-[7px]  box-border h-[3.063rem] overflow-hidden text-left text-[0.875rem]  font-inter border-[3px] border-solid `}
              >
                <b className="">ANIME OP</b>
              </div>
            </div>

            <div className="mt-4">{renderContent()}</div>
          </div>
        ) : (
          <div className=" flex flex-col w-full ">
            <div className=" pb-[73px] flex items-center justify-center ">
              {resultImg.slice(((resultImg.lastIndexOf(".") - 1) >>> 0) + 2) ==
              "jpg" ? (
                <img
                  className="  h-[266px] bg-no-repeat object-cover "
                  src={
                    resultImg ? resultImg : "https://i.imgur.com/KyofDzs.png"
                  }
                  alt=""
                />
              ) : resultVid ? (
                <video
                  key={reRender}
                  className="h-[266px] object-cover"
                  autoPlay
                  loop
                  src={resultVid}
                  controls
                ></video>
              ) : (
                <p className="text-white">Loading video...</p>
              )}

              {/* <img
                className="  h-[266px] object-cover "
                src={resultImg ? resultImg : "https://i.imgur.com/KyofDzs.png"}
                alt=""
              /> */}
            </div>

            <div className="flex gap-3 pb-7 w-full justify-center">
              <div className="w-[130px]   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center items-center relative rounded-md bg-[#818181] box-border h-[2.313rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-[1px] border-solid border-[#414141]">
                <div className="font-semibold">
                  {" "}
                  <a href={resultImgDL}>Download</a>
                </div>
              </div>
              <div className="w-[130px]   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center items-center relative rounded-md bg-[#818181] box-border h-[2.313rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-[1px] border-solid border-[#414141]">
                <div className="font-semibold">Share</div>
              </div>
              <div
                onClick={async () => {
                  if (resultVid == null) {
                    PostMeme(`*generated by Aptoverse*`, resultImg, setSpinner);
                  } else {
                    PostMeme(`*generated by Aptoverse*`, resultVid, setSpinner);
                  }
                }}
                className="w-[130px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex justify-center items-center relative rounded-md bg-[#818181] box-border h-[2.313rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-[1px] border-solid border-[#414141]"
              >
                <div className="font-semibold">Post</div>
              </div>
            </div>
          </div>
        )}
        {/* input */}
      </div>
    </div>
  );
};

export default CreateMemePopup;
