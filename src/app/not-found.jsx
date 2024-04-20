"use client"
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './page.module.css'; // Assicurati di creare questo file CSS
import  "../../styles/style.css";
import Link from 'next/link';

const Custom404 = () => {
  return (
    
    <Container fluid className={styles.mainContainer + " d-flex vh-100"}>
      <Row className="m-auto align-self-center w-100">
        <Col md={8} className="text-center mx-auto">
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorMessage}>Oops! La pagina è evaporata.</h2>
          <p className={styles.description}>
            Sembrava così reale, così bella, così tangibile... ma alla fine era solo un miraggio.
            Forse cercavi qualcosa di reale? Torna alla <Link href="/" className='text-decoration-none'>homepage</Link> e cerca di capire cosa volevi fare.
          </p>
        </Col>
      </Row>
	

    </Container>
  );
}

export default Custom404;
