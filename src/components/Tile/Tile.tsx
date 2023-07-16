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

interface ITile {
  squareColor: 'light-tile' | 'dark-tile';
  squareId: Square;
  pieceOnSquare: PieceSymbol | null;
  pieceColor: Color | null;
  selected: 'selected-tile' | '';
  inCheck: 'king-in-check' | '';
  move: 'move-tile-active' | '';
  onClick: (square: Square) => void;
}

export const Tile: React.FC<ITile> = ({
  squareColor,
  pieceOnSquare,
  pieceColor,
  squareId,
  selected,
  inCheck,
  move,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(squareId)}
      className={`tile ${squareColor} ${selected} ${inCheck}`}
    >
      {pieceOnSquare && (
        <img src={PIECES_PATHS[pieceColor + pieceOnSquare]} alt="Piece" />
      )}
      {/* {squareId.includes('1') && <span className='tile-id-letter'>{squareId[0]}</span>}
      {squareId.includes('h') && <span className='tile-id-number'>{squareId[1]}</span>} */}
      {<span className='tile-id'>{squareId}</span>}
      {<span className={`move-tile ${move}`}></span>}
    </div>
  );
};
