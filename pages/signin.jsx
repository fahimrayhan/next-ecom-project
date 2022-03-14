import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'

import Cookie from 'js-cookie'

function signin() {

  const initState = {  email: '', password: '' }
  const [userData, setUserData] = useState(initState)
  const { email, password} = userData

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const { state, dispatch } = useContext(DataContext)

  const handleSubmit = async (e) => {
    
      e.preventDefault()

      dispatch({ type: 'NOTIFY', payload: { laoding: true } })

      const res = await postData('auth/login', userData)
      if (res.err) {
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      }
      dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

      dispatch({ type: 'AUTH', payload: { 
          token: res.access_token,
          user: res.user
      } })


      Cookie.set('refreshtoken', res.refresh_token,{
        path: 'api/auth/accesstoken',
        expires:7
      })

      localStorage.setItem('firstLogin',true)
  }

  return (
    <div>
        <Head>
            <title>Sign in | E-Comm Project</title>
        </Head>
          <form className="mx-auto my-4" style={{maxWidth:'500px'}} onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name="email" value={email} onChange={handleChange} />
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1"
                   name="password" value={password} onChange={handleChange}/>
              </div>
              
              <button type="submit" className="btn btn-dark w-100">Login</button>
              <p className='text-center mt-2'>Don't have an account? 
                  <Link href="/register"><a style={{color:'crimson'}}> Register Now</a></Link>
                </p>
          </form>
    </div>
  )
}

export default signin