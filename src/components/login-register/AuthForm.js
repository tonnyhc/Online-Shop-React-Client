import { useState } from 'react';
import './AuthForm.css';

export const AuthForm = () => {

    const [loginData, setLoginData] = useState({
        'username': '',
        'password': '',
    })

    const [registerData, setRegisterData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'repass': '',
        'check': 'on', 
    })


    const onChangeLogin = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setLoginData({...loginData, [field]: value})
    }

    const onChangeRegister = (e) => {

        if (e.target.type === 'checkbox'){
            console.log(registerData)
            setRegisterData({ ...registerData, check: e.target.checked ? 'off' : 'on' });;
            return
        }

        const field = e.target.name;

        const value = e.target.value;
        setRegisterData({ ...registerData, [field]: value })
    }


    return (
        <div className="login-register-backdrop" style={{display: 'none'}}>
            <div className="close-button">
                <button className="backdrop-closeButton" onClick={closeAuthWindow}><i className="fa-solid fa-x" ></i></button>
            </div>

                <div className="form" id='login-form' style={{display: 'block'}}>
                    <h3>Login Now</h3>
                    <form onSubmit={(event) => {event.preventDefault(); performLogin(loginData)}}>
                        <div className="username">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input type="text" name="username" id="username" onChange={onChangeLogin} value={loginData.username}/>
                        </div>

                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={onChangeLogin}  value={loginData.password}/>
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
                            <p><a href="#" onClick={changeFormView}>Register</a></p>
                        </div>
                    </form>
                </div>

                <div className="form" id='register-form' style={{display: 'none'}}>
                    <h3>Register Now</h3>
                    <form action="submit" method='POST'>
                        <div className="username">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input type="text" name="username" id="username" onChange={onChangeRegister} value={registerData.username} />
                        </div>

                        <div className="email">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="text" name="email" id="email" onChange={onChangeRegister} value={registerData.email} />
                        </div>

                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={onChangeRegister} value={registerData.password} />
                        </div>

                        <div className="repassword">
                            <label htmlFor="repass">
                                Repeat Password
                            </label>
                            <input type="password" name="repass" id="repass" onChange={onChangeRegister} value={registerData.repassword} />
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
                            <p><a href="#" onClick={changeFormView}>Log In</a></p>
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
    } else{
        loginForm.style.display = 'block'
        registerForm.style.display = 'none'
    }
}

function closeAuthWindow(e){
    e.preventDefault();
    const authWindow = document.querySelector('.login-register-backdrop');
    authWindow.style.display = 'none';
}

export function openAuthWindow(e){
    e.preventDefault();
    const authWindow = document.querySelector('.login-register-backdrop');
    authWindow.style.display = 'block';
}


// TODO: must remove this from here and put it somewhere else, but it works only need to set the data i get so can work with it...
// TODO: Must make the form show some errors if credentials are wrong or the fields are empty etc...
async function performLogin(data){
    const url = 'http://localhost:8000/api/accounts/sign-in/';

    console.log('Sending request with data:', data);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log('Received response:', response);

    const result = await response.json();
    // If the request is sent with wrong credentials i get the error in the response.json()
    console.log('Response data:', result);

    return result;

}