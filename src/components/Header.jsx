import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>


{/* {console.log(test, "888899999")}
{test.map((value, index)=>{
   return <p className="text-lg text-gray-400">{value.firstName}</p>
  console.log(value,"88888")
})} */}
 {/* <p className="text-lg text-gray-400">{name}</p> */}
 
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
