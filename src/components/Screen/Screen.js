import "./Screen.css"

export default function Screen(props){
    let expression = props.expression

    return (
        <div className="screen">
            <h2>
                {expression}
            </h2>
        </div>
    );
}
