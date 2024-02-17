import IShopItem from "./ShopItem";

export default interface IShopState {
    items: IShopItem[],
    isLoading: boolean,
    error: null | string,
    favorites: number[]
}
