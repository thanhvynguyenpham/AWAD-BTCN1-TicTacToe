import React from "react";
export function Square(props) {
  const className = props.winCell ? "square highlight" : "square";
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
