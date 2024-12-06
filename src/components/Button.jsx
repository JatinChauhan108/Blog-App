import React from 'react'

function Button({
    children,                                                                                               // the name doesn't necessarily have to be children, it can be anything (like buttonText, etc.)
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props                                                                                                // remaining props passed are stored as key value pairs (i.e., object) in the variable props
                                                                                                            // the object props is spread below to get the attributes with their name and value in the <button> tag
}) {
  console.log(props);
  
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>                          
        {children}
    </button>
  )
}

export default Button