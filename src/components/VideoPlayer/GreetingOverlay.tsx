import React, { useState } from "react";

interface GreetingOverlayProps {
  arrayValues: string[];
  onArrayValuesChange: (newArrayValues: string[]) => void;
}

const GreetingOverlay: React.FC<GreetingOverlayProps> = ({
  arrayValues,
  onArrayValuesChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addValueToArray();
    }
  };

  const addValueToArray = () => {
    if (inputValue.trim() !== "") {
      const newArrayValues = [...arrayValues, inputValue];
      onArrayValuesChange(newArrayValues);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    const newArrayValues = [...arrayValues];
    newArrayValues.splice(index, 1);
    onArrayValuesChange(newArrayValues);
  };

  return (
    <div>
      <h1>Type in your Greetings</h1>
      <ul>
        {arrayValues.map((value, index) => (
          <li key={index}>
            {value}
            <button onClick={() => handleDelete(index)}>-</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addValueToArray}>Add</button>
    </div>
  );
};

export default GreetingOverlay;
