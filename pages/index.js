import {getData} from '../utils/fetchData'
import {useState} from 'react'
import Head from 'next/head'
import ProductItem from '../components/product/ProductItem'

const index = (props) => {

  const [products,setProducts] = useState(props.products)


  return (
    <div className="products">
      <Head>
        <title>Home Page</title>
      </Head>
      {
        products.length === 0 ? <h2>No Products</h2> : products.map((product) =>{
          return(
            <ProductItem key={product._id} product={product} />
          )
        })
      }
    </div>
  )
}

export default index

export async function getServerSideProps(context) {
  const res = await getData('product')
  return {
    props:{
      products: res.products,
      result: res.result
    }
  }
}