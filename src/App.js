import React from "react";
import "./App.css";

  
class App extends React.Component{
  constructor(){
      super();
      this.state ={
          Count:0
      }
  }
  increaseCount(){
    this.setState({
      Count: this.state.Count +1
    })
  }
  decreaseCount(){
    this.setState({
      Count: this.state.Count -1
    })
  }

render() {
  return(
    <div className="ABC">
      <h1>Assigment</h1>
    <p> Count = {this.state.Count} </p>
    <button onClick={
      ()=>{
        this.increaseCount();
      }
    }>+ Increase</button>
    <button onClick={
      () =>{
        this.decreaseCount()
      }
    }>- Decrease</button>
    

    </div>
  )
}
}

export default App;
