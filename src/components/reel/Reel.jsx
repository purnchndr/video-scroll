import { useEffect, useRef, useState } from 'react';
import style from './Reel.module.css';
function Reel({ videos, handelCurrent, selected }) {
  const vid = useRef();
  const [current, setCurrent] = useState(selected);
  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem('liked') || '[]').includes(current)
  );

  //   useEffect(() => {
  //     window.onscroll = function (e) {
  //       // print "false" if direction is down and "true" if up
  //       const isUp = this.oldScroll > this.scrollY;
  //       console.log(isUp, this.oldScroll - this.scrollY);
  //       //   setCurrent(current + (isUp ? 1 : -1));
  //       this.oldScroll = this.scrollY;
  //     };
  //     return () => (window.onscroll = () => {});
  //   });

  function pause(e) {
    e.stopPropagation();
    if (vid.current.paused) vid.current.play();
    else vid.current.pause();
  }

  const pre = e => {
    e.stopPropagation();
    if (current !== 0) setCurrent(c => c - 1);
  };

  const next = e => {
    e.stopPropagation();
    if (current !== videos.length - 1) setCurrent(c => c + 1);
  };

  function like(e) {
    e.stopPropagation();
    let likedVids = JSON.parse(localStorage.getItem('liked') || []);
    console.log(likedVids);
    if (liked) {
      likedVids = likedVids.filter(e => e !== current);
      localStorage.setItem('liked', JSON.stringify(likedVids));
    } else {
      likedVids.push(current);
      localStorage.setItem('liked', JSON.stringify(likedVids));
    }
    setLiked(l => !l);
  }

  //   let isLiked = likedVids.includes(current);
  //   console.log(isLiked);
  return (
    <div
      id='reels'
      className={style.reel}
      onClick={e => handelCurrent(e, null)}
    >
      <img onClick={pre} src='./images/pre.png' alt='pre' width='40px' />

      <div className={style.videoCnt}>
        <video
          ref={vid}
          className={style.video}
          src={`./videos/${videos[current]}`}
          onClick={pause}
          loop
          autoPlay
        />
        <div className={style.text}>
          <div className={style.title}>
            <h1>Video {current + 1}</h1>
            <div>
              <img
                className={style.like}
                onClick={like}
                src={liked ? './images/liked.png' : './images/like.png'}
              />
              <a
                href={`./videos/${videos[current]}`}
                download={`${current}.mp4`}
              >
                <img className={style.like} src='./images/down.png' />
              </a>
            </div>
            {console.log(liked)}
          </div>
          <p>
            "Some old-fashioned things like fresh air and sunshine are hard to
            beat." -Laura Ingalls Wilder
          </p>
        </div>
      </div>

      <img onClick={next} src='./images/next.png' alt='next' width='40px' />
    </div>
  );
}

export default Reel;
