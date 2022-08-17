import "./Buttons.css"

import {labels} from "../../utils/Utility.js"
import Button from "../Button/Button.js";

export default function Buttons(props){

    const buttons = labels;

    return (
        <div className="button-container">
            {buttons.map((button) => {
               return <Button
                   label={button.label}
                   className={button.className}
                   key={button.label}
                   clickHandler={props.clickHandler}
               />
            })}
        </div>
    );
}
