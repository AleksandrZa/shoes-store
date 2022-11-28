import Card from '../components/card/Card'

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading}) {

  const renderItems = () => {
    const folterItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(5)] : folterItems).map((item, i) => (
        <Card 
          key={i} 
          onFavorite={(i) => onAddToFavorite(i)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      ))
  }

   return (
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input
            value={searchValue} 
            onChange={onChangeSearchInput} 
            placeholder="Поиск..." 
            type="text" 
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()} 

      </div>
     </div> 
   )
}

export default Home;
