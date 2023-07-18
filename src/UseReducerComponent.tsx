import { useState, useReducer } from "react";
import "./App.css"

const initialState = {
  counter: 10
};

type ACTIONTYPES =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
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
  const [incAmount, setIncAmount] = useState("2");
  return (
    <div>
      <h3>{state.counter}</h3>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: "increment",
              payload: 10
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
              payload: 5
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
          className={'textbox'}
          value={incAmount}
          onChange={(e) => setIncAmount(e.target.value)}
        />
        |
        <button
          onClick={() =>
            dispatch({
              type: "incAmount",
              payload: Number(incAmount)
            })
          }
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}