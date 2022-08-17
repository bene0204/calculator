import "./Button.css"

export default function Button(props){

    function clickHandler(){
        props.clickHandler(props.label);
    }

    return (
        <button className={`button ${props.className}`} onClick={clickHandler}>
            {props.label}
        </button>
    );
}
