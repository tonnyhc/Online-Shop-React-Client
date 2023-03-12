import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthDataContext } from '../../contexts/AuthContext';
import * as authServices from '../../services/authService';
import {isValidEmail} from '../../utils/validators/emailValidator'

import styles from './AuthForm.module.css';
import './AuthForm.css';

export const AuthForm = () => {
    const { userLogin } = useContext(AuthDataContext)

    const [loginData, setLoginData] = useState({
        'username': '',
        'password': '',
    })

    const [registerData, setRegisterData] = useState({
        'username': '',
        'full_name': '',
        'email': '',
        'password': '',
        'repass': '',
        'birth_year': '',
        'check': 'off',
    })

    const [fieldErrors, setFieldErrors] = useState({
        'username': null,
        'password': null,
        'repass': null,
        'email': null,
    })


    const checkField = (e) => {
        const field = e.target;

        if (field.name == 'username') {
            if (field.value.length <= 3) {
                return setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    username: "Username must be more than 3 characters long!"
                }))
            } else {
                setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    username: ''
                }))
            }
        }

        if (field.name == 'password') {
            if (field.value.length <= 6) {
                return setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    password: "Password must be more than 6 characters long!"
                }))
            } else {
                return setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    password: ''
                }))
            }
        }

        if (field.name == 'repass') {
            if (field.value !== registerData.password) {
                setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    repass: "Passwords do not match!"
                }))
            } else{
                setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    repass: ""
                }))
            }
        }

        if (field.name == 'email'){
            const isValid = isValidEmail(registerData.email)
            if (!isValid){
                setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    email: "Email is not valid!"
                }))
            } else{
                setFieldErrors(oldErrors => ({
                    ...oldErrors,
                    email: ""
                }))
            }
        }

    }



    const onChangeLogin = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setLoginData({ ...loginData, [field]: value })
    }

    const onChangeRegister = (e) => {

        if (e.target.type === 'checkbox') {
            console.log(registerData)
            setRegisterData({ ...registerData, check: e.target.checked ? 'off' : 'on' });;
            return
        }

        const field = e.target.name;

        const value = e.target.value;
        setRegisterData({ ...registerData, [field]: value })
    }

    const onLogin = async (e) => {
        e.preventDefault();
        if (fieldErrors.username || fieldErrors.password){
            return
        }
        
        for (let [value] of Object.values(loginData)){
            if (!value || value == ''){
                return
            }
        }

        const response = await authServices.login(loginData)
        const authData = userLogin(response);
        setLoginData({
            'username': '',
            'password': '',
        })
        return authData
    }

    const onRegister = async (e) => {
        e.preventDefault();
        if  (fieldErrors.username || fieldErrors.password || fieldErrors.repass || fieldErrors.email) {
            return 
        }

        for (let [value] of Object.values(registerData)){
            if (!value || value == ''){
                return
            }
        }

        const response = await authServices.register(registerData)
        const authData = userLogin(response)
        setRegisterData({
            'username': '',
            'email': '',
            'password': '',
            'repass': '',
            'check': 'off',
        })
        return authData


    }

    return (
        <div className="login-register-backdrop" style={{ display: 'none' }}>
            <div className="close-button">
                <button className="backdrop-closeButton" onClick={closeAuthWindow}><i className="fa-solid fa-x" ></i></button>
            </div>

            <div className="form" id='login-form' style={{ display: 'block' }}>
                <h3>Login Now</h3>
                <form onSubmit={onLogin}>
                    <div className="username">
                        {fieldErrors.username ? <span className={styles.formError}>{fieldErrors.username}</span> : null}
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="text" name="username" id="username" onBlur={checkField} onChange={onChangeLogin} value={loginData.username} />
                    </div>


                    <div className="password">
                        {fieldErrors.password ? <span className={styles.formError}>{fieldErrors.password}</span> : null}
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onBlur={checkField} onChange={onChangeLogin} value={loginData.password} />
                    </div>

                    <div className="check">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label style={{ display: 'inline-block' }} htmlFor="checkbox">Remember me</label>
                    </div>

                    <button type="submit">
                        <p>Sign In</p>
                    </button>

                    <div className='reform'>
                        <p>Don't have account yet ?</p>
                        <p><Link href="#" onClick={changeFormView}>Register</Link></p>
                    </div>
                </form>
            </div>

            <div className="form" id='register-form' style={{ display: 'none' }}>
                <h3>Register Now</h3>
                <form action="submit" onSubmit={onRegister} method='POST'>
                    <div className="username">
                    {fieldErrors.username ? <span className={styles.formError}>{fieldErrors.username}</span> : null}
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="text" name="username" id="username" onBlur={checkField} onChange={onChangeRegister} value={registerData.username} />
                    </div>

                    <div className='fullName'>
                        <label htmlFor="fullName">Full name:</label>
                        <input type="text" 
                        name='full_name'
                        id='fullName'
                        onBlur={checkField}
                        onChange={onChangeRegister}
                        value={registerData.full_name}
                        />
                    </div>

                    <div className="email">
                    {fieldErrors.email ? <span className={styles.formError}>{fieldErrors.email}</span> : null}
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="text" name="email" id="email" onBlur={checkField} onChange={onChangeRegister} value={registerData.email} />
                    </div>

                    <div className="password">
                    {fieldErrors.password ? <span className={styles.formError}>{fieldErrors.password}</span> : null}
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onBlur={checkField} onChange={onChangeRegister} value={registerData.password} />
                    </div>

                    <div className="repassword">
                    {fieldErrors.repass ? <span className={styles.formError}>{fieldErrors.repass}</span> : null}
                        <label htmlFor="repass">
                            Repeat Password
                        </label>
                        <input type="password" name="repass" id="repass" onBlur={checkField} onChange={onChangeRegister} value={registerData.repassword} />
                    </div>

                    
                    <div className='birth_year'>
                        <label htmlFor="birth_year">Birth year:</label>
                        <input type="date" 
                        name='birth_year'
                        id='birth_year'
                        onBlur={checkField}
                        onChange={onChangeRegister}
                        value={registerData.birth_year}
                        />
                    </div>

                    <div className="check">
                        <input type="checkbox" name="checkbox" id="checkbox" value={registerData.check} onChange={onChangeRegister} />
                        <label style={{ display: 'inline-block' }} htmlFor="checkbox">I accept the terms and conditions</label>
                    </div>

                    <button type="submit">
                        <p>Sign Up</p>
                    </button>

                    <div className='reform'>
                        <p>Already have account ?</p>
                        <p><Link href="#" onClick={changeFormView}>Log In</Link></p>
                    </div>

                </form>
            </div>
        </div>
    );
}




function changeFormView(e) {
    e.preventDefault();
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const currForm = e.target.parentElement.parentElement.parentElement.parentElement;

    if (currForm === loginForm) {
        loginForm.style.display = 'none'
        registerForm.style.display = 'block'
    } else {
        loginForm.style.display = 'block'
        registerForm.style.display = 'none'
    }
}

function closeAuthWindow(e) {
    e.preventDefault();
    const authWindow = document.querySelector('.login-register-backdrop');
    authWindow.style.display = 'none';
}

export function openAuthWindow(e) {
    e.preventDefault();
    const authWindow = document.querySelector('.login-register-backdrop');
    authWindow.style.display = 'block';
}


// TODO: must remove this from here and put it somewhere else, but it works only need to set the data i get so can work with it...
// TODO: Must make the form show some errors if credentials are wrong or the fields are empty etc...
