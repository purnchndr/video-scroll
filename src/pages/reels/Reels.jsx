import { useEffect, useState } from 'react';
import style from './Reels.module.css';
import Reel from '../../components/reel/Reel';

function Reels() {
  const reels = [
    '0.webm',
    '1.webm',
    '2.webm',
    '3.webm',
    '4.webm',
    '0.webm',
    '1.webm',
    '2.webm',
    '3.webm',
    '4.webm',
  ];
  const [current, setCurrent] = useState(null);
  const handelCurrent = (e, num) => setCurrent(c => (num != null ? num : null));
  return (
    <>
      {current !== null ? (
        <Reel videos={reels} handelCurrent={handelCurrent} selected={current} />
      ) : (
        <div className={style.reels}>
          <div className={style.header}>
            <h1>Nature's Reels</h1>
          </div>
          <div className={style.posters}>
            {reels.map((c, i) => (
              <video
                className={style.poster}
                src={`./videos/${c}`}
                key={i}
                onClick={e => handelCurrent(e, i)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reels;
