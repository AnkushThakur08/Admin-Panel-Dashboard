import React from 'react';

// Context
import { useStateContext } from '../contexts/ContextProvider';

const Header = ({ category, title, data }) => {
  // Context
  const { currentMode } = useStateContext();

  return (
    <div className=" mb-10">
      <p
        className={`text-lg ${
          currentMode === 'Dark' ? 'text-white' : 'text-gray-400'
        } `}
      >
        {category}
      </p>

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
      <p
        className={`text-3xl font-extrabold tracking-tight ${
          currentMode === 'Dark' ? 'text-white' : 'text-slate-900'
        } `}
      >
        {title}
      </p>
    </div>
  );
};

export default Header;
