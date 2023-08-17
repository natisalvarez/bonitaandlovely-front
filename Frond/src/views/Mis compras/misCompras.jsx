import { useState } from 'react';
import ProductCard from './card'

const MisCompras = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Labial numero 1",
      price: "$10.00",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Labial numero 2",
      price: "$30.00",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Labial numero 3 de 4ta generacion",
      price: "$245.00",
      imgSrc: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <>
      <h2 className='text-2xl text-center font-bold m-5'>Mis compras</h2>
      <div className="flex flex-row justify-start">
        <div className="grid grid-cols-1 gap-8 w-4/5 mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-md shadow-md">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MisCompras;