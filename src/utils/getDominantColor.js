import Vibrant from 'node-vibrant';

export async function getDominantColor(imageUrl) {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    return palette.Vibrant.getHex();
  } catch (error) {
    console.error('Errore nel calcolo del colore dominante:', error);
    return '#000000'; // Colore di default in caso di errore
  }
}
