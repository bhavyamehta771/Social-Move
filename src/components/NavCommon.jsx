import React from 'react'
import { Layout, Row, Col, Button } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import BackgroundImageDiv from './BGImageDiv';
import Logo from './Logo';
import "./css/NavHome.css";
import { Context } from "../context/ContextProvider";



const NavCommon = () => {
  const { data } = React.useContext(Context);

  return (
    <div>
      <div className="w-full min-h-[65px] bg-black grid grid-cols-12 gap-2 m-0 p-0">
        <div className="  col-span-2">
          <Logo />
        </div>
        <div className="  col-span-7 h-full">
          <div className="flex items-center h-full px-[48px] gap-3">
            {/* search */}
            <div className="search relative">
              <form className="form">
                <button>
                  <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                  >
                    <path
                      d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <input
                  className="inputNav"
                  placeholder="Search"
                  required=""
                  type="text"
                />
                <button className="reset" type="reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* 3rd column */}
        <div className="  col-span-3">
          <div className="flex h-full items-center justify-around py-4 w-full">
            <div className="relative w-[142px] h-[39px]">
              <BackgroundImageDiv
                classs={" relative"}
                imageUrl="https://i.imgur.com/U5K8L6O.png"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div className="min-w-[1.813rem] relative text-[1rem] font-medium font-inter text-white text-left inline-block">
                    {data.get_user_profile
                      ? data.get_user_profile[0].tokens / 100000000
                      : 0}
                  </div>
                </div>
              </BackgroundImageDiv>
            </div>

            <div
              className=" w-[136px] h-[39px]
                  "
            >
              {/* <img
                className="w-full object-cover h-full"
                src="https://i.imgur.com/TVug9lA.png"
                alt=""
              /> */}
              <Layout>
                <Row align="middle">
                  <Col
                    span={12}
                    style={{
                      textAlign: "right",
                      backgroundColor: "black",
                      paddingRight: "200px",
                    }}
                  >
                    <WalletSelector />
                  </Col>
                </Row>
              </Layout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavCommon;
