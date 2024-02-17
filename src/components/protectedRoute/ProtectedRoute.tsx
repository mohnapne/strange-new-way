import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Navigate } from 'react-router-dom'

interface IProps {
  outlet: JSX.Element
}
// это компонент, который принимает на вход другой компонент, и возвращает его, если пользователь авторизирован
// если такого юзера нет у нас происходит переадресация

const ProtectedRoute: FC<IProps> = ({ outlet }) => {
  const { user } = useAppSelector(state => state.user)
  if (user) {
    return outlet
  }
  return <Navigate to='../login' />
}

export default ProtectedRoute
