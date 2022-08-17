import "./Screen.css"

export default function Screen(props){
    let expression = props.expression
    if (expression.length > 13){
        expression = expression.slice(0, 13);
    }
    return (
        <div className="screen">
            <h2>
                {expression}
            </h2>
        </div>
    );
}
