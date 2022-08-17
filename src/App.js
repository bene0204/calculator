
import './App.css';
import Screen from "./components/Screen/Screen.js";
import Buttons from "./components/Buttons/Buttons.js";
import {useState} from "react";

function App() {

    const [expression, setExpression] = useState("");

    function clickHandler(label){
        switch (label){
            case "Clear":
                setExpression("");
                break;
            case "=":
                solve();
                break;
            case "Memory Save":
                saveToMemory();
                break;
            case "Memory Read":
                readFromMemory();
                break;

            default:
                setExpression(expression + label);
                break;
        }

    }

    function solve(){
        const value = eval(expression);
        setExpression(value);

    }

    function saveToMemory (){
        fetch('http://localhost:5000/save', {
            method: 'POST',
            body: JSON.stringify({
                number: +expression
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((response) => {
                if(!response.ok){
                    return Promise.reject(response);
                }
                console.log("OK")
            })
            .catch((err) => {
                setExpression("ERROR");
                console.log("Error", err)
            })
    }

    function readFromMemory(){
        fetch('http://localhost:5000/read')
            .then((response) => response.json())
            .then((body) => {
                console.log("OK")
                setExpression(expression + body.number)
            })
    }


  return (
    <>
     <Screen expression={expression}/>
        <Buttons clickHandler={clickHandler}/>
    </>
  );
}

export default App;
