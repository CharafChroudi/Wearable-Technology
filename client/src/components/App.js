import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar/Navbar"; // NavBar import
import Home from "./Home/Home"; // Home import
import Product from "./Products/Product";
import Cart from "./Cart/Cart";
import Payment from "./Cart/Payment";

//GlobalStyle import
import GlobalStyles from "./Globalstyles";

const App = () => {
  const [inCart, setInCart] = useState(null);
  // for product display on homepage
  const [products, setProducts] = useState([]);
  const [quantityTotal, setQuantityTotal] = useState(0);

  // for filter on homepage
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    companyId: "",
    inStock: "",
  });
  const getTotal = (cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      let priceToAdd = parseFloat(item.price.replace("$", ""));
      totalPrice += parseFloat((priceToAdd * 100) / 100);
    });
    return totalPrice;
  };
  const getCart = () => {
    fetch("/getCart")
      .then((response) => response.json())
      .then((data) => {
        const cart = data.data;
        setInCart(cart);
        let total = 0;
        cart.forEach((item) => {
          total += item.quantity;
        });
        setQuantityTotal(total);
      })
      .catch((error) => {
        console.error("No product found!:", error);
      });
  };
  useEffect(() => {
    fetch("/getProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("No product found!:", error);
      });
    getCart();
  }, []);

  return (
    <Router>
      <GlobalStyles /> {/* GlobalStyles added here */}
      <NavBar
        inCart={inCart}
        quantityTotal={quantityTotal}
        setQuantityTotal={setQuantityTotal}
      />
      <Switch>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/product/:_id"
          element={
            <Product
              inCart={inCart}
              setInCart={setInCart}
              quantityTotal={quantityTotal}
              setQuantityTotal={setQuantityTotal}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              inCart={inCart}
              setInCart={setInCart}
              getCart={getCart}
              setQuantityTotal={setQuantityTotal}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Payment
              inCart={inCart}
              getCart={getCart}
              getTotal={getTotal}
              setQuantityTotal={setQuantityTotal}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;
