import Head from 'next/head';
import Link from 'next/link';
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'


const register = () => {

  const router = useRouter()

  const initState = {name: '', email: '', password:'', cf_password: '',}
  const [userData, setUserData] = useState(initState)
  const {name, email, password, cf_password} = userData

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
  }

  const {state,dispatch} = useContext(DataContext)

  const {auth} = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errorMessage = valid(name, email, password, cf_password)
    if (errorMessage) {
      console.log(errorMessage)
      dispatch({ type: 'NOTIFY', payload: { error: errorMessage}})
    }
    else{
      dispatch({ type: 'NOTIFY', payload: { laoding: true }})

      const res = await postData('auth/register',userData)
      if (res.err) {
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      }
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    }
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/')
    }
  }, [auth])

  return (
    <div>
        <Head>
            <title>Register | E-Comm Project</title>
          </Head>
        <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">Name</label>
           <input type="text" className="form-control" id="exampleInputName1" name="name" value={name} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={handleChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" name="cf_password" value={cf_password} onChange={handleChange}/>
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>
          <p className='text-center mt-2'>Already have an account?
            <Link href="/signin"><a style={{ color: 'crimson' }}> Login Now</a></Link>
          </p>
        </form>
    </div>
  )
}

export default register