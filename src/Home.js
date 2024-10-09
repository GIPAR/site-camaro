import React from 'react';
import Navbar from './Navbar';
import MyChatBot from './MyChatBot';
import "./Home.css";

// Importar imagens
import passo1 from './img/passo1.png';
import passo2 from './img/passo2.png';
import passo3 from './img/passo3.png';

function Home() {
  return (
    <div>
      <Navbar />
      <div className='title'>
        <h2 className='text-center my-3'>Como Utilizar a Plataforma</h2>
      </div>
      <div className="home-container d-flex justify-content-between">
        <div id="carouselExampleCaptions" className="carousel slide w-75" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={passo1} className="d-block w-50 mx-auto" alt="Passo 1"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Passo 1</h5>
                <p>Descrição do passo 1.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={passo2} className="d-block w-50 mx-auto" alt="Passo 2"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Passo 2</h5>
                <p>Descrição do passo 2.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={passo3} className="d-block w-50 mx-auto" alt="Passo 3"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Passo 3</h5>
                <p>Descrição do passo 3.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="chatbot-container ms-3">
          <MyChatBot />
        </div>
      </div>
    </div>
  );
}

export default Home;
