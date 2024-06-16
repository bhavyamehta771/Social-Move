import React, { useEffect, useState } from "react";
import axios from "axios";
// import { contractABI, contractAddress } from "../utils/AptosverseUtils";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  useWallet,
  // InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";

export const Context = React.createContext();

export const AptosProvider = ({ children }) => {
  // wallet initialization
  const [accountHasList, setAccountHasList] = useState(false);
  const [connected, setConnected] = useState(false)
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const { account, signAndSubmitTransaction } = useWallet();
  const [reload, setReload] = useState(0)
  const [read, setRead] = useState(false);
 const [data, setData] = useState({
   view_all_blogs: null,
   view_all_posts: null,
   get_all_builders_posts: null,
   get_user_profile: null,
   get_user_questions1: null,
   get_completed_questions: null,
   get_ongoing_questions: null,
   get_all_questions: null,
   user_friends:null,
 });
  const moduleAddress =
    "0x116937f3f1cf778efb0c6c4315e8e0bbb3be6fa3e6430192f7f2b0cba30c8976";

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    try {
      const todoListResource = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: `${moduleAddress}::Messaging13::GmbuildersResource`,
      });
      setAccountHasList(true);
      console.log(todoListResource);
      // view function
      try {
        const initialPromises = [
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::view_all_blogs`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::view_all_posts`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::get_all_builders_posts`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::get_completed_questions`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::get_ongoing_questions`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
          aptos.view({
            payload: {
              function: `${moduleAddress}::Messaging13::get_all_questions`,
              typeArguments: [],
              functionArguments: [],
            },
          }),
        ];

        // Check if user is registered
        const isUserRegisteredResult = await aptos.view({
          payload: {
            function: `${moduleAddress}::Messaging13::is_user_registered`,
            typeArguments: [],
            functionArguments: [account.address],
          },
        });
        console.log(isUserRegisteredResult);

        // Initialize an array to hold all promises
        let allPromises = [];
        allPromises.push(...initialPromises);
        // console.log("allpromis init",allPromises)

        if (isUserRegisteredResult[0]) {
          // If user exists, add these promises to the array
          const userSpecificPromises = [
            aptos.view({
              payload: {
                function: `${moduleAddress}::Messaging13::get_user_profile`,
                typeArguments: [],
                functionArguments: [account.address],
              },
            }),
            aptos.view({
              payload: {
                function: `${moduleAddress}::Messaging13::get_user_questions1`,
                typeArguments: [],
                functionArguments: [account.address],
              },
            }),
            aptos.view({
              payload: {
                function: `${moduleAddress}::Messaging13::get_friends`,
                typeArguments: [],
                functionArguments: [account.address],
              },
            }),
          ];

          allPromises.push(...userSpecificPromises);
        }

        // Execute all promises concurrently
        const promiseResults = await Promise.all(allPromises);

        // Assign results to corresponding keys in the data object
        setData((prevData) => ({
          ...prevData,
          view_all_blogs: promiseResults[0],
          view_all_posts: promiseResults[1],
          get_all_builders_posts: promiseResults[2],
          get_completed_questions: promiseResults[3],
          get_ongoing_questions: promiseResults[4],
          get_all_questions: promiseResults[5],
          ...(isUserRegisteredResult && {
            get_user_profile: promiseResults[6],
            get_user_questions1: promiseResults[7],
            user_friends: promiseResults[8],
          }),
        }));
       
        setRead(true);
        setConnected(true);

        console.log("gotcha", data, promiseResults);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } catch (e) {
      setAccountHasList(false);
      console.log(e);
    }
  };


  async function genAi() {
     if (!account) {
       alert("Connect Wallet");
       return [];
     }
     // \end{code}
     const payload = {
       data: {
         function: `${moduleAddress}::Messaging13::gen_image`,
         functionArguments: [],
       },
     };
     try {
       // sign and submit transaction to chain
       const response = await signAndSubmitTransaction(payload);
       console.log(response);
       // wait for transaction
       // \end{code}
       await aptos.waitForTransaction({ transactionHash: response.hash });
       // spinner(false);
       return true;
     } catch (error) {
       // spinner(false);
       console.log(error);
       return false;


     }
  }
  // async function placeBet(index,answer,spin) {
  //   spin(true)
  //   console.log("answer", answer);
  //   if (!account) {
  //     alert('Connect Wallet')
  //     return []
  //   }
  //   const payload = {
  //     data: {
  //       function: `${moduleAddress}::Messaging13::place_bet_question`,
  //       functionArguments: [index,answer],
  //     },
  //   };
  //   try {
  //     // sign and submit transaction to chain
  //     const response = await signAndSubmitTransaction(payload);
  //     console.log(response);
  //     // wait for transaction
  //     await aptos.waitForTransaction({ transactionHash: response.hash });
  //     setReload((prev) => {
  //       return prev + 1;
  //     });
  //     spin(false)
  //   } catch (error) {
  //     spin(false);
  //     console.log(error);
  //   }
  // }

  async function placeBet(index, answer) {
    // spinner(true);
    console.log("answer", answer);
    if (!account) {
      alert('Connect Wallet');
      return [];
    }
    // \end{code} 
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::place_bet_question`,
        functionArguments: [index, answer],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // spinner(false);
    } catch (error) {
      // spinner(false);

      console.log(error);
    }
      
    
  }

  async function tipBuilder(addr, _tip) {
    // spinner(true);
    console.log("tip", _tip);
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const l = String(_tip * 100000000);
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::tip_builders`,
        functionArguments: [addr, l],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // spinner(false);
    } catch (error) {
      // spinner(false);

      console.log(error);
    }
  }

  async function savePost(index) {
    // spinner(true);
    // console.log("tip", _tip);
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::save_post`,
        functionArguments: [index],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // spinner(false);
    } catch (error) {
      // spinner(false);

      console.log(error);
    }
  }

  async function createBuilderPost(
    _project_name,
    _project_description,
    _project_url,
    _demo_video_link,
    _calendly_link,
    _grants_required,
    _reason,
    _telegram_link,
    spinner
  ) {
    spinner(true);
    // console.log("answerString(", ));
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::create_builders_post`,
        functionArguments: [
          String(_project_name),
          String(_project_description),
          String(_project_url),
          String(_demo_video_link),
          String(_calendly_link),
          Number(_grants_required) * 100000000,
          String(_reason),
          String(_telegram_link),
        ],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      spinner(false);
    } catch (error) {
      spinner(false);

      console.log(error);
    }
  }

  async function PostMeme(caption, _img_url, spin) {
    spin(true)
    console.log("caption", caption);
    console.log("imgurl", _img_url);
    if (!account) {
      alert('Connect Wallet')
      return []
    }
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::create_post`,
        functionArguments: [_img_url, caption],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setReload((prev) => {
        return prev + 1;
      });
      spin(false)
    } catch (error) {
      spin(false);

      console.log(error);
    }
    
  }

 async function getUserDataFromAddress(addr) {
    if (!account) {
      alert('Connect Wallet')
      return []
    }

   
   try {
    
      // const todoListResource = await aptos.getAccountResource({
      //   accountAddress: moduleAddress,
      //   resourceType: `${moduleAddress}::SocialMedia11::GmbuildersResource`,
      // });
      // setAccountHasList(true);
     const response = await aptos.view({
       payload: {
         function: `${"0x116937f3f1cf778efb0c6c4315e8e0bbb3be6fa3e6430192f7f2b0cba30c8976"}::Messaging13::get_user_profile`,
         typeArguments: [],
         functionArguments: [addr],
         //    abi:myABI
       },
     });
     console.log("getUserDataFromAddress", response[0]);
     return response[0];
   } catch (e) {
     setAccountHasList(false);
     console.log(e);
   }
  }

  async function recieveMessage(sender, reciever) {
    if (!account) {
      alert("Connect Wallet");
      return [];
    }

    try {
      // const todoListResource = await aptos.getAccountResource({
      //   accountAddress: moduleAddress,
      //   resourceType: `${moduleAddress}::SocialMedia11::GmbuildersResource`,
      // });
      // setAccountHasList(true);
      const response = await aptos.view({
        payload: {
          function: `${"0x116937f3f1cf778efb0c6c4315e8e0bbb3be6fa3e6430192f7f2b0cba30c8976"}::Messaging13::recieve_message`,
          typeArguments: [],
          functionArguments: [sender,reciever],
          //    abi:myABI
        },
      });
      console.log("recieve message", response[0]);
      return response[0];
    } catch (e) {
      setAccountHasList(false);
      console.log(e);
    }
  }

  async function likePost(index) {
    if (!account) {
      alert('Connect Wallet')
      return []
    }
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::like_post`,
        functionArguments: [index],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // setReload((prev) => {
      //   return prev + 1;
      // });
    } catch (error) {
      console.log(error);
    }
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  function formatDate(date) {
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  async function sendMessage(_reciever,_message,) {
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    const now = new Date();
    let _time = formatAMPM(now);
    let _date = formatDate(now);
    const payload = {
      data: {
        function: `${moduleAddress}::Messaging13::send_message`,
        functionArguments: [_reciever,_message,_time,_date],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // setReload((prev) => {
      //   return prev + 1;
      // });
      setReload((prev)=>prev+1)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, [account?.address,reload]);
  // wallet initialization end

  return (
    <Context.Provider
      value={{
        setReload,
        getUserDataFromAddress,
        likePost,
        PostMeme,
        placeBet,
        genAi,
        recieveMessage,
        sendMessage,
        createBuilderPost,
        tipBuilder,
        savePost,
        data,
        account,
        connected,
        read,
      }}
    >
      {children}
    </Context.Provider>
  );
};
