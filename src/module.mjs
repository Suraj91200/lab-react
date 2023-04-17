import React from "react";
import ReactDOM from "react";
class DemoComponent extends React.Component{l
    render(){
        return(
            <div>
                <h2>hello {this.props.user}</h2>
                <h3>welcome to geeksforgeeks</h3>
            </div>
        );
    }
}

ReactDOM.render(
    <DemoComponent user = "suraj jaisal"/>,
    document.getElementById("root")
);
