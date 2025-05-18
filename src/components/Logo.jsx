import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div>
      <img 
        src="/logo2-removebg-preview.png" 
        alt="BlogApp Logo"
        width={width}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://static-00.iconduck.com/assets.00/naruto-icon-2048x2048-xhu402rm.png";
        }}
      />
    </div>
  )
}

export default Logo