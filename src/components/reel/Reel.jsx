import { useEffect, useRef } from 'react';
import style from './Reel.module.css';
function Reel({ video, close }) {
  const poster = useRef();
  const vid = useRef();

  //   poster.current?.onscroll = function (e) {
  //     // print "false" if direction is down and "true" if up
  //     const isUp = this.oldScroll > this.scrollY;
  //     console.log(isUp, this.oldScroll - this.scrollY);
  //     this.oldScroll = this.scrollY;
  //   };

  poster.current &&
    (poster.current.onscroll = function (e) {
      // print "false" if direction is down and "true" if up
      const isUp = this.oldScroll > this.scrollY;
      console.log(isUp, this.oldScroll - this.scrollY);
      this.oldScroll = this.scrollY;
    });

  function scrolled(e) {
    console.log('scrolled');
    // print "false" if direction is down and "true" if up
    const isUp = this.oldScroll > this.scrollY;
    console.log(isUp, this.oldScroll - this.scrollY);
    this.oldScroll = this.scrollY;
  }
  //     poster.current.onscroll = function (e) {
  //       // print "false" if direction is down and "true" if up
  //       const isUp = this.oldScroll > this.scrollY;
  //       console.log(isUp, this.oldScroll - this.scrollY);
  //       this.oldScroll = this.scrollY;
  //     };

  function pause(e) {
    e.stopPropagation();
    if (vid.current.paused) vid.current.play();
    else vid.current.pause();
  }

  return (
    <div
      ref={poster}
      className={style.reel}
      onScroll={scrolled}
      onClick={e => close(e, null)}
    >
      <video
        ref={vid}
        className={style.video}
        src={video}
        onClick={pause}
        loop
        autoPlay
      />
    </div>
  );
}

export default Reel;
