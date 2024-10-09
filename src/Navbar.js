import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './autheContext';
import "./nav.css";

function Navbar() {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light navbar-expand-lg bg-warning ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Mall Delivery</a>
                <p className="mt-3 fs-5">Bem vindo, {user ? user.nome : 'Visitante'}</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link me-3 fs-5 ${location.pathname === '/home' ? 'active-link' : ''}`} aria-current="page" to="/home">Home</Link>
                        <Link className={`nav-link me-3 fs-5 ${location.pathname === '/pedidos' ? 'active-link' : ''}`} to="/pedidos">Pedidos</Link>
                        <Link className={`nav-link me-3 fs-5 ${location.pathname === '/produtos' ? 'active-link' : ''}`} to="/produtos">Produtos</Link>
                        <Link className={`nav-link me-3 fs-5 ${location.pathname === '/lojas' ? 'active-link' : ''}`} to="/lojas">Lojas</Link>
                        <Link className={`nav-link me-3 fs-5 ${location.pathname === '/dispositivos' ? 'active-link' : ''}`} to="/dispositivos">Dispositivos</Link>
                        
                        
                        {/* <Link className={`nav-link fs-5 ${location.pathname === '/rastreio' ? 'active-link' : ''}`} to="/rastreio">Rastrear Pedido</Link> */}
                        {/* <Link className={`nav-link me-3 fs-5 ${location.pathname === '/pedido' ? 'active-link' : ''}`} to="/pedido">Fazer Pedido</Link> */}
                        {user && (
                            <button className="btn btn-danger ms-3" onClick={handleLogout}>Sair</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
