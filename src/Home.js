import { useEffect, useState } from "react";

const Home = () => {
  const [skip, setSkip] = useState(12);
  const limit = 12;
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState();

  const handleClick = () => {
    setIsPending(true);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => {
        return res.json();
      })
      .then((newProducts) => {
        console.log(skip);
        setSkip(skip + limit);
        const updatedData = {
          ...data,
          products: [...data.products, ...newProducts.products],
        };
        setData(updatedData);
        setIsPending(false);
        setErr(null);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${limit}`)
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
      <h1 className="page-title">OUR AMAZING PRODUCTS</h1>

      <div className="product-list">
        {data &&
          data.products.map((product, i) => {
            const price =
              Math.round(
                (product.price * (100 - product.discountPercentage)) / 100
              ) - 0.01;
            // console.log(product);
            return (
              <div className="product-container" key={i}>
                <img
                  className="images"
                  src={product.images[0]}
                  alt={product.title}
                />
                <h2>{product.title}</h2>
                <div className="product-desc">{product.description}</div>
                <div className="prices">
                  <div className="actual-price">${price}</div>
                  {price === product.price ? null : (
                    <div className="grey-price">${product.price}</div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {isPending && <h3 className="loading">loading...</h3>}

      <div>
        {!isPending && (
          <button onClick={handleClick} className="load-button">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
