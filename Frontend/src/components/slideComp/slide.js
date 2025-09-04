import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './slide.css';

function Slide() {
  return (
    <div className='car'>
      <Carousel interval={4000} pause='hover' keyboard aria-label="Diaporama offres et messages clés">
        <Carousel.Item>
          <img
            style={{ height: '55vh', objectFit: 'cover' }}
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/assets/images/AA.jpg`}
            alt="Location de voitures - large choix"
            loading="lazy"
          />
          <Carousel.Caption>
            <h3>Réservez votre voiture en quelques clics</h3>
            <p>Large choix: citadine, berline, SUV… au meilleur prix.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: '55vh', objectFit: 'cover' }}
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/assets/images/AA.jpg`}
            alt="Paiement en ligne sécurisé"
            loading="lazy"
          />
          <Carousel.Caption>
            <h3>Paiement en ligne sécurisé</h3>
            <p>Stripe Checkout • Confirmation immédiate</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: '55vh', objectFit: 'cover' }}
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/assets/images/AA.jpg`}
            alt="Support client 24/7"
            loading="lazy"
          />
          <Carousel.Caption>
            <h3>Support client 24/7</h3>
            <p>WhatsApp: 06 61 11 88 85 • Assistance dédiée</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;
