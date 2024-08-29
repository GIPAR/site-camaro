import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import imgDelivery from './img/imgDelievery.png';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        id: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(errors).length === 0 && values.name && values.id && values.password && values.confirmPassword) {
            axios.post('http://localhost:3001/signup', values)  // URL ajustada
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [errors, values, navigate]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    };

    return (
        <div className='d-flex justify-content-between align-items-stretch bg-warning vh-100'>
            <div className='bg-white p-3 ' style={{ width: '40%' }}>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '80%' }}>
                    <h4 className='mb-4'>Cadastrar Usuário</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='nome' className='mb-1'>Nome Completo</label>
                            <input type='text' placeholder='Insira seu nome completo' name='name' onChange={handleInput} className='form-control rounded-0'/>
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='id' className='mb-1'>Numero do ID</label>
                            <input type='text' placeholder='Insira seu ID' name='id' onChange={handleInput} className='form-control rounded-0'/>
                            {errors.id && <span className='text-danger'>{errors.id}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='mb-1'>Senha</label>
                            <input type='password' placeholder='Insira a senha' name='password' onChange={handleInput} className='form-control rounded-0'/>
                            <input type='password' placeholder='Repita a senha' name='confirmPassword' onChange={handleInput} className='mt-3 form-control rounded-0'/>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                        </div>
                        <button type='submit' className='btn btn-warning w-100'>Cadastrar</button>
                        <p className='mb-4 mt-2'>Você concorda com nossas políticas e termos?</p>
                        <Link to="/" className='btn btn-default border w-100 bg-light'>Entrar</Link>
                    </form>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '80%' }}>
                <img src={imgDelivery} alt='Descrição da Imagem' />
            </div>
        </div>
    );
}

export default Signup;
