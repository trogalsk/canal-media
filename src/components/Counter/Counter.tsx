import { useState } from "react";

import { useAppSelector, useAppDispatch, MediaStore } from "../../store";
import styles from "./Counter.module.css";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(MediaStore.selectCount);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(MediaStore.decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(MediaStore.increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(MediaStore.incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            dispatch(MediaStore.getMovieList({ mediaListId: "xxx" }))
          }
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(MediaStore.incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};
