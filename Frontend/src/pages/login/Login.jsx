import { useState } from "react";
import { NavbarComponent } from "../../components/navbar/NavbarComponent";
import { useAuth } from "../../components/auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { LogIn } from "../../services/logIn";
import './Login.css'

export const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const resp = await LogIn({
        name,
        password,
      })

      if(resp.ok){
        setErrorResponse("")
        const json = await resp.json();
        auth.saveUser(json.userInfo);
        goTo('/home');
      }else{
        console.log('Error en la creacion del usuario');
        setErrorResponse('wrong credentials')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to = '/home'/>
  }
  return (
    <NavbarComponent>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {
          !!errorResponse && <p>{errorResponse}</p>
        }
        <label>Username</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button>Login</button>
      </form>
    </NavbarComponent>
  );
};
