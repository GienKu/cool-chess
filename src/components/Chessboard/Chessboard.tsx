import { Color, PieceSymbol, Square } from 'chess.js';
import { Tile } from '../Tile/Tile';
import './Chessboard.scss';

interface IChessboard {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}

const BOARD_COLS = 'abcdefgh';
const BOARD_ROWS = '87654321';

export const Chessboard: React.FC<IChessboard> = ({ board }) => {
  return (
    <div className="chessboard">
      {board &&
        board.reverse().map((row, i) =>
          row.map((square, j) => (
            <Tile
              key={`id${i}${j}`}
              color={(i + j) % 2 === 0 ? 'w' : 'b'}
              square={`${BOARD_COLS[j]}${BOARD_ROWS[i]}` as Square}
              piece={square && square.type}
              pieceColor={square && square.color}
            />
          ))
        )}
    </div>
  );
};
