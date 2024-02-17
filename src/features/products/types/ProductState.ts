import IProduct from './Product';

export default interface ProductState {
  products: IProduct[]
  error?: null | string
  isLoading?: boolean
  favorites: number[]
}
