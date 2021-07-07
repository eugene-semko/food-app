import React, { FC, useEffect, useState, Suspense } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../store";
import { basketSlice } from "../../../../store/basketSlice";
//@ts-ignore
import { LazyLoad } from "react-observer-api";
import { ImageComponent } from "./ImageComponent";

type propsType = {
  food: any;
};
export const CurrentFood: FC<propsType> = (props) => {
  const dispatch = useDispatch();
  const basket = useSelector((state: StateType) => state.basketSlice.basket);

  const addFoodHandler = () => {
    dispatch(basketSlice.actions.addFood(props.food));
  };
  const removeFoodHandler = () => {
    dispatch(basketSlice.actions.removeFood(props.food));
  };
  const removeButton = () => {
    let indexOf;
    let count;
    basket.map((item, index: number) => {
      if (item.product.id == props.food.id) {
        indexOf = index;
        count = item.count;
      }
    });
    if (typeof indexOf == "number" && count) {
      return (
        <button
          className="CurrentFood__counter-button"
          onClick={removeFoodHandler}
        >
          -
        </button>
      );
    }
  };
  return (
    <div className="CurrentFood">
      <div className="CurrentFood__food-wrapper">
        <ImageComponent food={props.food} />

        <p className="CurrentFood__food-name">{props.food.name}</p>
      </div>
      <div className="CurrentFood__counter">
        {removeButton()}
        <p className="CurrentFood__counter-price">{props.food.price}$</p>
        <button
          className="CurrentFood__counter-button"
          onClick={addFoodHandler}
        >
          +
        </button>
      </div>
    </div>
  );
};
