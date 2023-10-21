import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SavedPatterns } from "../../store/seqState/selectors";
import { PatternUpdatewithSelect } from "../../store/seqState/actions";
import { Button, Stack } from "@mantine/core";

const SelectPattern: React.FC = () => {
  const dispatch = useDispatch();
  const savedPatterns = useSelector(SavedPatterns);

  return (
    <Stack>
      {savedPatterns.map((pattern) => (
        <Button
          // m="sm"
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
