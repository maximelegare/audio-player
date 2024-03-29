import React, {useState} from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styles from "../../styles/_Core/RadioGroup.module.scss";

const RadioGroupComponent = ({ radioButtons, defaultValue, handleChange }) => {


  return (
    <div>
      <RadioGroup.Root
        className={styles.RadioGroupRoot}
        aria-label="View density"
        defaultValue={defaultValue}
        onValueChange={(val) => handleChange({name:"radio", value:val})}
      >
        {radioButtons.map(({ id, title, value }) => (
          <div key={id} className="flex items-center">
            <RadioGroup.Item
              className={styles.RadioGroupItem}
              value={value}
              id={id}
            >
              <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
            </RadioGroup.Item>
            <label className={styles.Label} htmlFor="r1">
              {title}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default RadioGroupComponent;
