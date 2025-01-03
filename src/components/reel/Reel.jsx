import { useEffect, useRef, useState } from 'react';
import style from './Reel.module.css';
function Reel({ videos, handelCurrent, selected }) {
  const vid = useRef();
  const [current, setCurrent] = useState(selected);

  useEffect(() => {
    window.onscroll = function (e) {
      // print "false" if direction is down and "true" if up
      const isUp = this.oldScroll > this.scrollY;
      console.log(isUp, this.oldScroll - this.scrollY);
      setCurrent(current + (isUp ? 1 : -1));
      this.oldScroll = this.scrollY;
    };
    return () => (window.onscroll = () => {});
  });

  function pause(e) {
    e.stopPropagation();
    if (vid.current.paused) vid.current.play();
    else vid.current.pause();
  }

  return (
    <div
      id='reels'
      className={style.reel}
      onClick={e => handelCurrent(e, null)}
    >
      <video
        ref={vid}
        className={style.video}
        src={`./videos/${videos[current]}`}
        onClick={pause}
        loop
        autoPlay
      />
    </div>
  );
}

export default Reel;
