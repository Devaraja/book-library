import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Users } from './Userdata';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom'

const  Login = (props) =>  {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [librarian, setLibrarian] = useState(false);
  const data = Users;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setUsers(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  },[]);

  function handleSubmit(evt) {
    for(let i=0; i<users.length; i++){
      //console.log(users[i].username+":"+email+":"+users[i].password+":"+password+":"+users[i].tyep);
      if(users[i].username === email && users[i].password === password){
        console.log(users[i].username+":"+users[i].password);
        let pathname= (librarian && (users[i].tyep == "admin"))?"/admin": "/home"
          props.history.push({ 
            pathname: pathname,
            state: {
            user: users[i].username
            }
          });
        }
    }
  }

  function handleUserChange (evt){
      setEmail(evt.target.value)
  }
  function handleCheckChange (evt){
    setLibrarian(!librarian)
  }

  function handlePasswordChange (evt){
    setPassword(evt.target.value)
  }

  return (
    <div className="Login">  
    <h1>Library Management System</h1>
    <div>
        <div>Username</div>
      <input type='text' value={email} onChange={handleUserChange}></input>
      <div>Password</div>
      <input type='password' value={password} onChange={handlePasswordChange}></input>
      <div><input type="checkbox" id="admin" name="admin" onClick={handleCheckChange} value={librarian}></input>Librarian</div>
      <Button variant="primary" onClick={handleSubmit}>Login</Button>
      </div>  
    
    </div>
  );
}

export default withRouter(Login);
