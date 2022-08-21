
import './App.css';
import Screen from "./components/Screen/Screen.js";
import Buttons from "./components/Buttons/Buttons.js";
import {useState} from "react";

function App() {

    const [expression, setExpression] = useState("");

    if(expression.length > 13){
        setExpression(expression.slice(0,13))
    }

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
        try {
            const value = +eval(expression).toFixed(4);
            setExpression(value.toString());
        } catch ( err ){
            setExpression("ERROR");
        }


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
                const exp = expression;
                setExpression("SAVED");
                setTimeout(() => {
                    setExpression(exp);
                },1000)
            })
            .catch((err) => {
                setExpression("ERROR");
            })
    }

    function readFromMemory(){
        fetch('http://localhost:5000/read')
            .then((response) => response.json())
            .then((body) => {
                if(expression === "ERROR"){
                    setExpression(body.number);
                } else {
                    setExpression(expression + body.number)
                }

            })
            .catch((err) => {
            setExpression("ERROR");
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
