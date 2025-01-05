import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import style from './Reel.module.css';

function Reel({ videos, handelCurrent, selected }) {
  const [current, setCurrent] = useState(0);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const posRef = useRef(0);
  const scrolled = useRef(false);
  const vids = useRef([]);
  const reelsRef = useRef();

  const pre = e => {
    e && e.stopPropagation();
    if (current !== 0) setCurrent(c => c - 1);
  };
  const next = e => {
    e && e.stopPropagation();
    if (current !== videos.length - 1) setCurrent(c => c + 1);
  };

  function setRef(el, index) {
    vids.current[index] = el;
  }

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (reelsRef.current) {
        console.log('Scroll', current);
        const scrollPos = reelsRef.current.scrollTop;
        const scrollPosition = posRef.current;
        console.log(scrollPosition, scrollPos, current);
        if (scrollPos > scrollPosition) next();
        if (scrollPos < scrollPosition) pre();
        posRef.current = scrollPos;
      }
    }, 100);
    const el = reelsRef.current;
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [posRef.current]);

  //useEffect(() => {
  //   console.log('Loading ', current);
  //   vids.current.forEach((c, i) => {
  //     const el = c.current;
  //     if (i === current) {
  //       console.log('Playing', current);
  //       el.play();
  //       el.scrollIntoView();
  //     } else el.pause();
  //   });
  // }, []);

  useEffect(() => {
    vids.current.forEach((c, i) => {
      const el = c.current;
      if (i === current) {
        el.play();
      } else el.pause();
    });
  }, [current]);

  return (
    <div
      id='reels'
      className={style.reel}
      onClick={e => handelCurrent(e, null)}
    >
      {/* <img
        onClick={pre}
        className={style.btn}
        src='./images/pre.png'
        alt='pre'
        width='40px'
      /> */}

      <div className={style.vids} ref={reelsRef}>
        {videos.map((video, i) => (
          <Video
            video={video}
            setRef={setRef}
            current={current}
            key={i}
            index={i}
          />
        ))}
      </div>

      {/* <img
        className={style.btn}
        onClick={next}
        src='./images/next.png'
        alt='next'
        width='40px'
      /> */}
    </div>
  );
}

function Video({ video, current, index, setRef }) {
  const vid = useRef();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(
      JSON.parse(localStorage.getItem('liked') || '[]').includes(current)
    );
    setRef(vid, index);
  });

  function pause(e) {
    e.stopPropagation();
    if (vid.current.paused) vid.current.play();
    else vid.current.pause();
  }
  function like(e) {
    e.stopPropagation();
    let likedVids = JSON.parse(localStorage.getItem('liked') || '[]');
    if (liked) {
      likedVids = likedVids.filter(e => e !== current);
      localStorage.setItem('liked', JSON.stringify(likedVids));
    } else {
      likedVids.push(current);
      localStorage.setItem('liked', JSON.stringify(likedVids));
    }
    setLiked(l => !l);
  }

  return (
    <div className={style.videoCnt}>
      <div className={style.vidText}>
        <video
          ref={vid}
          className={style.video}
          src={`./videos/${video}`}
          onClick={pause}
          loop
          autoPlay={false}
        />
        <div className={style.text}>
          <div className={style.title}>
            <h1>Video {index + 1}</h1>
            <div>
              <img
                className={style.like}
                onClick={like}
                src={liked ? './images/liked.png' : './images/like.png'}
              />
              <a href={`./videos/${video}`} download={`${current}.mp4`}>
                <img className={style.like} src='./images/down.png' />
              </a>
            </div>
          </div>
          <p>
            "Some old-fashioned things like fresh air and sunshine are hard to
            beat." -Laura Ingalls Wilder
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reel;
