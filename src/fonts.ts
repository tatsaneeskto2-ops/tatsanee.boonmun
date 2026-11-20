import {continueRender, delayRender, staticFile} from 'remotion';

// ฟอนต์ถูกเก็บไว้ใน public/fonts เพื่อให้เรนเดอร์ได้แม้ไม่มีอินเทอร์เน็ต
const faces: {family: string; file: string; weight: string}[] = [
  {family: 'Kanit', file: 'Kanit-Regular.ttf', weight: '400'},
  {family: 'Kanit', file: 'Kanit-Bold.ttf', weight: '700'},
  {family: 'Kanit', file: 'Kanit-Black.ttf', weight: '900'},
  {family: 'Pacifico', file: 'Pacifico-Regular.ttf', weight: '400'},
  {family: 'Nanum Gothic', file: 'NanumGothic-Bold.ttf', weight: '700'},
  {family: 'Nanum Gothic', file: 'NanumGothic-ExtraBold.ttf', weight: '800'},
];

if (typeof window !== 'undefined' && 'FontFace' in window) {
  const handle = delayRender('Loading local fonts');
  Promise.all(
    faces.map((f) => {
      const face = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)})`, {weight: f.weight});
      return face.load().then((loaded) => document.fonts.add(loaded));
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const kanit = 'Kanit';
export const script = 'Pacifico';
export const korean = "'Nanum Gothic'";
