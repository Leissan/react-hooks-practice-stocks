import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])

  const [sortBy, setSortBy] = useState('')
  const [filtered, setFiltered] = useState("All")

  useEffect(() => {
    fetch ('http://localhost:3001/stocks')
    .then (res => res.json() )
    .then (data => setStocks(data))
  },[])

  useEffect(() => {
    if (sortBy === "Alphabetically") {
     const sortedStocks = sortByName()
     setStocks(sortedStocks)
    }else{
      const sortedStocks = sortByPrice()
     setStocks(sortedStocks)
    }

  }, [sortBy])

  const sortStocks = (e) => {
   // e.target.value tells us if we are sorting alfabetically or by price
   setSortBy(e.target.value)
  }

  const filterStocks = (e) => {
    setFiltered(e.target.value)
  }

  let stocksGotFiltered = stocks.filter ( stock => {
    if (filtered === "All") return true;
    return stock.type.toUpperCase() === filtered.toUpperCase()
  })
 



  const sortByName = () => {
    return [...stocks].sort (function(a,b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    });
  }

  const sortByPrice = () => {
    return [...stocks].sort (function(a,b) {
     
      return a.price - b.price
    });
  }


  const buyStock = (stock) => {
    //making sure we dont add something we already have in our portfolio
    if (!myStocks.includes(stock)){
    const updatedMyStocks = [...myStocks, stock]
    setMyStocks (updatedMyStocks)
  } else {
    alert ('you already have it brah')
  }}

  const sellStock = (stock) => {
    const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updatedMyStocks)
  }

  

  return (
    <div>
      <SearchBar sortStocks = {sortStocks} sortBy={sortBy} filterStocks={filterStocks}
       filtered={filtered}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksGotFiltered} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          
          <PortfolioContainer stocks={myStocks} handleClick = {sellStock}/> 
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
