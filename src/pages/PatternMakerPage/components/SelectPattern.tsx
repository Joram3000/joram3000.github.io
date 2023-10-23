import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SavedPatterns } from "../../../store/patternMakerState/selectors";
import { PatternUpdatewithSelect } from "../../../store/patternMakerState/actions";
import { Button, Stack } from "@mantine/core";

const SelectPattern: React.FC = () => {
  const dispatch = useDispatch();
  const savedPatterns = useSelector(SavedPatterns);

  return (
    <Stack>
      {savedPatterns.map((pattern) => (
        <Button
          variant="outline"
          key={pattern.name}
          color={pattern.color}
          onClick={() => {
            dispatch(PatternUpdatewithSelect(pattern));
          }}
        >
          {pattern.name}
        </Button>
      ))}
    </Stack>
  );
};

export default SelectPattern;
