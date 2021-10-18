import React from "react";
import { Board } from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      size: 5,
      isAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastPosition: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  handleSorting() {
    const status = this.state.isAscending;
    this.setState({
      isAscending: !status,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const x = (step.lastPosition % this.state.size) + 1;
      const y = Math.floor(step.lastPosition / this.state.size) + 1;
      const desc = move
        ? "Go to move #" + move + `(${x}, ${y})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={move === this.state.stepNumber && "selected"}
          >
            {desc}
          </button>
        </li>
      );
    });
    if (!this.state.isAscending) {
      moves.reverse();
    }
    let status;
    if (winner.winner) {
      status = "Winner: " + winner.winner;
    } else if (winner.isDraw) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            size={this.state.size}
            winLine={winner.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleSorting()}>
            {this.state.isAscending ? "Des" : "Asc"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  let lines = [];
  // rows
  for (let i = 0; i < 5 * 5; i += 5) {
    let line = [];
    line = Array.from({ length: 5 }, (_, k) => k + i);
    lines.push(line);
  }
  // cols
  for (let i = 0; i < 5; i++) {
    let line = [];
    for (let j = 0; j < 5; j++) {
      line.push(i + j * 5);
    }
    lines.push(line);
  }
  // cross
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  console.log(lines);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false,
      };
    }
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return {
        winner: null,
        line: null,
        isDraw: false,
      };
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: true,
  };
}
