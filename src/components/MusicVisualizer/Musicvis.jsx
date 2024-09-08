"use client"

import { Container } from "react-bootstrap"
import Playlist from "../../components/DoridaMusic/Playlist"
import Link from "next/link"
const music = () => {
    return(
      <div className="vh-80 d-flex flex-column justify-content-center align-items-center">
      <Container>
        <div className="row text-center">
          <div className="col-12 mb-4">
            <h1 className="Title text-white display-4 text-start mb-5">Vuoi diventare un artista di successo?</h1>
          </div>
          <div className="col-12 playlistout mt-2 justify-content-center ">
            <Playlist />
            <div className="w-100 justify-content-center d-flex align-items-center">
            <Link passHref href={"/createsongs"} className="Call-Button text-decoration-none">Crea la tua canzone</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
    ) 
}
export default music