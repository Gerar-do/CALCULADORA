import React, { useState } from "react";
import "../assets/style/Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [operations, setOperations] = useState([]);
  const [operationTree, setOperationTree] = useState("");
  const [operationElements, setOperationElements] = useState([]);

  const handleClick = (e) => {
    setInput(input + e.target.name);
  };

  const calculate = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      setOperations([...operations, `${input} = ${result}`]);
      setOperationTree(createOperationTree(input));
      setOperationElements([...operationElements, ...input.split(/\b/)]);
    } catch (error) {
      setInput("Error");
    }
  };

  const clear = () => {
    setInput("");
    setOperations([]);
    setOperationTree("");
    setOperationElements([]);
  };

  const deleteDigit = () => {
    setInput(input.slice(0, -1));
  };

  const createOperationTree = (input) => {
    const elements = input.split(/(\+|\-|\/|\*|\(|\))/).filter(Boolean);
    let tree = "";
    elements.forEach((element, index) => {
      const symbol = index % 2 === 0 ? "" : "";
      if (element !== "") {
        tree += symbol + " ".repeat(index) + element + "\n";
      }
    });
    return tree;
  };  


  const getTokenType = (token) => {
    if (!isNaN(token)) {
      return "Número";
    } else if (['+', '-', '*', '/'].includes(token)) {
      return "Operador";
    } else if (['(', ')'].includes(token)) {
      return "Paréntesis";
    } else if (/\./.test(token)) {
      return "Punto Decimal";
    } else {
      return "Desconocido";
    }
  };
  

  return (
    <div className="container">
   
      <div className="box-calculator">
        <div className="input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button name="1" onClick={handleClick}>1</button>
          <button name="2" onClick={handleClick}>2</button>
          <button name="3" onClick={handleClick}>3</button>
          <button name="+" onClick={handleClick}>+</button>
        </div>
        <div className="buttons">
          <button name="4" onClick={handleClick}>4</button>
          <button name="5" onClick={handleClick}>5</button>
          <button name="6" onClick={handleClick}>6</button>
          <button name="-" onClick={handleClick}>-</button>
        </div>
        <div className="buttons">
          <button name="7" onClick={handleClick}>7</button>
          <button name="8" onClick={handleClick}>8</button>
          <button name="9" onClick={handleClick}>9</button>
          <button name="*" onClick={handleClick}>*</button>
        </div>
        <div className="buttons">
          <button name="." onClick={handleClick}>.</button>
          <button name="0" onClick={handleClick}>0</button>
          <button name="(" onClick={handleClick}>(</button>
          <button name=")" onClick={handleClick}>)</button>
        </div>
        <div className="buttons">
          <button onClick={clear}>Borrar todo</button>
          <button onClick={deleteDigit}>Borrar</button>
          <button name="/" onClick={handleClick}>/</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>

      <div className="container-results">
      <div className="operations">
          <h2>Operacion:</h2>
          {operations.map((operation, index) => (
            <p key={index}>{operation}</p>
          ))}
          <div className="operation-tree">
            <h2>Árbol:</h2>
            <pre className="containerArbol">{operationTree}</pre>
          </div>
        </div>
        <div className="operation-elements">
          <h2>Elementos de la operación:</h2>
          {operationElements.map((element, index) => (
            <p key={index}>
              {element} es {getTokenType(element)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;