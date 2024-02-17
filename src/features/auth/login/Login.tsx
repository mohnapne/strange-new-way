import { FC, useState, ChangeEvent } from 'react'
import { useAppDispatch } from '../../../app/hooks';
import { loginAction } from '../authAction';
import ICredentials from '../types/Credentials';
import useLocalStorage from '../../../hooks/useLS';
import { useNavigate } from 'react-router-dom';
// import cn from 'classnames'
// import styles from './Login.module.css'

const Login: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = useLocalStorage('password', '');

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const credentials: ICredentials = { username, password }
    dispatch(loginAction(credentials))
    navigate('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <span>username: 'kminchelle',
        password: '0lelplR',</span>
      <form onSubmit={handleSubmit}>
        <input placeholder='username' value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
