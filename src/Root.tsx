import {Composition} from 'remotion';
import {KoreaVlog, TOTAL_FRAMES} from './KoreaVlog';
import {FPS} from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="KoreaVlog"
      component={KoreaVlog}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{music: null}}
    />
  );
};
