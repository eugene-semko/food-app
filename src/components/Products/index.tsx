import React, { FC, useEffect, useRef, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import { Product } from "./Product";

type propsType = {};
export const Products: FC<propsType> = (props) => {
  const categories = useSelector(
    (state: StateType) => state.categoriesSlice.categories
  );

  return (
    <div className="Products">
      {categories.map((category) => {
        return (
          <Product
            key={category.id}
            productsIds={category.products}
            id={category.name}
            categoryId={category.id - 1}
          />
        );
      })}
    </div>
  );
};
