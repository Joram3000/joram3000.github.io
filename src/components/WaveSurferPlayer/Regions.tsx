import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { Button, Group, useMantineTheme, Stack } from "@mantine/core";

interface RegionsFileProps {
  wavesurfer: WaveSurfer;
  setActiveRegion: (region: Region | null) => void;
  setCuePoint: (region: Region | null) => void;
  loop?: boolean;
}

const RegionsFile: React.FC<RegionsFileProps> = ({
  wavesurfer,
  setActiveRegion,
  setCuePoint,
}) => {
  const theme = useMantineTheme();
  const [wsRegions, setWsRegions] = useState<RegionsPlugin | null>(null);
  const [savedRegions, setSavedRegions] = useState<Region[] | null>([]);

  useEffect(() => {
    if (wavesurfer)
      setWsRegions(wavesurfer.registerPlugin(RegionsPlugin.create()));
  }, [wavesurfer]);

  useEffect(() => {
    if (wsRegions) {
      wavesurfer.on("decode", () => {
        wsRegions.enableDragSelection({
          color: "rgba(255, 0, 0, 0.2)",
        });
        setCuePoint(
          wsRegions.addRegion({
            id: "CUE",
            start: 5.05,
            color: "orange",
          })
        );
      });

      wavesurfer.on("ready", () => {
        wsRegions.on("region-clicked", () => {
          console.log("a region is clicked");
        });

        wsRegions.on("region-double-clicked", (region: Region) => {
          region.remove();
          const newRegions = wsRegions.getRegions();
          setSavedRegions([...newRegions]);
        });

        wsRegions.on("region-in", (region: Region) => setActiveRegion(region));
        wsRegions.on("region-out", () => {
          setActiveRegion(null);
        });

        wsRegions.on("region-created", () => {
          const newRegions = wsRegions.getRegions();
          setSavedRegions([...newRegions]);
        });
      });
    }
  }, [wsRegions, savedRegions]);

  return (
    <Stack>
      <Group>
        {savedRegions?.map(
          (region: Region, i) =>
            i > 0 && (
              <Button
                color={theme.colors.yellow[9 - i]}
                key={i}
                onClick={() => region.play()}
                onDoubleClick={() => region.remove()}
              >
                {i}
              </Button>
            )
        )}
      </Group>
    </Stack>
  );
};

export default RegionsFile;
