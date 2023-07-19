import { useState, useReducer } from "react";
import "./App.css"

const initialState = {
  counter: 0,
  numArr: [1, 2],
  wordArr: ["One", "Two"]
};

type ACTIONTYPES =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "addArray"; payload: number }
  | { type: "multArray"; payload: number }
  | { type: "pushStrArray"; payload: string }
  | { type: "reset"; payload: null }
  | { type: "incAmount"; payload: number };

function counterReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + action.payload };
    case "decrement":
      return { ...state, counter: state.counter - action.payload };
    case "multArray":
      let numArrTemp = [...state.numArr];
      numArrTemp.forEach((item, index, arr) => {
        arr[index] = item * action.payload;
      });
      return { ...state, numArr: numArrTemp };
    case "addArray":
      return {
        ...state,
        numArr: [...state.numArr, state.numArr.length + 1]
      };
    case "pushStrArray":
      return {
        ...state,
        wordArr: [...state.wordArr, action.payload]
      };
    case "reset":
      return { ...state, counter: 0 };
    case "incAmount":
      return { ...state, counter: state.counter + action.payload };
    default:
      throw new Error("Bad action");
  }
}

function UseReducerComponent() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [incAmount, setIncAmount] = useState(1);
  const [arrMultAmt, setArrMultAmt] = useState(2);
  const [inStr, setInStr] = useState("");
  return (
    <div>
      <h3>Counter: {state.counter}</h3>
      <h3>Num Array: {JSON.stringify(state.numArr)}</h3>
      <h3>String Array: {JSON.stringify(state.wordArr)}</h3>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: "increment",
              payload: incAmount
            })
          }
        >
          Inc
        </button>
        |
        <button
          onClick={() =>
            dispatch({
              type: "decrement",
              payload: incAmount
            })
          }
        >
          Dec
        </button>
        |
        <input
          type="number"
          className={"numberbox"}
          value={incAmount}
          onChange={(e) => setIncAmount(parseInt(e.target.value, 10))}
        />
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
          className={"numberbox"}
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
          Push Num
        </button>
        <input
          type="string"
          className={"textbox"}
          value={inStr}
          onChange={(e) => setInStr(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({
              type: "pushStrArray",
              payload: inStr
            });
            setInStr(""); // clear the input box
          }}
        >
          Push Word
        </button>
      </div>
    </div>
  );
}

export default UseReducerComponent;