import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SavedPatterns } from "../../store/seqState/selectors";
import { PatternUpdatewithSelect } from "../../store/seqState/actions";
import { Button } from "@mantine/core";

const SelectPattern: React.FC = () => {
  const dispatch = useDispatch();
  const savedPatterns = useSelector(SavedPatterns);

  return (
    <div className="Selector-style">
      {savedPatterns.map((pattern, i) => (
        <Button
          variant="outline"
          key={i}
          style={{
            border: `1px solid ${pattern.color}`,
            color: `${pattern.color}`,
          }}
          onClick={() => {
            dispatch(PatternUpdatewithSelect(pattern));
          }}
        >
          {pattern.name}
        </Button>
      ))}
    </div>
  );
};

export default SelectPattern;
