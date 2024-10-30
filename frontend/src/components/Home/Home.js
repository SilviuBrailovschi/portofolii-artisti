import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page" style={{
            padding: '5rem 10rem',
            textAlign: 'center',
            backgroundImage: "url('/orizont.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            borderRadius: '10px',
            maxWidth: '75%',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
        }}>
            <h1 style={{
                marginBottom: '20px',
                color: '#003d59',
                fontStyle: 'italic'
            }}>
                Expoziția Artiștilor
            </h1>
            <div style={{
                padding: '20px',
                borderRadius: '10px'
            }}>
                <blockquote style={{
                    borderLeft: '2px solid #003d59',
                    margin: '20px 0',
                    paddingLeft: '10px',
                    fontStyle: 'italic',
                    textAlign: 'left'
                }}>
                        Bine ați venit pe site-ul nostru, dedicat artiștilor care doresc să își expună lucrările! Scopul acestui site este de a oferi o platformă ușor de utilizat, care să ajute artiștii să își prezinte creațiile într-un mod atrăgător și accesibil.
                    Aici, aveți posibilitatea de a adăuga, edita și șterge portofoliul dumneavoastră, oferindu-vă control total asupra modului în care vă arătați lucrările. Indiferent dacă sunteți pictor, fotograf, sculptor sau practician în orice alt domeniu artistic, acest site este conceput pentru a sprijini și promova talentul dumneavoastră.
                    Alăturați-vă comunității noastre și începeți să vă împărtășiți creațiile cu lumea!<br />
                    ❞ Arta asigură zborul. Dar cu aripile clientului. - Vasile Ghica❝
                </blockquote>
                <footer style={{ marginTop: '10px', fontSize: '0.9em', color: '#ddd' }}>
                    — @Echipa "Expoziția Artiștilor"
                </footer>
            </div>
            <Link
                to="portfolio"
                style={{
                    padding: '10px 20px',
                    background: '#a0a79d',
                    color: '#fafaf2',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    marginTop: '20px',
                    display: 'inline-block',
                    transition: 'background 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#003d59'}
                onMouseOut={(e) => e.currentTarget.style.background = '#a0a79d'}
            >
                Vezi portofoliile
            </Link>
        </div>
    );
};

export default Home;
