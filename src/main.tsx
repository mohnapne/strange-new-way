import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"

import "./index.css"

import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Error from './components/error/Error'
import CityToggle from './components/cityToggle/CityToggle'
import Sandwich from './components/sandwich/Sandwich'
import Product from './features/products/product/Product'
import Loader from './components/loader/Loader'
import Shop from './features/shopFeature/shop/Shop'
import Login from './features/auth/login/Login'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
// import ProductPage from './features/products/productPage/ProductPage'

// чтобы сделать динамический импорт вы используете встроенную в react функцию lazy()
// передаете в нее стрелочную функцию и импортируете компонент
const ProductPage = lazy(() => import('./features/products/productPage/ProductPage'))

ReactDOM.createRoot(document.getElementById("root")!).render(
  // мы оборачиваем react приложение в компонент <Provider> и предаем в него store
  // без этого у вас не заработает redux на проекте
  <Provider store={store}>
    <HashRouter>
      <Routes>
        {/* <Route path='/' element={<Layout />}> */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path='login' element={<Login />} />
          {/* защита роута реализована внутри компонента */}
          <Route path='products/' element={
            <Suspense fallback={<Loader />}>
              <ProductPage />
            </Suspense>
          } />
          {/* передаем элемент в защищенный роут через пропс outlet */}
          <Route path='city-toggle/' element={<ProtectedRoute outlet={<CityToggle />} />} />
          <Route path='sandwich/' element={<ProtectedRoute outlet={<Sandwich />} />} />
          <Route path='products/:id' element={<ProtectedRoute outlet={<Product />} />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
)
