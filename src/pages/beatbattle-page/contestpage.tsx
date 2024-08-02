import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getBeatStateSelector } from "../../store/beatbattle/selectors"
import { Title, Text, Stack, Group, Box, Popover, Button } from "@mantine/core"
import { Carousel, Embla } from "@mantine/carousel"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { getUIStateSelector } from "../../store/ui/selectors"
import { beat } from "../../store/beatbattle/types"
import SubmissionCard from "./components/SubmissionCard"
import DialogueCard from "./components/DialogueCard"

const ContestPage: React.FC = () => {
  const params = useParams()
  const id: string | undefined = params.id

  const beatBattleState = useSelector(getBeatStateSelector)
  const getUIState = useSelector(getUIStateSelector)
  const getContest = beatBattleState.contests[1]

  const contestSubmissions = getContest.beats
  const dateAdded = format(new Date(), "dd-mm-yyyy hh:mm")
  const [embla, setEmbla] = useState<Embla | null>(null)

  useEffect(() => {
    if (embla === null) return
    embla.reInit()
  }, [embla, getUIState.menuOpen])

  const onURLClick = () => {
    console.log(getContest.sample.url)
  }

  return (
    <Box>
      <Stack bg="dark" m="md">
        <Group>
          <Popover position="bottom" withArrow shadow="md" width={"100%"}>
            <Popover.Target>
              <Title fw={700} c="violet">
                {getContest.sample.name}
              </Title>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Button size="md" onClick={onURLClick}>
                  Download Sample
                </Button>

                <DialogueCard reactions={getContest.sample.reactions} />
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
        <Group>
          <Text c="white">Battle Round: {id}</Text> <Title c="lime"></Title>
        </Group>
        <Group>
          <Text>toegevoegd: {dateAdded}</Text>
        </Group>

        <Title>inzendingen:</Title>
        <Carousel withIndicators getEmblaApi={setEmbla} loop>
          {contestSubmissions.map((beat: beat) => (
            <Carousel.Slide key={beat.numberOfUpvotes}>
              <SubmissionCard
                name={beat.beatMaker.name}
                beatName={beat.name}
                url={beat.url}
                dateAdded={new Date()}
                upvotes={beat.numberOfUpvotes}
                reactions={beat.reactions}
              />

              <DialogueCard reactions={beat.reactions} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </Box>
  )
}

export default ContestPage
