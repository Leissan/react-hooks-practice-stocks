import React from "react";

function Stock({stock, handleClick}) {

  //handleClick here is coming from both Portfolio Container ans StockContainer, 
  //so its 2 functions passed as one because its the same name
  return (
    <div>
      <div className="card" onClick ={() => handleClick(stock)}>
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{`${stock.ticker}: ${stock.price}`}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
