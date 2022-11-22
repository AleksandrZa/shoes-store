import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';

function Header (props) {
	const { cartItems } = useContext(AppContext)
	const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="">
				<div className="d-flex align-center">
					<img width={40} height={40} src="img/logo.png" alt="logo" />
					<div className="headerInfo">
						<h3 className="text-uppercase">React app</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
		<ul className="d-flex">
			<li onClick={props.onClickCart} className="mr-30 cu-p">
				<img width={18} height={18} src="img/cart.svg" alt="Корзина" />
				<span>{totalPrice} руб.</span>
			</li>
			<li>
				<Link to="favorites"><img className="mr-20 cu-p" width={18} height={18} src="img/heart.svg" alt="Закладки" /></Link>
			</li>
			<li>
				<Link to="orders"><img className="cu-p" width={18} height={18} src="img/user.svg" alt="Пользователь" /></Link>
			</li>
			</ul>
  	</header>
	);

};

export default Header;
