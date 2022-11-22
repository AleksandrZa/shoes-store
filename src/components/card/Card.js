import { useContext, useState } from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';

import styles from './Card.module.scss';

function Card ({id, title, price, imageUrl, onAddToFavorite, onPlus, onFavorite, favorited = false , loading = false}) {
	const { isItemAdded } = useContext(AppContext)
	const [isFavorite, setIsFavorite] = useState(favorited);
	const obj = { id, parentId:id, title, price, imageUrl }

	const onClickBtn = () => {
		onPlus(obj)
	}

	const onClickFvr = () => {
		onFavorite(obj)
		setIsFavorite(!isFavorite);
	}

  return (
	<div className={styles.card}>

		{
			loading ? (
				<>
					<ContentLoader 
						speed={2}
						width={155}
						height={276}
						viewBox="0 0 150 282"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="0" y="50" rx="10" ry="10" width="150" height="130" /> 
						<rect x="0" y="195" rx="5" ry="5" width="150" height="15" /> 
						<rect x="0" y="216" rx="5" ry="5" width="95" height="15" /> 
						<rect x="0" y="248" rx="5" ry="5" width="80" height="25" /> 
						<rect x="116" y="238" rx="6" ry="6" width="35" height="35" />
						<rect x="0" y="0" rx="6" ry="7" width="35" height="35" />
					</ContentLoader> 
				</>	 
					) : (
				<>
					{onFavorite && <div className="favorite" onClick={onAddToFavorite}>
						<img className={styles.plus} onClick={onClickFvr} src={isFavorite ? "img/like-on.svg" : "img/like-off.svg"} alt="like" />
					</div>}
					<img width={133} height={112} src={imageUrl} alt="" />
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
							{onPlus && <img className={styles.plus} onClick={onClickBtn} src={isItemAdded(id) ? "img/btn-added.svg" : "img/btn-plus.svg"} alt="plus" />}
					</div>
				</>)
		}
			
	
	</div>
   );
}

export default Card;