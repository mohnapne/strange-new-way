import { FC } from 'react'
import style from './MyButton.module.css'

// типизируем входные данные (пропсы)
interface btnProps {
  text: string,
  // если данные не обязательные не забудьте указать '?'
  onClick?: () => void
}

// передаем дженериком через '<>' значение типа пропсов
// сами значения достаем диструктуризацией из круглых скобок на входе в функцию
const MyButton: FC<btnProps> = ({ text, onClick }) => {
  return (
    <>
    {/* используем в нужном месте*/}
    {/* если вы хотите указать два стиля из css модулей - используйте шаблонные строки */}
      <button onClick={onClick} className={`${style.active} ${style.button}`}>{text}</button>
    </>
  )
}

export default MyButton
