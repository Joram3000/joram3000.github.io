import { RefObject, useState, useEffect } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.js";

export const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: WaveSurferOptions
): WaveSurfer | null => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    ws.registerPlugin(ZoomPlugin.create());

    ws.registerPlugin(
      HoverPlugin.create({
        lineColor: "#ff0000",
        lineWidth: 2,
        labelBackground: "#555",
        labelColor: "#fff",
        labelSize: "16px",
      })
    );
    ws.registerPlugin(
      TimelinePlugin.create({
        height: 20,
        insertPosition: "beforebegin",
      })
    );

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

