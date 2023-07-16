import { useEffect, useState } from 'react';
import { Chess, Square, WHITE, BLACK, Color, PAWN, KING } from 'chess.js';
import { Tile } from '../Tile/Tile';
import './Chessboard.scss';
import { createPortal } from 'react-dom';
interface IChessboard {
  game: Chess;
}

const BOARD_COLS = ['a','b','c','d','e','f','g','h'];
const BOARD_ROWS = [8,7,6,5,4,3,2,1];

export const Chessboard: React.FC<IChessboard> = ({ game }) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [turn, setTurn] = useState<Color>(WHITE);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Color | undefined>(undefined);
  const handleSquareClick = (clickedSquare: Square) => {
    const piece = game.get(clickedSquare);

    //if selectedSquare is not null then we want to perform move
    if (selectedSquare != null && piece?.color !== turn) {
      try {
        const moveInfo = game.move({
          from: selectedSquare,
          to: clickedSquare,
          promotion: 'q',
        });
      } catch (e) {
        console.log('invalid move');
        return;
      }

      setTurn((prev) => (prev === WHITE ? BLACK : WHITE));
      setSelectedSquare(null);

      if (game.isCheckmate()) {
        setIsGameOver(true);
        setWinner(game.turn() === WHITE ? BLACK : WHITE);
      }
      
      console.log(game.ascii());
    } else if (piece?.color === turn) {
      setSelectedSquare(clickedSquare);
    }
  };

  return (
    <div className={`chessboard${isGameOver ? ' game-over' : ''}`}>
      {game.board().map((row, i) =>
        row.map((piece, j) => (
          <Tile
            onClick={handleSquareClick}
            key={`${BOARD_COLS[j]}${BOARD_ROWS[i]}`}
            squareColor={(i + j) % 2 === 0 ? 'light-tile' : 'dark-tile'}
            squareId={`${BOARD_COLS[j]}${BOARD_ROWS[i]}` as Square}
            pieceOnSquare={piece && piece.type}
            pieceColor={piece && piece.color}
            selected={selectedSquare === piece?.square ? 'selected-tile' : ''}
            inCheck={
              piece?.type === KING && piece?.color === turn && game.inCheck()
                ? 'king-in-check'
                : ''
            }
            move={
              selectedSquare &&
              game
                .moves({ square: selectedSquare })
                .map((move) => move.match(/[abcdefgh][12345678]/)?.[0])
                .includes(`${BOARD_COLS[j]}${BOARD_ROWS[i]}`)
                ? 'move-tile-active'
                : ''
            }
          />
        ))
      )}
      {isGameOver &&
        createPortal(
          <div>Koniec gry! Wygrały {winner}</div>,
          document.getElementById('modal-root')!
        )}
    </div>
  );
};
