import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center p-2 justify-around gap-0">
      <div className="img">
        <img className='w-[52px] h-[52px] object-cover ' src="https://i.imgur.com/P4z7hRw.png" alt="" />
      </div>

      <div className="w-[9.5rem] relative text-[2rem] tracking-[-0.04em] font-semibold font-inter text-[#D9D9D9] text-left inline-block [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]">
        AptoVerse
      </div>
    </div>
  );
}

export default Logo
