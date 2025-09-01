import React from "react"
import { Container, Title, Stack, Paper } from "@mantine/core"
import { ModernWaveSurferWithRegions } from "../../components/WaveSurferPlayer/ModernWaveSurferWithRegions"

export const ModernWaveSurferExample: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>Modern WaveSurfer Player Examples</Title>

        <Paper shadow="sm" p="md" withBorder>
          <Title order={3} mb="md">
            Player with Regions/Segments
          </Title>
          <ModernWaveSurferWithRegions
            audioUrl="/src/assets/music/treingv.mp3"
            bpm={120}
            height={144}
            waveColor="#9c88ff"
            progressColor="#7950f2"
            cursorColor="#f92f40"
            showControls={true}
            showRegionControls={true}
          />
        </Paper>
      </Stack>
    </Container>
  )
}

export default ModernWaveSurferExample
