import React from 'react';

const Header = ({ category, title, data }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>

    {/* {data.length > 0
      ? data.map((IndividualData, index) => {
          console.log(IndividualData);
          return (
            <>
              <p className="text-lg text-gray-400">
                {IndividualData.firstName}
              </p>
              <p className="text-lg text-gray-400">{IndividualData.lastName}</p>
            </>
          );
        })
      : ''} */}

    {/* <p className="text-lg text-gray-400">{firstName}</p>
    <p className="text-lg text-gray-400">{lastName}</p> */}
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
