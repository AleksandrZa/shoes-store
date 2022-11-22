import React from 'react';
import AppContext from '../context';

const Info = ({ image, title, description }) => {
   const { setCartOpened } = React.useContext(AppContext)

   return (
      <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
         <img height={140} className='mb-20' src={image} alt="cart-cleare" />
         <h2>{title}</h2>
         <p className='opacity-5 text-center mb-10'>{description}</p>
         <button onClick={() => setCartOpened(false)} className='greenButton'>
            <img className='arrRevers' src="/img/arrow.svg" alt="arrow" />
            Вернуться назад
         </button>
      </div>
   );
};

export default Info;