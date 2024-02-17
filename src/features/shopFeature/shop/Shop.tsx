import { FC, useEffect } from 'react'
// import cn from 'classnames'
import styles from './Shop.module.css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { loadItems } from '../shopAction';
import { Link } from 'react-router-dom';

const Shop: FC = () => {
  const dispatch = useAppDispatch()

  const { items } = useAppSelector(state => state.shop)
  const { user } = useAppSelector(state => state.user)


  useEffect(() => {
    dispatch(loadItems())
  }, [])

  console.log(items);

  return (
    <div>
      {user ? (
        <>
          <h1>Shop</h1>
          {items.map(el => (
            <div key={el.id}>
              <span>{el.title}</span>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>Вы не авторизированы!</p>
          <Link to='login'>Войдите в свой профиль</Link>

        </>
      )}


    </div>
  )
}

export default Shop
