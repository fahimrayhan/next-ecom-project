import Link from 'next/link'
import React from 'react'

function ProductItem({product}) {

    const userLink = () =>{
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info" 
                    style={{marginRight:'5px', flex:1}}
                    >View</a>
                </Link>
                <button className="btn btn-success" style={{marginLeft:'5px', flex:1}} >
                    Buy
                </button>
            </>
        )
    }

return (
    <div className="card" style={{width: "18rem"}}>
        <img src={product.images[0].url} className="card-img-top" alt={product.images[0].url} />
        <div className="card-body">
            <h4 className="card-title text-capitalize" title={product.title}>
                {product.title}
            </h4>
            <div className="row justify-content-between mx-0">
                <h6 className="text-danger">${product.price}</h6>
                {
                product.inStock > 0? <h6 className="text-danger">In Stock: {product.inStock}</h6>:<h6 className="text-danger">Out Of Stock</h6>
                }
            </div>
            <p className="card-text" title={product.description}>
                {product.description}
            </p>
            <div className="row justify-content-between mx-0">
                    {userLink()}
            </div>
        </div>
    </div> 
)
}

export default ProductItem