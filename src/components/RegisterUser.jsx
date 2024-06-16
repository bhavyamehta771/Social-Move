import React, { useState, useRef } from "react";
import Loader from "./Loader";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  useWallet,
  // InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import axios from "axios";


const RegisterUser = ({reload}) => {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
    const { account, signAndSubmitTransaction } = useWallet();
    const moduleAddress =
      "0x116937f3f1cf778efb0c6c4315e8e0bbb3be6fa3e6430192f7f2b0cba30c8976";

    const [selectedImage, setSelectedImage] = useState(null);
    const [spinner, setSpinner] = useState(false);
        const [hide, setHide] = useState(false)
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
     const [fullName, setFullName] = useState("");
     const [username, setUsername] = useState("");
  const [interests, setInterests] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  


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
      const handleImageClick = () => {
        fileInputRef.current.click();
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
     const handleInterestsChange = (event) => {
       const value = event.target.value;
       const interestsArray = value.split(",").map((item) => item.trim());
       setInterests(interestsArray);
     };
    
    // blockchain
    const addNewList = async (pic) => {

         setSpinner(true)
        if (!account) {
            console.log("not connected")
            setSpinner(false)
            return []
        }

       const transaction = {
         data: {
           function: `${moduleAddress}::Messaging13::register_user`,
           functionArguments: [
             fullName,
             username,
             pic,
             interests,
           ],
         },
       };
       try {
         // sign and submit transaction to chain
         const response = await signAndSubmitTransaction(transaction);
         console.log(response);
         // wait for transaction
         await aptos.waitForTransaction({ transactionHash: response.hash });
           setSpinner(false);
           setHide(true)
           reload((prev) => {
               return prev+1
           })

       } catch (error) {
                  setSpinner(false);

       }
     };

  return (
    <div className={`bg-black w-[342px] min-h-[425px] relative flex flex-col pt-[34px] pl-[31px] pb-[70px] pr-[31px] ${hide?'hidden':''} `} >
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
      {/* loader end*/}

      <div className="w-[6rem] pb-[6px] relative text-[1.375rem] font-semibold font-inter text-white text-left inline-block">
        Join now
      </div>
      <div className="w-[12.625rem] pb-7 relative text-[0.75rem] font-inter text-white text-left inline-block">
        Explore the world and earn rewards
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full  relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2 placeholder:text-gray-400 font-inter"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2 placeholder:text-gray-400 font-inter"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Interests"
          value={interests.length > 0 ? interests.join(", ") : ""}
          onChange={handleInterestsChange}
          className="w-full  relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2 placeholder:text-gray-400 font-inter"
        />
      </div>
      <div
        className=" my-4
          "
      >
        <img
          onClick={handleImageClick}
          src="https://i.imgur.com/UZVnkAt.png"
          alt=""
        />
        {/* image and submit */}
        <div className="flex justify-between px-4 pb-6 items-center">
          <div className=" cursor-pointer">
            {/* <img
              className=" w-[26px] object-cover  "
              src={`${!selectedImage ? "https://i.imgur.com/lfZjBZs.png" : ""}`}
              alt=""
            /> */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div
          onClick={async() => {
            
            setSpinner(true);
            let url=await handleImageGen2();
            addNewList(url);
        
            
          }}
          className="w-[181px] mx-auto cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[97px] bg-[#1D9BF0] box-border h-[2.063rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-t-[1px] border-solid border-[#A1C2FF] border-r-[1px] border-l-[1px]"
        >
          <div className="font-semibold">Register</div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser
