import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import pay from "../../assets/Pay.png";

const Payment = ({ inCart, getCart, setQuantityTotal, getTotal }) => {
  useEffect(() => {
    if (inCart) {
      setpriceTotal(getTotal(inCart));
    }
  }, []);
  const [priceTotal, setpriceTotal] = useState(0);
  const [notification, setNotification] = useState(false);
  const handleCheckout = (e) => {
    fetch("/checkoutCart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inCart }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setNotification({
            message: "Items succesfully purchased!!",
            type: "success",
          });
          getCart();
          setQuantityTotal(0);
          setpriceTotal(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <StyledPay>
      <h1>Your total: ${priceTotal}</h1>
      <button
        style={{
          backgroundColor: "yellow",
          width: "500px",
          height: "100px",
          fontSize: "32px",
          fontWeight: "bold",
          borderRadius: "20px",
        }}
        onClick={() => {
          handleCheckout();
        }}
      >
        Pay
      </button>
      <img src={pay} style={{ height: "30vh", marginTop: "10vh" }} />
      {notification && (
        <StyledNotification type={notification.type}>
          {notification.message}
        </StyledNotification>
      )}
    </StyledPay>
  );
};

const StyledPay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 40px;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const StyledNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 18px;
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.01s 4s forwards;
`;
export default Payment;
