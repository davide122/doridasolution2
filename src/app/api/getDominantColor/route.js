// app/api/getDominantColor/route.js
import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import axios from 'axios';
import Vibrant from 'node-vibrant';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Imposta il percorso di ffmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Parametro videoUrl mancante' }, { status: 400 });
  }

  try {
    // Scarica il video come buffer
    const response = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
    });
    const videoBuffer = Buffer.from(response.data, 'binary');

    // Crea un percorso temporaneo per salvare il video e il frame
    const tempDir = os.tmpdir();
    const videoPath = path.join(tempDir, `temp_video_${Date.now()}.mp4`);
    const framePath = path.join(tempDir, `temp_frame_${Date.now()}.jpg`);

    // Salva il video nel percorso temporaneo
    fs.writeFileSync(videoPath, videoBuffer);

    // Estrai un frame dal video usando ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .on('end', resolve)
        .on('error', (err) => {
          console.error('Errore durante l\'estrazione del frame con ffmpeg:', err);
          reject(err);
        })
        .screenshots({
          count: 1,
          filename: path.basename(framePath),
          folder: tempDir,
          size: '320x240',
        });
    });

    // Calcola il colore dominante dal frame estratto
    const palette = await Vibrant.from(framePath).getPalette();
    const dominantColor = palette.Vibrant.getHex();

    // Rimuovi i file temporanei
    fs.unlinkSync(videoPath);
    fs.unlinkSync(framePath);

    return NextResponse.json({ dominantColor });
  } catch (error) {
    console.error('Errore nel calcolo del colore dominante:', error);
    return NextResponse.json({ error: 'Errore nel calcolo del colore dominante' }, { status: 500 });
  }
}
