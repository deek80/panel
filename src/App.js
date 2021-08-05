import React, {useState} from "react";
import {Box, Chip, TextField, Typography} from "@material-ui/core";
import AppBar from "./components/AppBar";
import {useData} from "./firebase";

const escape = pattern => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const highlightRegex = pattern =>
  pattern && new RegExp(`(${escape(pattern)})`, "i");
const pairs = list =>
  list.reduce((result, _, i, initial) => {
    if (i % 2 === 0) {
      result.push(initial.slice(i, i + 2));
    }
    return result;
  }, []);

const Switch = ({number, outlets, regex}) => {
  /*
  I think I have to compute all the highlights at this level, to save doing
  it twice. i.e.

  case no search term:
    enabled, and no highlights

  case some outlets match the search:
    enabled, and matches are highlighed

  case no outlets match the search:
    disabled, no highlights
  */
  let enabled = false;
  let highlightedOutlets;
  if (!regex) {
    enabled = true;
    highlightedOutlets = outlets;
  } else {
    highlightedOutlets = outlets.map(outlet => {
      const parts = outlet.split(regex).map((part, i) => {
        const Tag = i % 2 === 0 ? "span" : "mark";
        return <Tag key={`${i}-${part}`}>{part}</Tag>;
      });
      enabled || (enabled = parts.length > 1);
      return parts;
    });
  }
  return (
    <>
      <Box color={enabled ? "text.primary" : "text.disabled"} flex={1}>
        <Typography variant="body1" align="right">
          #{number}
        </Typography>
      </Box>
      <Box flex={10}>
        {highlightedOutlets.map((outlet, i) => (
          <Chip key={i} label={outlet} size="small" disabled={!enabled} />
        ))}
      </Box>
    </>
  );
};

const Panel = () => {
  const [switches, ,] = useData(({uid}) => `/users/${uid}/panels/test`);
  const [search, setSearch] = useState("");
  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const switchPairs = switches ? pairs(switches) : [];
  const regex = highlightRegex(search);

  return (
    <>
      <AppBar />
      <Box m={1} display="flex" alignItems="center">
        <Box flex={1}>
          <Typography variant="h5">Home Panel</Typography>
        </Box>
        <Box flex={1}>
          <TextField
            variant="outlined"
            label="Search"
            size="small"
            fullWidth
            onChange={handleSearchChange}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {switchPairs.map(([left, right]) => (
          <Box display="flex">
            <Switch {...left} regex={regex} />
            <Switch {...right} regex={regex} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Panel;
