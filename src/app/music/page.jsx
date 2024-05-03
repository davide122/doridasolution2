"use client";
import { useEffect } from "react";
import MainContent from "../../components/DoridaMusic/MainContent";
import Player from "../../components/DoridaMusic/Player";
import Playlist from "../../components/DoridaMusic/Playlist";
import MyNavbar from "../../components/navbar/MyNavbar";

export default function doridamusic() {
  return (
    <div className="dorida-music">
      <MyNavbar className={"trasparent position-absolute w-100 "}></MyNavbar>

      <div className=" ">
        <MainContent />
      </div>
      <Playlist></Playlist>
    </div>
  );
}
