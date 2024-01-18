import React, { useState, useEffect } from "react";
import axios from "axios";
import './Login.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import Travellogo from '../../images/3733274_1957949-02.svg';
import { Link , useNavigate  } from 'react-router-dom';



const Login = ({history}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: username,
      password: password,
    };
  
    try {
      
  
      const response = await axios.post('http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/login', user);
  
      if (response.status === 200) {
        const userInfo = response.data;
        const userid = response.data.id;
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('userId', userid);
        setMessage('Login successful');
        navigate('/Home');

      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(user);
      setMessage('An error occurred during login');
    }
  };
  

  return (
    <div id='login_container'>
      
      <div class='row' >
        
        <div class='col' id='login'>
          
          <form onSubmit={handleLogin}>
          <img src={Travellogo} style={{width : '350px',marginLeft : '40px'}} />
          {message && <p>{message} + <strong>{username} + {password}</strong></p>}

            <div>
              <TextField 
                style={{width : '450px'}}
                id="outlined-basic" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                label="Email" variant="outlined" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div class="my-3">
              <TextField 
                style={{width : '450px'}}
                id="outlined-basic" 
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password" variant="outlined" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div class="row">
              <div class="col">
                <br></br>
                <br></br>
                <Link to="/Create_Accout" style={{color : '#FFA500' , fontWeight : 500 }}>CrÃ©er Votre Compte perso</Link>
              </div>
              <div class="col">
                <Link to="/Email_Recup" style={{color : '#FFA500' , marginLeft : '95px' , marginBottom : '30px' , fontWeight : 500}}>Mot de passe oublier ?</Link>
                <button style={{marginLeft : '110px'}}>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Connexion</span>
                </button>

              </div>
            </div>
            
          </form>
        </div>
        <div class='col' id='image_login'></div>
      </div>
      
    </div>
  );
};

export default Login;