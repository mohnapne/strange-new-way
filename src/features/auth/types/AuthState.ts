import IUser from './User';


export default interface IAuthState {
  user: IUser | undefined
  isLoading: boolean
  error: null | string
}
