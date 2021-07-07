import React, { FC, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categoriesSlice";
import { StateType } from "../../store";
import { NavHashLink as Link } from "react-router-hash-link";
import cn from "classnames";
import { log } from "util";
type propsType = {};
export const Categories: FC<propsType> = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: StateType) => state.categoriesSlice.categories
  );
  const windowScrollHeight = useSelector(
    (state: StateType) => state.scrollSlice.windowScrollHeight
  );
  const containers = useSelector(
    (state: StateType) => state.scrollSlice.containers
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const [sectionId, setSectionId] = useState(0);
  useEffect(() => {}, [windowScrollHeight]);
  const activeCategoryHandler = (id: number) => {
    console.log();
    if (id == 0 && containers[id] - 400 > windowScrollHeight) {
      return "Categories__scroll--active";
    } else if (containers[id] - containers[0] - 100 <= windowScrollHeight) {
      return "Categories__scroll--active";
    } else return "Categories__category";
  };
  return (
    <div className="Categories">
      {categories.map((category) => {
        return (
          <Link
            className={"Categories__category--default"}
            activeClassName={"Categories__category--active"}
            smooth
            to={`#${category.name}`}
            key={category.id}
          >
            <button className={activeCategoryHandler(category.id - 1)}>
              {category.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
};
