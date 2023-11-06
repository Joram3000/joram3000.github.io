import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  savedPatternsSelector,
  selectedPatternSelector,
} from "../../../store/patternmaker/selectors";
import {
  PatternUpdatewithSelect,
  SavePattern,
} from "../../../store/patternmaker/actions";
import {
  Button,
  ColorPicker,
  Popover,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import { SoundStyle } from "../../../store/patternmaker/types";

interface SelectPatternProps {
  setColor: Dispatch<SetStateAction<string>>;
  color?: string;
  setTitleValue: Dispatch<SetStateAction<string>>;
  titleValue: string;
}

const SelectPattern: React.FC<SelectPatternProps> = ({
  setColor,
  color,
  setTitleValue,
  titleValue,
}) => {
  const dispatch = useDispatch();
  const savedPatterns = useSelector(savedPatternsSelector);
  const currentPattern = useSelector(selectedPatternSelector);
  const [newPattern, setNewPattern] = useState(false); // kan je hier geen toggle voor gebruiken?
  const [newColor, setNewColor] = useState<string>(currentPattern.color);

  const onChangeColorValue = (value: string) => {
    setNewColor(value);
    setColor(value);
  };

  const onNewClick = () => {
    dispatch(
      PatternUpdatewithSelect({
        name: "Edit",
        color: newColor,
        sound: SoundStyle.NEOSOUL,
        pattern: [
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
        ],
      })
    );
    setNewPattern(true);
  };

  const onSaveClick = () => {
    dispatch(
      SavePattern({
        name: titleValue,
        color: newColor,
        sound: currentPattern.sound,
        pattern: currentPattern.pattern,
      })
    );
    setNewPattern(false);
  };

  return (
    <Stack pos="relative">
      {savedPatterns.map((pattern, i) => (
        <Button
          size="xs"
          variant="outline"
          key={`${pattern.name}-${i}`}
          color={pattern.color}
          onClick={() => {
            dispatch(PatternUpdatewithSelect(pattern));
          }}
        >
          {pattern.name}
        </Button>
      ))}

      <Button
        size="xs"
        variant="light"
        color={newPattern ? "green" : "orange"}
        key="new-pattern"
        onClick={newPattern ? onSaveClick : onNewClick}
      >
        <Text>{newPattern ? "Save" : "New"}</Text>
      </Button>

      {newPattern && (
        <Popover trapFocus position="left">
          <Popover.Target>
            <Button
              size="xs" //TODO MAKE RESPONSIVE
              variant="light"
              color="orange"
              key="edit"
              onClick={() => {}}
            >
              Edit
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <TextInput
                placeholder={titleValue}
                value={titleValue}
                onChange={(event) => setTitleValue(event.target.value)}
              />
              <ColorPicker
                onChange={onChangeColorValue}
                withPicker={false}
                value={color}
                format="hex"
                swatches={[
                  "#FF8787",
                  "#20c997",
                  "#fa5252",
                  "#e64980",
                  "#be4bdb",
                  "#7950f2",
                  "#4c6ef5",
                  "#228be6",
                  "#15aabf",
                  "#12b886",
                  "#40c057",
                  "#82c91e",
                  "#fab005",
                  "#fd7e14",
                ]}
              />
            </Stack>
          </Popover.Dropdown>
        </Popover>
      )}
    </Stack>
  );
};

export default SelectPattern;
