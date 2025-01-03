import style from './Reels.module.css';

function Reels() {
  const reels = ['1.webm', '2.webm', '3.webm', '4.webm', '5.webm'];
  return (
    <div className={style.reels}>
      <div className={style.header}>
        <h1>Nature's Reels</h1>
      </div>
      <div className={style.posters}>
        {reels.map((c, i) => (
          <video className={style.poster} src={`./videos/${c}`} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Reels;
