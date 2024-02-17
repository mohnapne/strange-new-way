import { FC, useEffect, useState } from 'react'
// import cn from 'classnames'
import styles from './ProductPage.module.css'

import { Link, Navigate } from 'react-router-dom'
import MyButton from '../../../components/myButton/MyButton'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteProduct, loadProducts } from '../productAction'
import ProductForm from '../productForm/ProductForm'
import Loader from '../../../components/loader/Loader'
import { toggleFavorites } from '../productSlice'
import { motion } from 'framer-motion';
import ProductCard from '../productCard/ProductCard'

const ProductPage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, error, isLoading, favorites } = useAppSelector(state => state.products)
  const { user } = useAppSelector(state => state.user)


  useEffect(() => {
    dispatch(loadProducts())
  }, [])

  const initialVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }


  // упрощенный аналог защищенного рута - проверяем если информация о юзере
  // и если нет делаем переадресацию в логин
  
  if (!user) {
    return <Navigate to='../login' />
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={initialVariant}
    >

      <ProductForm />
      {isLoading && <Loader />}
      {error && <h4 style={{ color: 'red' }}>Error {error}</h4>}
      {!isLoading && (
        <ul className={styles.productList}>
          {products.map(el => (
            <ProductCard key={el.id} id={el.id} title={el.title} image={el.image} price={el.price} />
          ))}
        </ul>
      )}

    </motion.div>
  )
}

export default ProductPage
