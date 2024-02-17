import { ChangeEvent, FC, FormEvent, useState } from 'react'
// import cn from 'classnames'
import styles from './ProductForm.module.css'
import { useAppDispatch } from '../../../app/hooks';
import { addProduct } from '../productAction';
import IProduct from '../types/Product';
import useLocalStorage from '../../../hooks/useLS';

const ProductForm: FC = () => {

  const dispatch = useAppDispatch()

  //прописываем стейт на каждый input
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [category, setCategory] = useState('');
  // const [price, setPrice] = useState('');
  // const [image, setImage] = useState('');

  const [error, setError] = useState('');

  const [product, setProduct] = useLocalStorage<IProduct>('product',{
    title: '',
    description: '',
    category: '',
    price: '',
    image: ''
  })

  // делаем функцию обработчик, в которой обращаемся к параметру event (или 'e')
  // и предотвращаем перезагрузку по умолчанию по нажатию (как в обычном js)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProduct({
      ...product,
      [name]: value
    })
  }


  function valideateInputs(): boolean {
    const linkPattern = /^(https?:\/\/)?([\w.-]+\.\w{2,})(\/\S*)?$/;
    if (product.title.trim() === '') {
      setError('title is not valid')
      return false
    }
    if (product.description.trim() === '') {
      setError('description is not valid')
      return false
    }
    if (product.category.trim() === '') {
      setError('category is not valid')
      return false
    }
    if (product.price.trim() === '' || (Number.isNaN(Number(product.price)))) {

      setError('price is not valid')
      return false
    }
    if (!linkPattern.test(product.image)) {
      setError('url is not valid')
      return false
    }
    return true
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

     sessionStorage.setItem('price', product.price)

    if (valideateInputs()) {
      dispatch(addProduct(product))
    }
  }


  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit} action="">
          <label>Добавить новый продукт:</label>
          <input name='title' onChange={handleChange} placeholder='title' type="text" value={product.title} />
          <input name='description' onChange={handleChange} placeholder='description' type="text" value={product.description} />
          <input name='category' onChange={handleChange} placeholder='category' type="text" value={product.category} />
          <input name='price' onChange={handleChange} placeholder='price' type="text" value={product.price} />
          <input name='image' onChange={handleChange} placeholder='image' type="text" value={product.image} />
          <button className={styles.button} type='submit'>Добавить файл</button>
        </form>
      </div>
      <div style={{ textAlign: 'center' }}>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </>
  )
}

export default ProductForm
