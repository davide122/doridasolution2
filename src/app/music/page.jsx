"use client"
import { useEffect } from "react";
import MainContent from "../../components/DoridaMusic/MainContent";
import Player from "../../components/DoridaMusic/Player";
import Playlist from "../../components/DoridaMusic/Playlist";
import MyNavbar from "../../components/navbar/MyNavbar";

export default function doridamusic() {
  useEffect(() => {
    const warnMessage = "ATTENZIONE: Questa console è monitorata. L'abuso sarà perseguito.";
    const cssWarning = 'background: red; color: white; font-size: 16px;';

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    console.clear()

    console.log = function(...args) {
      originalLog('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalLog(...args);
      const noop = () => {};
      const warnUser = () => console.warn('%c' + warnMessage, cssWarning);
  
     
        console.log = console.info = console.debug = warnUser;
        console.error = console.warn = noop; 
   

    };

    console.error = function(...args) {
      originalError('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalError(...args);
      const noop = () => {};
    const warnUser = () => console.warn('%c' + warnMessage, cssWarning);

   
      console.log = console.info = console.debug = warnUser;
      console.error = console.warn = noop; 


    };

    console.warn = function(...args) {
      originalWarn('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalWarn(...args);
      const noop = () => {};
      const warnUser = () => console.warn('%c' + warnMessage, cssWarning);
  
     
        console.log = console.info = console.debug = warnUser;
        console.error = console.warn = noop; 

    };

   
  }, []);
    return (
        <div className="dorida-music">
        <MyNavbar></MyNavbar>
  
    
        <div className=" ">
          <MainContent />
        </div>
          <Playlist></Playlist>
  
    
        <Player/>
      </div>
    );
  }
  