# Korea Vlog 30s (Remotion)

วิดีโอเที่ยวเกาหลีแนว vlog ยาว 30 วินาที แนวตั้ง 1080x1920 (เหมาะกับ Reels / TikTok / Shorts) สร้างด้วย [Remotion](https://www.remotion.dev)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด Remotion Studio ดูตัวอย่าง/ปรับแต่งในเบราว์เซอร์
npm run render   # เรนเดอร์เป็น out/korea-vlog.mp4
npm run still    # ภาพปก out/thumbnail.png
```

## โครงเรื่อง (30 วินาที @ 30fps)

| ช่วง | เนื้อหา |
|---|---|
| 0–3 วิ | Intro: "서울 여행 / SEOUL / winter vlog" + แฟลชเปิด |
| 3–26 วิ | 9 ช็อต ช็อตละ ~2.5 วิ: ซูม/แพนแบบ Ken Burns, ป้ายสถานที่, คำบรรยายไทย + เกาหลี, ทรานซิชันสลับแบบ (slide / wipe / fade / flip) |
| 26–30 วิ | Outro: คอลลาจรูปโพลารอยด์ + "See you again, Seoul" |

ทุกช็อตมีแถบความคืบหน้าแบบสตอรี่, ไฟ REC กระพริบพร้อมเวลา, ขอบมืดและเกรนฟิล์ม

## ปรับแต่ง

- **ข้อความ / ลำดับรูป / มุมซูม**: แก้ที่ `src/config.ts` (`from`/`to` คือจุดโฟกัส x,y เป็น % และระดับซูม)
- **รูป**: วางไว้ใน `public/photos/`
- **ใส่เพลง**: วางไฟล์ไว้ที่ `public/music.mp3` แล้วเรนเดอร์ด้วย
  `npx remotion render KoreaVlog out/korea-vlog.mp4 --props='{"music":"music.mp3"}'`
  (เพลงจะ fade เข้า/ออกอัตโนมัติ) หรือเปลี่ยน `defaultProps` ใน `src/Root.tsx`
- **ฟอนต์**: Kanit (ไทย), Nanum Gothic (เกาหลี), Pacifico (ตัวเขียน) เก็บไว้ใน `public/fonts/` จึงเรนเดอร์ได้แม้ไม่มีอินเทอร์เน็ต (ฟอนต์ทั้งหมดเป็น SIL Open Font License)
