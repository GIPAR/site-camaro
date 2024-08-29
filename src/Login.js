import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import imgDelivery from './img/imgDelievery.png';
import { AuthContext } from './autheContext';


function Login() {
    const [values, setValues] = useState({
        id: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3001/login', values)
                .then(res => {
                    login(res.data.user);
                    navigate('/home');
                })
                .catch(err => {
                    console.error(err);
                    setErrors({ general: 'ID ou senha incorretos' });
                });
        }
    };

    return (
        <div className='d-flex justify-content-between align-items-stretch bg-warning vh-100'>
            <div className='bg-white p-3 ' style={{ width: '40%' }}>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '80%' }}>
                    <h4 className='mb-4'>Entrar no sistema</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='id' className='mb-1'>Numero do ID</label>
                            <input type='text' placeholder='Insira seu ID' name='id' onChange={handleInput} className='form-control rounded' />
                            {errors.id && <span className='text-danger'>{errors.id}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='mb-1'>Senha</label>
                            <input type='password' placeholder='Insira a senha' name='password' onChange={handleInput} className='form-control rounded-0' />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        {errors.general && <p className='text-danger mt-2'>{errors.general}</p>}
                        <button className='btn btn-warning w-100'>Entrar</button>
                        <p className='mb-4 mt-2'>Você concorda com nossas políticas e termos?</p>
                        <Link to="/signup" className='btn btn-default border w-100 bg-light'>Criar Conta</Link>
                    </form>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '80%' }}>
                <img src={imgDelivery} alt='Descrição da Imagem' />
            </div>
        </div>
    );
}

export default Login;
