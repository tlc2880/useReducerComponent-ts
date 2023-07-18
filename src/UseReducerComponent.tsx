import { useState, useReducer } from "react";
import "./App.css"

const initialState = {
  counter: 0,
  numArr: [1, 2]
};

type ACTIONTYPES =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "addArray"; payload: number }
  | { type: "multArray"; payload: number }
  | { type: "reset"; payload: null }
  | { type: "incAmount"; payload: number };

function counterReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + action.payload
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - action.payload
      };
    case "multArray":
      let numArrTemp = [...state.numArr];
      numArrTemp.forEach((item, index, arr) => {
        arr[index] = item * action.payload;
      });
      return {
        ...state,
        numArr: numArrTemp
      };
    case "addArray":
      return {
        ...state,
        numArr: [...state.numArr, state.numArr.length + 1]
      };
    case "reset":
      return {
        ...state,
        counter: 0
      };
    case "incAmount":
      return {
        ...state,
        counter: state.counter + action.payload
      };
    default:
      throw new Error("Bad action");
  }
}

export default function UseReducerComponent() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [incAmount, setIncAmount] = useState("1");
  const [arrMultAmt, setArrMultAmt] = useState(2);

  return (
    <div>
      <div>Counter: {state.counter}</div>
      <div>Num Array: {JSON.stringify(state.numArr)}</div>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: "increment",
              payload: Number(incAmount)
            })
          }
        >
          Increment
        </button>
        |
        <button
          onClick={() =>
            dispatch({
              type: "decrement",
              payload: Number(incAmount)
            })
          }
        >
          Decrement
        </button>
        |
        <button
          onClick={() =>
            dispatch({
              type: "reset",
              payload: null
            })
          }
        >
          Reset
        </button>
        |
        <input
          type="number"
          className={"textbox"}
          value={incAmount}
          onChange={(e) => setIncAmount(e.target.value)}
        />
        <input
          type="number"
          className={"textbox"}
          value={arrMultAmt}
          onChange={(e) => setArrMultAmt(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() =>
            dispatch({
              type: "multArray",
              payload: arrMultAmt
            })
          }
        >
          Mult Array
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "addArray",
              payload: 1
            })
          }
        >
          Add Array
        </button>
      </div>
    </div>
  );
}