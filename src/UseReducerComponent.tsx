import { useState, useReducer } from "react";
import "./App.css"

const initialState = {
  counter: 0,
  numArr: [1, 2],
  wordArr: [
    "javascript",
    "react",
    "JavaScript",
    "code",
    "React",
    "javaScript",
    "coDe"
  ],
  obj: {
    objNum: 10,
    objNumArr: [11, 22],
    objWordArr: ["One", "Two", "one", "two", "three", "onE"]
  },
  wordCount: {},
  objWordCount: {}
};

type ACTIONTYPES =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "objIncrement"; payload: number }
  | { type: "objDecrement"; payload: number }
  | { type: "addArray"; payload: number }
  | { type: "objAddArray"; payload: number }
  | { type: "multArray"; payload: number }
  | { type: "objMultArray"; payload: number }
  | { type: "pushStrArray"; payload: string }
  | { type: "objPushStrArray"; payload: string }
  | { type: "reset"; payload: null }
  | { type: "objReset"; payload: number }
  | { type: "incAmount"; payload: number }
  | { type: "wordCount"; payload: null }
  | { type: "objWordCount"; payload: null };

function counterReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + action.payload };
    case "decrement":
      return { ...state, counter: state.counter - action.payload };
    case "objIncrement":
      return {
        ...state,
        obj: { ...state.obj, objNum: state.obj.objNum + action.payload }
      };
    case "objDecrement":
      return {
        ...state,
        obj: { ...state.obj, objNum: state.obj.objNum - action.payload }
      };
    case "multArray":
      let numArrTemp = [...state.numArr];
      numArrTemp.forEach((item, index, arr) => {
        arr[index] = item * action.payload;
      });
      return { ...state, numArr: numArrTemp };
    case "objMultArray":
      let objNumArrTemp = [...state.obj.objNumArr];
      objNumArrTemp.forEach((item, index, arr) => {
        arr[index] = item * action.payload;
      });
      return {
        ...state,
        obj: { ...state.obj, objNumArr: objNumArrTemp }
      };
    case "addArray":
      return {
        ...state,
        numArr: [...state.numArr, state.numArr.length + 1]
      };
    case "objAddArray":
      return {
        ...state,
        obj: {
          ...state.obj,
          objNumArr: [...state.obj.objNumArr, state.obj.objNumArr.length + 1]
        }
      };
    case "pushStrArray":
      return {
        ...state,
        wordArr: [...state.wordArr, action.payload]
      };
    case "objPushStrArray":
      return {
        ...state,
        obj: {
          ...state.obj,
          objWordArr: [...state.obj.objWordArr, action.payload]
        }
      };
    case "reset":
      return { ...state, counter: 0 };
    case "objReset":
      return {
        ...state,
        obj: { ...state.obj, objNum: action.payload }
      };
    case "incAmount":
      return { ...state, counter: state.counter + action.payload };
    case "wordCount":
      const wordCount: any = {};
      for (const element of state.wordArr) {
        let element1 = element.toLowerCase();
        if (wordCount[element1]) {
          wordCount[element1] += 1;
        } else {
          wordCount[element1] = 1;
        }
      }
      //console.log(wordCount);
      return { ...state, wordCount };
    case "objWordCount":
      const objWordCount: any = {};
      for (const element of state.obj.objWordArr) {
        let element1 = element.toLowerCase();
        if (objWordCount[element1]) {
          objWordCount[element1] += 1;
        } else {
          objWordCount[element1] = 1;
        }
      }
      return { ...state, objWordCount };
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
      <h3>Number Array: {JSON.stringify(state.numArr)}</h3>
      <h3>Object: {JSON.stringify(state.obj)}</h3>
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
        </button>{" "}
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
          value={incAmount}
          onChange={(e) => setIncAmount(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() =>
            dispatch({
              type: "objIncrement",
              payload: incAmount
            })
          }
        >
          Obj Inc
        </button>
        |
        <button
          onClick={() =>
            dispatch({
              type: "objDecrement",
              payload: incAmount
            })
          }
        >
          Obj Dec
        </button>
        |
        <button
          onClick={() =>
            dispatch({
              type: "objReset",
              payload: 10
            })
          }
        >
          Obj Reset
        </button>
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
              type: "objMultArray",
              payload: arrMultAmt
            })
          }
        >
          Mult Obj Array
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
        <button
          onClick={() =>
            dispatch({
              type: "objAddArray",
              payload: 1
            })
          }
        >
          Push Obj Num
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
        <button
          onClick={() => {
            dispatch({
              type: "objPushStrArray",
              payload: inStr
            });
          }}
        >
          Push Obj Word
        </button>
        <h3>Word Array: {JSON.stringify(initialState.wordArr)}</h3>
        <button
          onClick={() => {
            dispatch({
              type: "wordCount",
              payload: null
            });
            setInStr(""); // clear the input box
          }}
        >
          Word count
        </button>
        <h3>Word count: {JSON.stringify(state.wordCount)}</h3>
        <button
          onClick={() => {
            dispatch({
              type: "objWordCount",
              payload: null
            });
            setInStr(""); // clear the input box
          }}
        >
          Obj word count
        </button>
        <h3>Object word count: {JSON.stringify(state.objWordCount)}</h3>
      </div>
    </div>
  );
}

export default UseReducerComponent;