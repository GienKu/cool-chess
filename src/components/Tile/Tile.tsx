import { Color, PieceSymbol, Square } from 'chess.js';
import './Tile.scss';

import bPawn from '../../assets/img/b_pawn_1x.png';
import bKnight from '../../assets/img/b_knight_1x.png';
import bBishop from '../../assets/img/b_bishop_1x.png';
import bKing from '../../assets/img/b_King_1x.png';
import bQueen from '../../assets/img/b_queen_1x.png';
import bRook from '../../assets/img/b_rook_1x.png';

import wPawn from '../../assets/img/w_pawn_1x.png';
import wKnight from '../../assets/img/w_knight_1x.png';
import wBishop from '../../assets/img/w_bishop_1x.png';
import wKing from '../../assets/img/w_king_1x.png';
import wQueen from '../../assets/img/w_queen_1x.png';
import wRook from '../../assets/img/w_rook_1x.png';

const PIECES_PATHS: { [key: string]: string } = {
  bp: bPawn,
  br: bRook,
  bn: bKnight,
  bb: bBishop,
  bq: bQueen,
  bk: bKing,
  wp: wPawn,
  wr: wRook,
  wn: wKnight,
  wb: wBishop,
  wq: wQueen,
  wk: wKing,
};

interface ICoords {
  x: number;
  y: number;
}
interface ITile {
  squareCoords: ICoords;
  squareId: Square;
  pieceOnSquare: PieceSymbol | null;
  pieceColor: Color | null;
  classNames: string;

  onClick: (square: Square) => void;
}

export const Tile: React.FC<ITile> = ({
  squareCoords,
  pieceOnSquare,
  pieceColor,
  squareId,
  classNames,
  onClick,
}) => {
  const { x, y } = squareCoords;
  return (
    <div
      onClick={() => onClick(squareId)}
      className={`tile ${classNames}`}
    >
      {pieceOnSquare && (
        <img src={PIECES_PATHS[pieceColor + pieceOnSquare]} alt="Piece" />
      )}
      {x === 7 ? <span className="tile-id-letter">{squareId[0]}</span> : null}
      {y === 7 ? <span className="tile-id-number">{squareId[1]}</span> : null}
    </div>
  );
};
