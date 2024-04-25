import MainContent from "@/components/DoridaMusic/MainContent";
import MusicNavbar from "@/components/DoridaMusic/MusicNavbar";
import Player from "@/components/DoridaMusic/Player";
import Playlist from "@/components/DoridaMusic/Playlist";
import MyNavbar from "@/components/navbar/MyNavbar";

export default function doridamusic() {
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
  