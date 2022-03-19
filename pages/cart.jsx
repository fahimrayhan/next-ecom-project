import Head from "next/head"
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

function cart() {

  const {state,dispatch} = useContext(DataContext)
  const {cart} = state

  if (cart.length === 0) {
    return <img className="img-responsive w-100"  src="/empty-cart.jpg" alt="empty cart" />
  }
  else{
    return (
      <div>
        <Head>
          <title>Cart Page</title>
        </Head>
        <h1>Cart</h1>
      </div>
    )
  }
}

export default cart