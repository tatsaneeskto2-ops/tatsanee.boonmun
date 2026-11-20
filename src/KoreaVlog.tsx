import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {flip} from '@remotion/transitions/flip';
import {Caption, FilmLook, KenBurns, ProgressBar, RecOverlay} from './components';
import {INTRO, INTRO_FRAMES, OUTRO, OUTRO_FRAMES, SLIDES, SLIDE_FRAMES, TRANSITION_FRAMES} from './config';
import {kanit, korean, script} from './fonts';

export const TOTAL_FRAMES =
  INTRO_FRAMES + SLIDES.length * SLIDE_FRAMES + OUTRO_FRAMES - (SLIDES.length + 1) * TRANSITION_FRAMES;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t1 = spring({frame: frame - 8, fps, config: {damping: 14}});
  const t2 = spring({frame: frame - 22, fps, config: {damping: 200}});
  const t3 = spring({frame: frame - 34, fps, config: {damping: 200}});
  const flash = interpolate(frame, [0, 6], [1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <KenBurns src={INTRO.photo} from={INTRO.from} to={INTRO.to} duration={INTRO_FRAMES} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.25)'}} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center'}}>
        <div style={{fontFamily: `${korean}`, fontWeight: 800, fontSize: 70, letterSpacing: 18, opacity: t2, transform: `translateY(${(1 - t2) * -40}px)`, textShadow: '0 4px 20px rgba(0,0,0,0.6)'}}>
          {INTRO.titleKr}
        </div>
        <div
          style={{
            fontFamily: kanit,
            fontWeight: 900,
            fontSize: 260,
            lineHeight: 1,
            letterSpacing: 10,
            transform: `scale(${0.4 + t1 * 0.6})`,
            opacity: t1,
            textShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}
        >
          {INTRO.title}
        </div>
        <div style={{fontFamily: script, fontSize: 110, color: '#ffd23f', marginTop: -30, transform: `rotate(-6deg) translateY(${(1 - t3) * 40}px)`, opacity: t3, textShadow: '0 6px 24px rgba(0,0,0,0.6)'}}>
          {INTRO.subtitle}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'white', opacity: flash}} />
    </AbsoluteFill>
  );
};

const PhotoSlide: React.FC<{i: number}> = ({i}) => {
  const s = SLIDES[i];
  return (
    <AbsoluteFill>
      <KenBurns src={s.photo} from={s.from} to={s.to} duration={SLIDE_FRAMES} />
      <Caption caption={s.caption} sub={s.sub} place={s.place} />
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const positions = [
    {x: 70, y: 260, r: -8},
    {x: 560, y: 220, r: 6},
    {x: 40, y: 760, r: 5},
    {x: 590, y: 720, r: -5},
    {x: 90, y: 1260, r: -4},
    {x: 560, y: 1230, r: 7},
  ];
  const titleIn = spring({frame: frame - 40, fps, config: {damping: 12}});
  const fadeOut = interpolate(frame, [OUTRO_FRAMES - 15, OUTRO_FRAMES], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg, #fbe9d7 0%, #f6c6c6 55%, #c9d7f2 100%)', opacity: fadeOut}}>
      {OUTRO.photos.map((p, idx) => {
        const pos = positions[idx];
        const pop = spring({frame: frame - idx * 5, fps, config: {damping: 13, stiffness: 120}});
        return (
          <div
            key={p}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: 430,
              padding: '18px 18px 70px',
              background: 'white',
              boxShadow: '0 14px 40px rgba(0,0,0,0.25)',
              transform: `rotate(${pos.r}deg) scale(${pop}) translateY(${interpolate(frame, [0, OUTRO_FRAMES], [0, -30])}px)`,
            }}
          >
            <Img src={staticFile(p)} style={{width: '100%', height: 480, objectFit: 'cover', objectPosition: '50% 30%'}} />
          </div>
        );
      })}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '40px 60px',
            borderRadius: 40,
            transform: `scale(${titleIn}) rotate(-3deg)`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{fontFamily: script, fontSize: 92, color: '#e94f6b', lineHeight: 1.3}}>{OUTRO.title}</div>
          <div style={{fontFamily: korean, fontWeight: 800, fontSize: 56, color: '#333', marginTop: 10}}>{OUTRO.titleKr}</div>
          <div style={{fontFamily: kanit, fontWeight: 700, fontSize: 48, color: '#555', marginTop: 8}}>{OUTRO.thai}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// สลับรูปแบบทรานซิชันให้ไม่ซ้ำซาก
const transitionFor = (i: number) => {
  const timing = linearTiming({durationInFrames: TRANSITION_FRAMES, easing: Easing.out(Easing.cubic)});
  const list = [
    {presentation: slide({direction: 'from-right'}), timing},
    {presentation: wipe({direction: 'from-bottom-left'}), timing},
    {presentation: slide({direction: 'from-bottom'}), timing},
    {presentation: fade(), timing},
    {presentation: flip({direction: 'from-left'}), timing: springTiming({durationInFrames: TRANSITION_FRAMES, config: {damping: 200}})},
  ];
  return list[i % list.length];
};

export const KoreaVlog: React.FC<{music: string | null}> = ({music}) => {
  return (
    <AbsoluteFill style={{background: 'black'}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
          <Intro />
        </TransitionSeries.Sequence>
        {SLIDES.map((_, i) => {
          const tr = transitionFor(i);
          return (
            <React.Fragment key={i}>
              <TransitionSeries.Transition presentation={tr.presentation as any} timing={tr.timing} />
              <TransitionSeries.Sequence durationInFrames={SLIDE_FRAMES}>
                <PhotoSlide i={i} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})} />
        <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <FilmLook />
      <ProgressBar total={TOTAL_FRAMES} />
      <RecOverlay />
      {music ? (
        <Audio
          src={staticFile(music)}
          volume={(f) => interpolate(f, [0, 15, TOTAL_FRAMES - 30, TOTAL_FRAMES], [0, 0.8, 0.8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        />
      ) : null}
    </AbsoluteFill>
  );
};
