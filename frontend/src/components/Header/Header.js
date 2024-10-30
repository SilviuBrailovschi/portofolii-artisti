import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPalette} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleMenu = () => {
        setIsOpen((prevState) => prevState ? false : true);
    }

    const handleLogo = () => {
        const userConfirmed = window.confirm("Știam că vei apăsa pe logo! Esti sigur/a ca vrei sa continui ?");
        if (userConfirmed) {
            window.open('https://prank-zeta.vercel.app', '_blank');
        }
    };

    let menuRef = useRef(0);

    useEffect(() => {
        let handler = (e) => {
            if(menuRef?.current && !menuRef?.current?.contains(e.target)){
                setIsOpen(false)
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    return (
        <header  className="header" style={{position: 'relative'}}>
            <div className="logo" onClick={() => handleLogo()} style={{position: 'absolute'}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64" style={{
                    transform: 'scale(.5)',
                    fill: 'rgb(25 120 135 / 80%)'
                }}>
                    <path d="M 18.5 8 C 12.71 8 8 12.71 8 18.5 L 8 20.105469 C 9.434 21.019469 12.343266 22.195797 16.697266 23.341797 C 18.696266 16.784797 24.798 12 32 12 C 39.156 12 45.228578 16.724797 47.267578 23.216797 C 51.942578 21.922797 54.867 20.629609 56 19.849609 L 56 18.5 C 56 12.71 51.29 8 45.5 8 L 18.5 8 z M 32 14.707031 C 24.832 14.707031 19 20.539031 19 27.707031 L 19 45.820312 C 18.600116 46.030665 18.204013 46.24972 17.816406 46.488281 C 16.676406 47.196281 15.599953 48.025469 14.626953 48.980469 C 14.135953 49.452469 13.68 49.969672 13.25 50.513672 C 13.035 50.785672 12.829812 51.067234 12.632812 51.365234 C 12.427812 51.677234 12.266781 51.933094 12.050781 52.371094 L 11.599609 53.283203 L 12.345703 54.048828 C 13.280703 55.008828 14.540781 55.550344 15.675781 55.777344 C 16.814781 56.029344 17.98325 56.003953 18.90625 56.001953 L 24.771484 56.001953 L 36.5 56.001953 L 36.5 56 C 41.396 56 48.101625 55.999031 51.890625 53.207031 L 52.90625 52.458984 L 52.341797 51.328125 C 52.255797 51.156125 50.26 47.255906 45 44.128906 L 45 27.707031 C 45 20.539031 39.168 14.707031 32 14.707031 z M 28.916016 21 L 29.083984 21 C 32.345984 21 35 23.654016 35 26.916016 L 35 34 C 34.946 35.1 34.659672 36.174516 34.138672 37.103516 C 33.604672 38.021516 32.872516 38.8105 31.978516 39.3125 C 31.098516 39.8385 30.084547 40.086172 29.060547 40.076172 C 28.009849 40.087879 27.151327 39.846165 26.273438 39.337891 C 26.251461 39.325167 26.229036 39.317753 26.207031 39.304688 L 26.197266 39.298828 C 24.226266 38.263828 23 36.265984 23 34.083984 L 23 26.916016 C 23 23.654016 25.654016 21 28.916016 21 z M 56 22.894531 C 54.241 23.893531 51.535766 25.164297 47.884766 26.154297 C 47.954766 26.761297 48 27.375 48 28 L 48 36.447266 C 52.246 35.176266 54.928 33.872766 56 33.134766 L 56 22.894531 z M 8 23.171875 L 8 33.439453 C 9.071 34.177453 11.37 35.353266 16 36.447266 L 16 28 C 16 27.42 16.034703 26.848203 16.095703 26.283203 C 12.535703 25.362203 9.84 24.166875 8 23.171875 z M 25.537109 27.492188 C 24.765109 27.509188 24.208156 27.842938 23.660156 28.210938 L 23.349609 28.419922 L 23.767578 29.042969 L 24.078125 28.832031 C 24.548125 28.515031 24.984734 28.255188 25.552734 28.242188 C 25.740964 28.234819 25.89208 28.254105 26.033203 28.287109 A 0.611 0.611 0 0 0 26.25 29.46875 A 0.611 0.611 0 0 0 26.859375 28.808594 L 27.107422 29.052734 L 27.630859 28.515625 L 27.361328 28.253906 C 26.769328 27.676906 26.286109 27.505188 25.537109 27.492188 z M 31.453125 27.492188 C 30.707125 27.506187 30.221906 27.676906 29.628906 28.253906 L 29.359375 28.515625 L 29.882812 29.052734 L 30.152344 28.789062 C 30.599344 28.352062 30.8795 28.219188 31.4375 28.242188 C 31.573581 28.245297 31.701155 28.264043 31.824219 28.292969 A 0.611 0.611 0 0 0 32.056641 29.46875 A 0.611 0.611 0 0 0 32.638672 28.673828 C 32.728472 28.729655 32.818956 28.770713 32.910156 28.832031 L 33.222656 29.042969 L 33.640625 28.419922 L 33.328125 28.210938 C 32.780125 27.842937 32.224125 27.509187 31.453125 27.492188 z M 26.556641 33.134766 C 26.556641 33.134766 27.369672 34.357422 28.388672 34.357422 C 29.348672 34.357422 30.222656 33.134766 30.222656 33.134766 C 30.222656 33.134766 29.121672 33.441406 28.388672 33.441406 C 27.619672 33.441406 26.556641 33.134766 26.556641 33.134766 z M 30.521484 35.333984 L 30.201172 35.529297 C 29.603172 35.893297 28.863141 36.023438 28.369141 36.023438 C 27.995141 36.023437 27.384484 35.918141 26.896484 35.619141 L 26.576172 35.423828 L 26.185547 36.064453 L 26.505859 36.259766 C 27.126859 36.638766 27.875141 36.773438 28.369141 36.773438 C 28.965141 36.773438 29.86175 36.615922 30.59375 36.169922 L 30.912109 35.974609 L 30.521484 35.333984 z M 56 36.339844 C 54.259 37.328844 51.594 38.582359 48 39.568359 L 48 42.921875 C 52.519 46.075875 54.435594 49.063281 54.933594 50.238281 C 55.726594 49.070281 56 47.088 56 45.5 L 56 36.339844 z M 8.0019531 36.341797 L 8.0019531 45.501953 C 8.0019531 47.649953 8.7882188 49.796281 9.6992188 51.238281 C 9.9852188 50.595281 10.522203 49.805594 10.908203 49.308594 C 11.956203 47.960594 13.152953 46.629797 16.001953 45.091797 L 16.001953 39.570312 C 12.407953 38.584313 9.7429531 37.329797 8.0019531 36.341797 z M 35 39.953125 L 35 53.001953 L 24.769531 53.001953 L 18.90625 53.001953 L 18.90625 53 C 17.87825 53.004 17.074875 53.012797 16.296875 52.841797 C 15.986875 52.777797 15.711078 52.685172 15.455078 52.576172 C 15.509078 52.504172 15.557281 52.432328 15.613281 52.361328 C 15.954281 51.931328 16.322516 51.511047 16.728516 51.123047 C 17.529516 50.337047 18.431297 49.635203 19.404297 49.033203 C 19.759297 48.814203 20.131953 48.619828 20.501953 48.423828 L 20.501953 48.40625 L 21.1875 48.052734 C 22.3935 47.430734 24.083172 46.852844 25.826172 46.464844 L 27 46.203125 L 27 42.271484 C 27.768668 42.527749 28.603548 42.644531 29.441406 42.644531 C 30.603406 42.644531 32.185297 42.269828 33.404297 41.423828 C 34.023297 41.013328 34.54925 40.51225 35 39.953125 z"></path>
                </svg>
            </div>
            <nav className="mobile-menu" tabIndex={0}>
                <div style={{ color: '#ccc', display: 'flex', alignItems: 'center', padding: '1rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-x" viewBox="0 0 16 16"
                         style={{ display: isOpen ? 'block' : 'none', marginLeft: '0.5rem', transform: 'scale(2.5)' , fontWeight: '900' }}
                         onClick={() => handleMenu()}
                    >
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-list" viewBox="0 0 16 16"
                         style={{ display: !isOpen ? 'block' : 'none', marginLeft: '0.5rem', transform: 'scale(2)' , fontWeight: '900' }}
                         onClick={() => handleMenu()}
                    >
                        <path fillRule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </div>
            </nav>
            {
                isOpen && (
                    <div className="menu-content" ref={menuRef}>
                        <ul>
                            <li className="list-item">
                                <Link to="/"
                                      style={{ color: '#ccc', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                                      onClick={handleMenu}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-house"
                                        viewBox="0 0 16 16"
                                        style={{ transform: 'scale(1.5)' }}
                                    >
                                        <path
                                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
                                        />
                                    </svg>
                                </Link>
                            </li>
                            <li className="list-item">
                                <Link to="/portfolio"
                                      style={{ color: '#ccc', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                                      onClick={handleMenu}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-grid"
                                        viewBox="0 0 16 16"
                                        style={{ transform: 'scale(1.5)' }}
                                    >
                                        <path
                                            d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
                                        />
                                    </svg>
                                </Link>
                            </li>
                            <li className="list-item">
                                <a href="https://github.com/SilviuBrailovschi" target="_blank" rel="noopener noreferrer"
                                   style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
                                   onClick={handleMenu}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" style={{ transform: 'scale(2)' }}>
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                </a>
                            </li>
                            <li className="list-item">
                                <a href="https://www.linkedin.com/in/silviu-brailovschi" target="_blank" rel="noopener noreferrer"
                                   style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
                                   onClick={handleMenu}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" style={{ transform: 'scale(2)' }}>
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                </a>
                            </li>
                            <li className="list-item">
                                <a href="https://drive.google.com/file/d/1SM6F-9T7eC0dKrsQMFBeM9kt5-t1Kst6/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
                                   style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
                                   onClick={handleMenu}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person-fill" style={{ transform: 'scale(2)' }}>
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                )
            }
            <nav className="normal-menu">
                <div className="home">
                    <Link to="/" style={{ color: '#ccc', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <p style={{ margin: 0, fontSize: '1.2rem' }}>Acasa</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-house"
                            viewBox="0 0 16 16"
                            style={{ marginLeft: '0.5rem', transform: 'scale(1.5)' }}
                        >
                            <path
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="portfolio-grid">
                    <Link to="/portfolio" style={{ color: '#ccc', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <p style={{ margin: 0, fontSize: '1.2rem' }}>Lista Portofoliilor</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-grid"
                            viewBox="0 0 16 16"
                            style={{ marginLeft: '0.5rem', transform: 'scale(1.5)' }}
                        >
                            <path
                                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
                            />
                        </svg>
                    </Link>
                </div>
            </nav>
            <div  className="social-media-contact" >
                <a href="https://github.com/SilviuBrailovschi" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" style={{ marginLeft: '0.5rem', transform: 'scale(2)' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/silviu-brailovschi" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" style={{ marginLeft: '0.5rem', transform: 'scale(2)' }}>
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                </a>
                <a href="https://drive.google.com/file/d/1SM6F-9T7eC0dKrsQMFBeM9kt5-t1Kst6/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person-fill" style={{ marginLeft: '0.5rem', transform: 'scale(2)' }}>
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
                    </svg>
                </a>
            </div>
        </header>
    );
};

export default Header;