import React from 'react';
import { Nav, Form, FormControl } from 'react-bootstrap';

const ArtistNavbar = ({ username }) => {
  return (
    <Nav className="d-flex justify-content-between align-items-center p-3 w-100">
      <h2>Salve {username || 'Guest'}</h2>
      <FormControl type="text" className="w-25 Search" placeholder="Search albums, songs..." />
    </Nav>
  );
};

export default ArtistNavbar;
