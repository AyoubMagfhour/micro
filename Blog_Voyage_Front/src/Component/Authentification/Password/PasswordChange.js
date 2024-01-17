import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Login.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import Travellogo from '../../../images/3733274_1957949-02.svg';
import { Link } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';


const PasswordChange = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const { id } = useParams()


    useEffect(() => {
      fetchData(); // Call the fetchData function when the component mounts
    }, [id]); // Run the effect whenever the id changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/${id}`);
        // Assuming your API returns user data in response.data
        const userData = response.data;

        // Update the state with user data
        setEmail(userData.email); // Replace 'username' with the actual property name in your user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const handleUpdatePassword = async (e) => {
      e.preventDefault();
  
      if (password !== password2) {
        // Handle password mismatch
        alert('Passwords do not match.');
        return;
      }
  
      try {
        const response = await axios.put(`http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/updatePassword/${id}`, {
          Password: password,
        });
  
        if (response.data) {
          alert('Password updated successfully.');
        } else {
          alert('Failed to update password.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password.');
      }
    };
    return (
        <div id='login_container'>
          
          <div class='row' >
            
            <div class='col' id='login'>
              
              <form onSubmit={handleUpdatePassword}> 
              <img src={Travellogo} style={{width : '350px',marginLeft : '40px'}} />
                <div class="my-3">
                  <TextField 
                    style={{width : '450px'}}
                    id="outlined-basic" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    label="Email" variant="outlined" 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
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
                <div class="my-3">
                  <TextField 
                    style={{width : '450px'}}
                    id="outlined-basic" 
                    value={password2}
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    label="Confirm Password" variant="outlined" 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div class='row'>
                  <div class='col'>
                    <p></p>
                    <p></p>
                    <Link to="/" style={{color : '#FFA500' , fontWeight : 500 }}>Return Login</Link>
                  </div>
                  <div class='col'>
                    <button style={{marginLeft : '150px'}}>
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
                      <span>Submit</span>
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

export default PasswordChange;