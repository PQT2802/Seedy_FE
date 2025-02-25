import { useState, useEffect } from "react";
import styles from "./priceFilter.module.css";

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
}

export default function PriceFilter({
  min,
  max,
  value,
  onChange,
}: PriceFilterProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: [number, number]): void => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString("vi-VN")}`;
  };

  return (
    <div className={styles.priceFilter}>
      <h4>Price</h4>
      <div className={styles.rangeSlider}>
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={(e) =>
            handleChange([parseInt(e.target.value), localValue[1]])
          }
          className={styles.slider}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={(e) =>
            handleChange([localValue[0], parseInt(e.target.value)])
          }
          className={styles.slider}
        />
      </div>
      <div className={styles.priceDisplay}>
        <span>{formatPrice(localValue[0])}</span>
        <span>-</span>
        <span>{formatPrice(localValue[1])}</span>
      </div>
    </div>
  );
}
