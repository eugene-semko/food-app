import React, { useEffect, useState } from "react";
import "./App.css";
import "./style/index.css";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { Basket } from "./components/Basket";
import { Delivery } from "./components/Delivery";
import { useDispatch } from "react-redux";
import { scrollSlice } from "./store/scrollSlice";

function App() {
  const dispatch = useDispatch();
  const handleScroll = () => {
    dispatch(scrollSlice.actions.setWindowScrollHeight(window.pageYOffset));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="App">
      <Basket />
      <Delivery />
      <Categories />
      <Products />
    </div>
  );
}

export default App;
