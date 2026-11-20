// ===== แก้ไขเนื้อหาวิดีโอได้ที่ไฟล์นี้ =====
export const FPS = 30;

export const INTRO_FRAMES = 100;
export const SLIDE_FRAMES = 86;
export const OUTRO_FRAMES = 126;
export const TRANSITION_FRAMES = 10;

export type Slide = {
  photo: string; // ไฟล์ใน public/
  caption: string; // ข้อความหลัก (ไทย)
  sub: string; // ข้อความรอง (เกาหลี/อังกฤษ)
  place: string; // ป้ายสถานที่
  // จุดโฟกัสของภาพ (0-100%) สำหรับซูม/แพน
  from: {x: number; y: number; scale: number};
  to: {x: number; y: number; scale: number};
  landscape?: boolean;
};

export const INTRO = {
  photo: 'photos/03.jpg',
  title: 'SEOUL',
  titleKr: '서울 여행',
  subtitle: 'winter vlog',
  from: {x: 30, y: 50, scale: 1.0},
  to: {x: 70, y: 55, scale: 1.12},
};

export const SLIDES: Slide[] = [
  {
    photo: 'photos/01.jpg',
    caption: 'ฮัลโหล โซล!',
    sub: '안녕, 서울',
    place: 'Seoul, Korea',
    from: {x: 50, y: 45, scale: 1.18},
    to: {x: 50, y: 40, scale: 1.04},
  },
  {
    photo: 'photos/02.jpg',
    caption: 'หนาว แต่ใจฟู',
    sub: '너무 추워요',
    place: 'Jongno-gu',
    from: {x: 50, y: 35, scale: 1.0},
    to: {x: 48, y: 30, scale: 1.15},
  },
  {
    photo: 'photos/04.jpg',
    caption: 'มุมเสาเหลืองสุดฮิต',
    sub: 'yellow pole spot',
    place: 'Jongno-gu',
    landscape: true,
    from: {x: 42, y: 55, scale: 1.12},
    to: {x: 50, y: 50, scale: 1.0},
  },
  {
    photo: 'photos/03.jpg',
    caption: 'เดินเล่นย่านเก่า',
    sub: '산책하기 좋은 날',
    place: 'Bukchon area',
    landscape: true,
    from: {x: 95, y: 55, scale: 1.12},
    to: {x: 82, y: 50, scale: 1.0},
  },
  {
    photo: 'photos/05.jpg',
    caption: 'ป้ายนี้ต้องมีรูป',
    sub: 'Jongno International Seodang',
    place: 'Jongno-gu',
    from: {x: 60, y: 55, scale: 1.15},
    to: {x: 55, y: 45, scale: 1.0},
  },
  {
    photo: 'photos/06.jpg',
    caption: 'อิฐแดง x ฮันอก',
    sub: '한옥 골목',
    place: 'Hanok alley',
    from: {x: 50, y: 60, scale: 1.0},
    to: {x: 45, y: 55, scale: 1.14},
  },
  {
    photo: 'photos/07.jpg',
    caption: 'โพสท่าแบบคนเกาหลี',
    sub: 'K-pose',
    place: 'Hanok alley',
    from: {x: 50, y: 40, scale: 1.16},
    to: {x: 50, y: 45, scale: 1.02},
  },
  {
    photo: 'photos/09.jpg',
    caption: 'มองหาร้านกาแฟต่อ',
    sub: '카페 가자!',
    place: 'Hanok alley',
    from: {x: 45, y: 40, scale: 1.0},
    to: {x: 45, y: 35, scale: 1.14},
  },
  {
    photo: 'photos/08.jpg',
    caption: 'ลมหนาวมาแล้ว!',
    sub: '바람이 불어요',
    place: 'Bukhansan road',
    from: {x: 45, y: 40, scale: 1.15},
    to: {x: 45, y: 38, scale: 1.0},
  },
];

export const OUTRO = {
  photos: ['photos/01.jpg', 'photos/02.jpg', 'photos/06.jpg', 'photos/07.jpg', 'photos/08.jpg', 'photos/05.jpg'],
  title: 'See you again, Seoul',
  titleKr: '다음에 또 만나요',
  thai: 'แล้วเจอกันใหม่นะ เกาหลี',
};
