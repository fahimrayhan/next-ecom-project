import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext } from 'react'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'

function login() {


    const initState = { email: '', password: '', }
    const [userData, setUserData] = useState(initState)
    const {email, password,  } = userData

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const { state, dispatch } = useContext(DataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errorMessage = valid(name, email, password, cf_password)
        if (errorMessage) {
            console.log(errorMessage)
            dispatch({ type: 'NOTIFY', payload: { error: errorMessage } })
        }
    
            dispatch({ type: 'NOTIFY', payload: { laoding: true } })

            const res = await postData('auth/register', userData)
            if (res.err) {
                return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            }
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        
    }

  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <a className="nav-link active" aria-current="page" href="#">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">Link</a>
                          </li>
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Dropdown
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <li><a className="dropdown-item" href="#">Action</a></li>
                                  <li><a className="dropdown-item" href="#">Another action</a></li>
                                  <li><hr className="dropdown-divider"/></li>
                                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                              </ul>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link disabled">Disabled</a>
                          </li>
                      </ul>
                      <form className="d-flex">
                          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                              <button className="btn btn-outline-success" type="submit">Search</button>
                      </form>
                  </div>
              </div>
          </nav>
    </div>
  )
}

export default login