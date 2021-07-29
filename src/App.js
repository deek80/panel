import React, {useState} from "react";
import {Box, Chip, TextField} from "@material-ui/core";

const outlets = [
  "Garage",
  "Downstairs Bathroom",
  "Heat Pump",
  "Fridge",
  "Stove",
  "Upstairs Hallway",
  "Small Bedroom",
  "Master Bedroom",
  "Furnace room outlets",
  "Guest Bedroom",
  "Some Other Thing",
  "Example 17",
  "Yet another appliance",
];

const randomInt = max => Math.floor(Math.random() * max);
const randomOutlet = () => outlets[randomInt(outlets.length)];
const randomSwitch = number => ({
  number,
  outlets: [...Array(randomInt(6)).keys()].map(randomOutlet),
});
const switches = [...Array(16).keys()]
  .map(i => i * 2 + 1)
  .map(i => ({
    left: randomSwitch(i),
    right: randomSwitch(i + 1),
  }));

const isMatchingOutlet = (outlet, text) => outlet.includes(text);
const isMatchingSwitch = (swtch, text) =>
  swtch.outlets.find(outlet => isMatchingOutlet(outlet, text));

const Switch = ({number, outlets, enabled}) => (
  <>
    <Box color={enabled ? "text.primary" : "text.disabled"} flex={1}>
      #{number}
    </Box>
    <Box flex={11}>
      {outlets.map(outlet => (
        <Chip label={outlet} size="small" disabled={!enabled} />
      ))}
    </Box>
  </>
);

const Panel = () => {
  const [search, setSearch] = useState("");
  const handleSearchChange = event => {
    setSearch(event.target.value);
  };
  return (
    <>
      <TextField label="Search" size="small" onChange={handleSearchChange} />
      <Box display="flex" flexDirection="column">
        {switches.map(({left, right}) => (
          <Box display="flex">
            <Switch {...left} enabled={isMatchingSwitch(left, search)} />
            <Switch {...right} enabled={isMatchingSwitch(right, search)} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Panel;
