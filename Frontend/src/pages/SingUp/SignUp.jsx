import { useState } from "react";
import { NavbarComponent } from "../../components/navbar/NavbarComponent";
import { useAuth } from "../../components/auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/registerUser";
import './Signup.css'


export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [errorResponse, setErrorResponse] = useState('');

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const resp = await registerUser({
        name,
        email,
        password,
        avatar,
        bio,
      })

      if(resp.ok){
        console.log('usuario creado');
        setErrorResponse("")
        goTo('/')
      }else{
        console.log('Error en la creacion del usuario');
        const json = await resp.json();
        setErrorResponse(json.body.error)
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
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        {
          !!errorResponse && <p>{errorResponse}</p>
        }
        <label>Username</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <label>Avatar</label>
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>

        <label>Bio</label>
        <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}/>

        <button>Register</button>
      </form>
    </NavbarComponent>
  );
}


