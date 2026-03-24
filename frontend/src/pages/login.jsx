import React from 'react';
import background from "../assets/College.jpg";


const colors = {
      primary: "#060606",
      background: "#E0E0E0",
      disbaled : "#D9D9D9"
}

const login = () => {
  return (
    <div className='w-full h-screen flex items-start'>
        <div className='relative w-1/2 h-full flex flex-col'>
         <div className='absolute top-[25%] left-[10%] flex flex-col'>
             <h1></h1>
         </div>
          <img src={background} alt="Background" />
             
        </div>
       
    </div>
  );
}

export default login;
