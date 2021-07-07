import React, { FC } from "react";
import "./style.css";
import { ReactComponent as BasketIcon } from "../../assets/Basket.svg";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store";
import { basketSlice } from "../../store/basketSlice";

type propsType = {};
export const Basket: FC<propsType> = (props) => {
  const basketPrice = useSelector(
    (state: StateType) => state.basketSlice.basketPrice
  );
  const basketCount = useSelector(
    (state: StateType) => state.basketSlice.basketCount
  );
  const basket = useSelector((state: StateType) => state.basketSlice.basket);
  const address = useSelector((state: StateType) => state.basketSlice.address);
  const delivery = useSelector(
    (state: StateType) => state.deliverySlice.delivery
  );

  const dispatch = useDispatch();
  const sendBasketHandler = () => {
    if (
      basket.length > 0 &&
      basket[0].count > 0 &&
      ((delivery && (address.city != "" || address.street != "")) || !delivery)
    ) {
      console.log("!--------Order------------!");
      delivery && console.log(address);
      console.log(basket);
      console.log("!-------------------------!");
      dispatch(basketSlice.actions.resetBasket());
    } else if (delivery && (address.city == "" || address.street == "")) {
      alert("Set address!");
    } else alert("Order something!");
  };
  return (
    <div className="Basket">
      <div className="Basket__icon" onClick={sendBasketHandler}>
        {React.createElement(BasketIcon)}
      </div>
      <div className="Basket__counter">
        <div className="Basket__cost">{basketPrice}$</div>
        <div className="Basket__amount">{basketCount}</div>
      </div>
    </div>
  );
};
