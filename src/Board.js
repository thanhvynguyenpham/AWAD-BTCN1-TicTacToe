import React from "react";
import { Square } from "./Square";

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winCell={this.props.winLine && this.props.winLine.includes(i)}
      />
    );
  }

  render() {
    const size = this.props.size;
    let board = [];
    for (var i = 0; i < size; i++) {
      let row = [];
      for (var j = 0; j < size; j++) {
        row.push(this.renderSquare(i * size + j));
      }
      board.push(<div className="board-row">{row}</div>);
    }
    return <div>{board}</div>;
  }
}
