import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import IProduct from '../productPage/types/Product'
// import cn from 'classnames'
import styles from './Product.module.css'
import MyButton from '../../../components/myButton/MyButton'

const Product: FC = () => {
  //из useParams мы по названию переменной можем достать данные из url
  const { id } = useParams()

  const initialValue: IProduct = {
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  }

  const [product, setProduct] = useState<IProduct>(initialValue)

  useEffect(() => {
    async function LoadProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }
    LoadProduct()
  }, [id])


  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <div className={styles.imgWrapper}>
        <img src={product.image} alt="" />
      </div>
      <Link to='/products'><MyButton text='Back to products' /></Link>

    </div>
  )
}

export default Product
