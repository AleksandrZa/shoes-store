import { useState, useContext } from "react";
import Info from "../info";
import AppContext from '../../context';
import axios from "axios";
import styles from './Drawer.module.scss'


function Drawer({onClose, onRemoveItem, items = [], opened }) {
   const [isOrderComplited, setIsOrderComplited] = useState(false);
   const [orderId, setOrderId] = useState(null)
   const [isLoading, setIsLoading] = useState(false);

   const { cartItems, setCartItems } = useContext(AppContext);
   const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)

   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post('https://6377f1615c4777651229e93a.mockapi.io/orders', { items: cartItems });
         setOrderId(data.id);
         setIsOrderComplited(true);
         setCartItems([])

         for (let i = 0; i< cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete('https://6377f1615c4777651229e93a.mockapi.io/cart/' + item.id)
         }
         
      } catch (error) {
         alert('Не удалось оформить заказ!')
      }
      setIsLoading(false)
   }

   return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
         <div className={styles.drawer}>
         <h2 className="wrpr d-flex justify-between mb-30">Корзина<img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="btnRemove" /></h2>
         
         { 
            items.length > 0 ? (
               <>
                  <div className="items flex">
                     {items.map((obj, i) => (
                        <div key={i} className="cartItem d-flex align-center mb-20">
                           <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                           <div className="mr-20 flex">
                              <p className="mb-5">{obj.title}</p>
                              <b>{obj.price} руб.</b>
                           </div>
                           <img onClick={() => onRemoveItem(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="btnRemove" />
                        </div>
                     ))}
                  </div>
                  <div className="cartTotalBlock">
                     <ul>
                        <li className="d-flex">
                           <span>Итого:</span>
                           <div></div>
                           <b>{totalPrice} руб.</b>
                        </li>
                        <li className="d-flex">
                           <span>Налог 5%:</span>
                           <div></div>
                           <b>{Math.floor(totalPrice * 0.05)} руб.</b>
                        </li>
                     </ul>
                     <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                        Оформить заказ <img src="img/arrow.svg" alt="arrow" />
                     </button>
                  </div>
               </>
               ) : ( 
                     <Info 
                        title={isOrderComplited ? "Заказ оформлен!" : "Корзина пустая"} 
                        description={isOrderComplited ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавте хотя бы одну позицию кроссовок, что бы сделать заказ"} 
                        image={isOrderComplited ? "img/orderComplited.png" : "img/cartClear.png"} 
                     /> 
                  )
         }
         
      </div>
    </div>
   );
}

export default Drawer;