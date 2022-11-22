import { useState, useEffect} from "react";
import axios from "axios";
import { Route } from 'react-router-dom';
import AppContext from './context'

import Drawer from "./components/drawer/Drawer";
import Header from "./components/header/Header"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {
      try {
        const cartResponse = await axios.get('https://6377f1615c4777651229e93a.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://6377f1615c4777651229e93a.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://6377f1615c4777651229e93a.mockapi.io/items');
  
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }

    fetchData()
  }, []);

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        axios.delete(`https://6377f1615c4777651229e93a.mockapi.io/favorites/${obj.id}`)
      } else {
        const { data } = await axios.post('https://6377f1615c4777651229e93a.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onAddToCart = async (obj) => {
    const findeItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    if (findeItem) {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      axios.delete(`https://6377f1615c4777651229e93a.mockapi.io/cart/${findeItem.id}`);
    } else {
      setCartItems((prev) => [...prev, obj])
      const { data } = await axios.post('https://6377f1615c4777651229e93a.mockapi.io/cart', obj);
      setCartItems((prev) => prev.map(item => {
        if (item.parentId === data.parentId){
          return {
            ...item,
            id: data.id
          };
        }
        return item;
      }))
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://6377f1615c4777651229e93a.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onRemoveItem={onRemoveItem} onClose={() => setCartOpened(false)} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="" exact>
          <Home 
            items={items}
            cartItems={cartItems}
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            onChangeSearchInput={onChangeSearchInput} 
            onAddToFavorite={onAddToFavorite} 
            onAddToCart={onAddToCart} 
            isLoading={isLoading}
          />
        </Route>

        <Route path="favorites" exact>
          <Favorites />
        </Route>
        <Route path="orders" exact>
          <Orders />
        </Route>

      </div>
    </AppContext.Provider>
  );
}

export default App;