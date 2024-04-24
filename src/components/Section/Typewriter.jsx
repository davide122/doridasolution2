"use client"
import React from "react";
const Typewriter = ({ text, speed = 200 }) => {
    const [content, setContent] = React.useState('');
    const index = React.useRef(0);
  
    React.useEffect(() => {
      if (index.current >= text.length) {
        // If we've reached the end of the text, stop setting the content.
        return;
      }
  
      const timeout = setTimeout(() => {
        setContent((c) => c + text.charAt(index.current));
        index.current++;
      }, speed);
  
      return () => clearTimeout(timeout);
    }, [content, text, speed]);
  
    return (
      <div className="typewriter"> 
        <h1>{content}</h1>
      </div>
        
    );
  };
export default Typewriter;
