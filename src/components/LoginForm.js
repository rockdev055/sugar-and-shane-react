import React, { useState } from 'react'
import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://evening-crag-18234.herokuapp.com'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(e) {
    e.preventDefault()
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password
    })

    console.log(data)
  }

  return (
    <form
      onSubmit={e => {
        loginUser(e)
      }}
    >
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm
