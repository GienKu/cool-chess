import { useEffect, useState } from 'react';
import {
  Chess,
  Square,
  WHITE,
  BLACK,
  Color,
  KING,
  PieceSymbol,
} from 'chess.js';
import { Tile } from '../Tile/Tile';
import './Chessboard.scss';
import { createPortal } from 'react-dom';
interface IChessboard {
  game: Chess;
}

interface ITile {
  id: Square;
  coords: { x: number; y: number };
  color: 'light' | 'dark';
  isLastMove: boolean;
  piece: {
    type: PieceSymbol;
    color: Color;
    isAttacked: boolean;
    possibleMoves: string[];
  } | null;
}

const BOARD_COLS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const BOARD_ROWS = [8, 7, 6, 5, 4, 3, 2, 1];

const swapColors = (prev: Color) => (prev === WHITE ? BLACK : WHITE);

const createBoard = (game: Chess): ITile[][] => {
  return game.board().map((row, i) => {
    return row.map((sq, j) => {
      const id = `${BOARD_COLS[j]}${BOARD_ROWS[i]}` as Square;
      const lastMove = game.history({ verbose: true }).at(-1);
      const isLastMove = lastMove?.from === id || lastMove?.to === id;
      if (sq !== null) {
        return {
          id: id,
          coords: { x: i, y: j },
          color: (i + j) % 2 === 0 ? 'light' : 'dark',
          isLastMove: isLastMove,
          piece: {
            type: sq.type,
            color: sq.color,
            isAttacked: game.isAttacked(sq.square, swapColors(sq.color)),
            possibleMoves: game
              .moves({ square: id })
              .map((move) => move.match(/[abcdefgh][12345678]/)?.[0]!),
          },
        };
      } else {
        return {
          id: id,
          coords: { x: i, y: j },
          color: (i + j) % 2 === 0 ? 'light' : 'dark',
          isLastMove: isLastMove,
          piece: null,
        };
      }
    });
  });
};

export const Chessboard: React.FC<IChessboard> = ({ game }) => {
  const [selectedSquareId, setSelectedSquareId] = useState<Square | null>(null);
  const [turn, setTurn] = useState<Color>(WHITE);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Color | undefined>(undefined);

  const board: ITile[][] = createBoard(game);

  const handleSquareClick = (clickedSquareId: Square) => {
    const piece = game.get(clickedSquareId);

    if (selectedSquareId != null && piece?.color !== turn) {
      try {
        const moveInfo = game.move({
          from: selectedSquareId,
          to: clickedSquareId,
          promotion: 'q',
        });
      } catch (e) {
        console.log('invalid move');
        return;
      }

      setTurn((prev) => (prev === WHITE ? BLACK : WHITE));
      setSelectedSquareId(null);

      if (game.isCheckmate()) {
        setIsGameOver(true);
        setWinner(game.turn() === WHITE ? BLACK : WHITE);
      }
      return;
    }
    if (clickedSquareId === selectedSquareId) {
      setSelectedSquareId(null);
      return;
    }
    if (piece?.color === turn) {
      setSelectedSquareId(clickedSquareId);
    }
  };

  const tileClassname = (sq: ITile) => {
    const isLightTile = sq.color === 'light';
    const isSelectedSquare = selectedSquareId === sq.id;
    const isLastMove = sq.isLastMove;
    const isKingInCheck =
      sq.piece?.type === KING && sq.piece?.color === turn && game.inCheck();
    const isTileToMove =
      selectedSquareId &&
      game
        .moves({ square: selectedSquareId })
        .map((move) => move.match(/[abcdefgh][12345678]/)?.[0])
        .includes(sq.id);
    const tileToMoveClass =
      sq.piece === null ? ' tile-active' : ' attacked-tile-active';
    return `${isLightTile ? 'light-tile' : 'dark-tile'}${
      isSelectedSquare ? ` selected-${sq.color}` : ''
    }${isLastMove ? ` last-move-${sq.color}` : ''}${
      isKingInCheck ? ' king-in-check' : ''
    }${isTileToMove ? tileToMoveClass : ''}`;
  };

  return (
    <div className={`chessboard${isGameOver ? ' game-over' : ''}`}>
      {board.map((row, i) =>
        row.map((square, j) => (
          <Tile
            onClick={handleSquareClick}
            key={square.id}
            squareCoords={square.coords}
            squareId={square.id}
            pieceOnSquare={square.piece && square.piece.type}
            pieceColor={square.piece && square.piece.color}
            classNames={tileClassname(square)}
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
