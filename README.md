# React-study

[React 공식 튜토리얼: Tic-Tac-Toe](https://ko.react.dev/learn/tutorial-tic-tac-toe) 기반 학습 프로젝트입니다.

```
root
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── index.js
│   └── styles.css
└── package.json
```

---

## 컴포넌트 구조

```
Game (최상위)
│
│ state: history, currentMove
│
├── Board (자식)
│   │ props: xIsNext, squares, onPlay
│   │
│   ├── Square (손자)
│   │   props: value, onSquareClick
│   │
│   └── Square ...
│
└── Game Info (이동 버튼 리스트)
```

---

## 컴포넌트별 역할 및 코드 스니펫

### 1. Square (손자 컴포넌트)

* 역할: 한 칸의 표시 및 클릭 이벤트 처리
* props: `value`, `onSquareClick`

```javascript
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
```

---

### 2. Board (자식 컴포넌트)

* 역할: 3x3 보드 구성, 클릭 이벤트 처리 후 `Game`에 알림
* props: `xIsNext`, `squares`, `onPlay`

```javascript
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>
    </>
  );
}
```

---

### 3. Game (최상위 컴포넌트)

* 역할: 전체 상태 관리, 이동 기록(history) 관리
* state: `history`, `currentMove`

```javascript
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? 'Go to game start' : `Go to move #${move}`}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
```

---

### 4. 승리자 계산 함수

* 역할: 3칸이 동일하면 승리자 반환

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

---

## 데이터 & 이벤트 흐름

* **상태(state) 소유**: `Game` 컴포넌트
* **데이터 흐름**: 부모 → 자식 (Game → Board → Square)
* **이벤트 흐름**: 자식 → 부모 (Square 클릭 → Board → Game)
* 핵심: **데이터는 내려가고 이벤트는 올라오는 단방향 데이터 흐름**

```
Game (state)
  │
  ▼
Board (props)
  │
  ▼
Square (props, 이벤트 발생)
  │
  ▲
Board.handleClick → onPlay → Game 상태 업데이트
```
