import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import {getData} from "../utils/fetchData"

export const DataContext = createContext()

export const DataProvider = ({children}) => {


    const initState = {notify:{}, auth: {}, cart:[], modal:{}, orders:[]}
    const [state,dispatch] = useReducer(reducers,initState)
    const { cart, auth } = state


    useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin")
      if (firstLogin) {
          getData('auth/accesstoken').then(res=> {
              if (res.err) {
                  return localStorage.removeItem("firstLogin")
              }

              dispatch({ type: 'AUTH', payload: {
                  token: res.access_token,
                  user: res.user
              }})
          })
      }
    }, [])

    useEffect(() => {
        const _next_cart01 = JSON.parse(localStorage.getItem('_next_cart01'))
        if (_next_cart01) {
            dispatch({ type: 'ADD_CART', payload: _next_cart01})
        }
    }, [])
    
    useEffect(() => {
      localStorage.setItem('_next_cart01', JSON.stringify(cart))
    }, [cart])
    

    useEffect(() => {
      if (auth.token) {
          getData('order',auth.token).then(
              res => {
                if (res.err) {
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                }
                else {
                    dispatch({ type: 'ADD_ORDERS', payload: res.orders})
                }
              }
          )
      }
    }, [auth.token])
    
    

    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}