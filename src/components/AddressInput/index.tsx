import React, { FC } from "react";
import { Control, Controller, FieldName } from "react-hook-form";
import "./style.css";
import { mainFormType } from "../Delivery";

type propsType = {
  name: FieldName<mainFormType>;
  control: Control<mainFormType>;
  onSubmit?: (search: string) => void;
  placeholder: string;
  errors?: any;
};
export const AddressInput: FC<propsType> = (props) => {
  return (
    <div className="AddressInput">
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <input
            {...field}
            placeholder={props.placeholder}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        )}
      />
      {props.errors && (
        <div className="AddressInput__error">{props.errors.message}</div>
      )}
    </div>
  );
};
