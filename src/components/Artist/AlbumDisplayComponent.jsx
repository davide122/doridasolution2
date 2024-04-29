import { Image } from "react-bootstrap";

function AlbumDisplayComponent({ albums, onAlbumSelect }) {
    return (
      <div className="album">
        <ul>
          {albums.map((album) => (
            <li key={album.id} className="albumphoto rounded-3 d-flex" onClick={() => onAlbumSelect(album.album_id)}>
<Image
src={album.cover_url}
alt="Album cover"
className="img-fluid rounded-4"
width={500}
height={500}
/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default AlbumDisplayComponent;
  