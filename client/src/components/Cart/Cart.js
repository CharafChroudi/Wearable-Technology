import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/Cart.png";
import styled from "styled-components";
const Cart = ({ inCart, setInCart, getCart, setQuantityTotal, getTotal }) => {
  const navigation = useNavigate();
  useEffect(() => {
    setInCart(inCart);
  }, [inCart]);
  const handleOnClick = (cartItem) => {
    fetch("/removeFromCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: cartItem._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setQuantityTotal(
            (quantityTotal) => (quantityTotal -= cartItem.quantity)
          );
          setInCart(inCart);
          getCart();
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 style={{ fontSize: "3rem", marginLeft: "2rem" }}>Your Cart</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10rem",
            marginBottom: "2rem",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          {inCart &&
            inCart.map((cartItem) => {
              return (
                <div key={cartItem.name}>
                  <h2 style={{ maxWidth: "50%", marginLeft: "25%" }}>
                    {cartItem.name}
                  </h2>
                  <img src={cartItem.imageSrc} alt="" />
                  <h3>Quantity: {cartItem.quantity}</h3>
                  <h3>Price: {cartItem.price}</h3>
                  <button
                    onClick={() => {
                      handleOnClick(cartItem);
                    }}
                    style={{
                      backgroundColor: "#00ffff",
                      width: "500px",
                      height: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                      fontWeight: "bold",
                      borderRadius: "20px",
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            })}
        </div>
        <StyledCart src={cart} />
        <button
          onClick={() => {
            navigation("/checkout");
          }}
          style={{
            backgroundColor: "yellow",
            width: "500px",
            height: "100px",
            fontSize: "32px",
            fontWeight: "bold",
            borderRadius: "20px",
            position: "fixed",
            top: "12vh",
            right: "5vw",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

const StyledCart = styled.img`
  position: fixed;
  right: 20vh;
  top: 40vh;
`;
export default Cart;
