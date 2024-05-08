// components/AudioVisualizer.js
import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioVisualizer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);

  useEffect(() => {
    // Crea il visualizzatore WaveSurfer
    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ffffh",
      progressColor: "#7967F4",
      barWidth: 1,
      interact: false,
      cursorWidth:0,
    });

    // Controlla se l'audio URL è valido e caricalo
    if (audioUrl) {
      waveSurfer.current.load(audioUrl);
      waveSurfer.current.on("ready", () => {
        waveSurfer.current.play();
     
      });
    }

    // Distruggi l'istanza WaveSurfer al termine
    return () => {
      if (waveSurfer.current && waveSurfer.current.destroy) {
        waveSurfer.current.destroy();
      }
    };
  }, [audioUrl]);

  // Rendi visibile il visualizzatore
  return <div ref={waveformRef} style={{ width: "100%", height: "100px" }} />;
};

export default AudioVisualizer;
