import { useMemo } from 'react';
import { Chessboard } from './components/Chessboard/Chessboard';
import { Chess } from 'chess.js';

export const App: React.FC = () => {
  const game = useMemo(() => new Chess(), []);
  return (
    <div className="appWrapper">
      <Chessboard game={game} />
    </div>
  );
};

export default App;
