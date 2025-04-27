import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((result) => {
        console.log("req sent");
        return result.json();
      })
      .then((result) => {
        setData(result);
        setIsPending(false);
        setErr(null);
        console.log(result);
      })
      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 class="page-title">OUR AMAZING PRODUCTS</h1>

      {isPending && <h3 className="loading">loading...</h3>}
      <div className="product-list">
        {data &&
          data.products.map((product, i) => {
            fetch("https://dummyjson.com/products").then(console.log("hello"));
            console.log(product);
            return (
              <div className="product-container" key={i}>
                <img className="images" src={product.images[0]} />
                <h2>{product.title}</h2>
                <div className="product-desc">{product.description}</div>
                <div className="prices">
                  <div className="actual-price">
                    $
                    {Math.round(
                      (product.price * (100 - product.discountPercentage)) / 100
                    ) - 0.01}
                  </div>
                  <div className="grey-price">${product.price}</div>
                </div>
              </div>
            );
          })}
      </div>

      <div>
        {!isPending && <button className="load-button">Load More</button>}
      </div>
    </div>
  );
};

export default Home;
