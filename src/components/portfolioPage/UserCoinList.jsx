"use client";

const UserCoinList = ({ data }) => {
  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  return (
    <div className="flex">
      {Object.keys(data.userCoins).map((coinId) => {
        const coin = data.userCoins[coinId];
        const currentCoin = data.currentCoins[coin.id];
        return (
          <div key={generateId()} className="flex">
            <div>
              <h1>{coin.name}</h1>
            </div>
            <div>
              <div className="m-5">
                {currentCoin ? (
                  <div>
                    <h1>Current Price</h1>
                    <div>{currentCoin.current_price}</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="m-5">
                <h1>User Price</h1>
                <p>{coin.market_data.current_price.usd}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCoinList;
