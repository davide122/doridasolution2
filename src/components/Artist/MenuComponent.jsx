import { AiFillHome } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";

function MenuComponent() {
  return (
    <nav className="w-100 mx-3">
      <p className="text-start w-100 fs-6 ms-3">MENU</p>
      <MenuItem icon={<AiFillHome size={40} />} text="Home" />
      <MenuItem icon={<IoMdAnalytics size={40} />} text="Analytics" />
      <MenuItem icon={<BiSolidPlaylist size={40} />} text="Playlist" />
      <MenuItem icon={<MdFavorite size={40} />} text="Favorites" />
    </nav>
  );
}

function MenuItem({ icon, text }) {
  return (
    <div className="MenuCard w-100 d-flex justify-content-start align-items-center rounded-4 px-2 shadow-sm">
      {icon}
      <p className="fs-6 mt-3 ms-3 fw">{text}</p>
    </div>
  );
}

export default MenuComponent;
