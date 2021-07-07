import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../store";
import { CurrentFood } from "./CurrentFood";
import { scrollSlice } from "../../../store/scrollSlice";

type propsType = {
  productsIds: any[];
  id: string;
  categoryId: number;
};
export const Product: FC<propsType> = (props) => {
  const delivery = useSelector(
    (state: StateType) => state.deliverySlice.delivery
  );
  const containers = useSelector(
    (state: StateType) => state.scrollSlice.containers
  );
  const dispatch = useDispatch();
  const [products, setProducts]: any[] = useState([]);
  useEffect(() => {
    fetch(
      `https://evening-brook-32083.herokuapp.com/products?ids=[${
        props.productsIds
      }]${delivery ? `&delivery=true` : ""}`
    )
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, [delivery]);

  const targetRef: any = useRef(null);
  useEffect(() => {
    dispatch(
      scrollSlice.actions.setContainerHeight({
        id: props.categoryId,
        height: targetRef.current.offsetHeight,
      })
    );
  }, [targetRef.current, products]);
  return (
    <div className="Product" id={props.id} ref={targetRef}>
      {products &&
        products.map((product: any) => (
          <CurrentFood key={product.id} food={product} />
        ))}
    </div>
  );
};
