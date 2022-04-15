import React, {useContext} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { FaUser} from 'react-icons/fa'
import {DataContext} from '../store/GlobalState'
import jsCookie from 'js-cookie';
const NavBar = () => {
    const router = useRouter();


    const {state,dispatch} = useContext(DataContext);
    const {auth, cart} = state

    const isActive = (r) =>{
        if (r===router.pathname) {
            return " active"
        }
        else{
            return ""
        }
    }

    const handleLogout = () => {
        jsCookie.remove('refreshtoken', { path:'api/auth/accesstoken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload:{}})
        dispatch({ type: 'NOTIFY',payload: {success:'Logged Out'}})
    }

    const loggedRouter = () =>{
        return(
            <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={auth.user.avatar} alt="avatar" style={{
                        borderRadius: '50%',
                        height: '30px',
                        width:'30px',
                        transform:'translateY(-3px)',
                        marginRight:'3px'
                    }}/>
                    {auth.user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                    </Link>
                    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                </ul>
            </li>
        )
    }

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <Link href="/">
                <a className="navbar-brand">E-Comm Project</a>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <Link href="/cart">
                            <a className={"nav-link"+isActive('/cart')}>
                                  <AiOutlineShoppingCart/> 
                                  <sup
                                    style={{
                                        padding:'3px 6px', 
                                        background:'#ed143dc2', 
                                        borderRadius:'50%',
                                        color:'white',
                                        fontSize:'14px'
                                    }}
                                  >{cart.length} </sup>
                                   Cart
                                
                            </a>
                          </Link>
                      </li>
                      {
                          Object.keys(auth).length === 0 ?
                          
                          <li className="nav-item">
                              <Link href="/signin">
                                  <a className={"nav-link" + isActive('/signin')}>
                                      <FaUser />  Sign In
                                  </a>
                              </Link>
                          </li> : loggedRouter()
                      }
                      
                      
                      {/* <li className="nav-item dropdown ">
                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              User Name
                          </a>
                          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                              <li><a className="dropdown-item" href="#">Profile</a></li>
                              <li><a className="dropdown-item" href="#">Logout</a></li>
                          </ul>
                      </li> */}
                  </ul>
              </div>
          </div>
      </nav>
  )
}

export default NavBar