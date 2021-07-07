import React, { FC, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store";
import cn from "classnames";
import { deliverySlice } from "../../store/deliverySlice";
import { basketSlice } from "../../store/basketSlice";
import { useForm } from "react-hook-form";
import { AddressInput } from "../AddressInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type propsType = {};
export type mainFormType = {
  city: string;
  street: string;
};
const validationSchema = yup.object().shape({
  city: yup.string().required("Enter city"),
  street: yup.string().required("Enter street"),
});
export const Delivery: FC<propsType> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<mainFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      city: "",
      street: "",
    },
  });
  const delivery = useSelector(
    (state: StateType) => state.deliverySlice.delivery
  );
  const dispatch = useDispatch();
  const basket = useSelector((state: StateType) => state.basketSlice.basket);
  const setDeliveryTrueHandler = () => {
    if (delivery == false) {
      dispatch(deliverySlice.actions.setDeliveryTrue());
      dispatch(basketSlice.actions.resetBasket());
    }
  };
  const setDeliveryFalseHandler = () => {
    if (delivery == true) {
      dispatch(deliverySlice.actions.setDeliveryFalse());
      dispatch(basketSlice.actions.resetBasket());
    }
  };
  return (
    <div className="Delivery">
      <div className="Delivery__buttons">
        <button
          className={cn({
            Delivery__button: true,
            "Delivery__button--active": !delivery,
          })}
          onClick={setDeliveryFalseHandler}
        >
          Pickup
        </button>
        <button
          className={cn({
            Delivery__button: true,
            "Delivery__button--active": delivery,
          })}
          onClick={setDeliveryTrueHandler}
        >
          Delivery
        </button>
      </div>
      {delivery && (
        <form
          className="Delivery__form"
          onSubmit={handleSubmit((data) => {
            if (basket.length > 0 && basket[0].count > 0) {
              console.log("!--------Order------------!");
              console.log(data);
              console.log(basket);
              console.log("!-------------------------!");
              setValue("city", "");
              setValue("street", "");
            } else alert("Order something!");
            dispatch(basketSlice.actions.resetBasket());
          })}
        >
          <AddressInput
            name="city"
            control={control}
            placeholder="City"
            errors={errors.city && errors.city}
          />
          <AddressInput
            name="street"
            control={control}
            placeholder="Street/house"
            errors={errors.street && errors.street}
          />
          <button className="Delivery__form-button" type="submit">
            Set address
          </button>
        </form>
      )}
    </div>
  );
};
