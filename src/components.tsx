import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {kanit, korean} from './fonts';

type Focus = {x: number; y: number; scale: number};

// ภาพเคลื่อนไหวแบบ Ken Burns (ซูม + แพน)
export const KenBurns: React.FC<{src: string; from: Focus; to: Focus; duration: number; blurFill?: boolean}> = ({
  src,
  from,
  to,
  duration,
  blurFill,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;
  const s = from.scale + (to.scale - from.scale) * t;
  return (
    <AbsoluteFill style={{backgroundColor: '#111', overflow: 'hidden'}}>
      {blurFill ? (
        <Img
          src={staticFile(src)}
          style={{
            position: 'absolute',
            inset: -60,
            width: 'calc(100% + 120px)',
            height: 'calc(100% + 120px)',
            objectFit: 'cover',
            filter: 'blur(40px) brightness(0.7)',
          }}
        />
      ) : null}
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${x}% ${y}%`,
          transform: `scale(${s})`,
          transformOrigin: `${x}% ${y}%`,
        }}
      />
    </AbsoluteFill>
  );
};

// แสงขอบมืด + เกรนฟิล์ม ให้ฟีลวล็อก
export const FilmLook: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = (frame * 7919) % 100;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.07,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='" +
            seed +
            "'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </AbsoluteFill>
  );
};

// มุมกล้อง REC + เวลา
export const RecOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const secs = Math.floor(frame / fps);
  const blink = Math.floor(frame / 15) % 2 === 0;
  const time = `00:00:${String(secs).padStart(2, '0')}`;
  return (
    <div
      style={{
        position: 'absolute',
        top: 110,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: kanit,
        fontSize: 34,
        fontWeight: 700,
        color: 'white',
        letterSpacing: 2,
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 22, height: 22, borderRadius: 11, background: '#ff3b3b', opacity: blink ? 1 : 0.2}} />
        REC
      </div>
      <div>{time}</div>
    </div>
  );
};

// แถบความคืบหน้าแบบสตอรี่
export const ProgressBar: React.FC<{total: number}> = ({total}) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / total);
  return (
    <div style={{position: 'absolute', top: 60, left: 60, right: 60, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.3)'}}>
      <div style={{width: `${p * 100}%`, height: '100%', borderRadius: 4, background: 'white'}} />
    </div>
  );
};

const Pin: React.FC = () => (
  <svg width="30" height="38" viewBox="0 0 24 30">
    <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 30 12 30s12-9.5 12-18.3C24 5.2 18.6 0 12 0z" fill="#ff4d6d" />
    <circle cx="12" cy="11.5" r="4.5" fill="white" />
  </svg>
);

// ข้อความประกอบแต่ละภาพ
export const Caption: React.FC<{caption: string; sub: string; place: string}> = ({caption, sub, place}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - 6, fps, config: {damping: 12, stiffness: 140}});
  const subIn = spring({frame: frame - 14, fps, config: {damping: 200}});
  const pinIn = spring({frame: frame - 2, fps, config: {damping: 200}});
  // ตัวอักษรค่อยๆ ขึ้นแบบพิมพ์
  const chars = Array.from(caption);
  const shown = Math.floor(interpolate(frame, [6, 6 + chars.length * 1.2], [0, chars.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 26px 12px 18px',
          borderRadius: 40,
          background: 'rgba(255,255,255,0.92)',
          fontFamily: kanit,
          fontWeight: 700,
          fontSize: 34,
          color: '#222',
          opacity: pinIn,
          transform: `translateX(${(1 - pinIn) * -80}px)`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        }}
      >
        <Pin />
        {place}
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, bottom: 230}}>
        <div
          style={{
            display: 'inline-block',
            background: '#ffd23f',
            color: '#1a1a1a',
            fontFamily: kanit,
            fontWeight: 900,
            fontSize: 84,
            lineHeight: 1.25,
            padding: '6px 30px 14px',
            borderRadius: 18,
            transform: `scale(${0.6 + pop * 0.4}) rotate(${(1 - pop) * -6 - 2}deg)`,
            transformOrigin: 'left bottom',
            opacity: Math.min(1, pop * 1.5),
            boxShadow: '8px 10px 0 rgba(0,0,0,0.85)',
          }}
        >
          {chars.slice(0, Math.max(shown, 1)).join('')}
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: `${korean}, ${kanit}`,
            fontWeight: 800,
            fontSize: 52,
            color: 'white',
            textShadow: '0 3px 12px rgba(0,0,0,0.7)',
            opacity: subIn,
            transform: `translateY(${(1 - subIn) * 30}px)`,
          }}
        >
          {sub}
        </div>
      </div>
    </>
  );
};
