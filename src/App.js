import React from "react";
import {Box, Chip, Paper} from "@material-ui/core";

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
const randomSwitch = number => {
  const outlets = [...Array(randomInt(5) + 1).keys()].map(randomOutlet);
  const amps = randomInt(20) + 1;
  return {number, amps, outlets};
};

const Switch = ({number, amps, outlets}) => (
  <>
    <Box flex={1}>#{number}</Box>
    {
      //<Box flex={1}>{amps}A</Box>
    }
    <Box flex={11}>
      {outlets.map(outlet => (
        <Chip label={outlet} size="small" />
      ))}
    </Box>
  </>
);

const Row = ({left, right}) => {
  return (
    <Box display="flex">
      <Switch {...left} />
      <Switch {...right} />
    </Box>
  );
};

const Column = () => {
  return (
    <Box display="flex" flexDirection="column">
      {[...Array(16).keys()]
        .map(i => i * 2 + 1)
        .map(i => (
          <Row left={randomSwitch(i)} right={randomSwitch(i + 1)} />
        ))}
    </Box>
  );
};

export default Column;
