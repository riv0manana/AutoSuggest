/*
Author : Rivomanana Mandan'i Aina
rivomanana.mandaniaina@outlook.com

AutoSuggest - based on React and Marterial-UI
*/

import React from "react";
import { Popper, List, ListItem, ListItemText, Paper } from "@material-ui/core";

const AutoSuggest = props => {
  const { collections, anchorEl, value, fieldName, fieldId, onSelect } = props;
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState(anchorEl ? anchorEl : null);
  const [width, setWidth] = React.useState(
    anchorEl ? anchorEl.offsetWidth : "100%"
  );
  const [suggestion, setSuggestion] = React.useState([]);

  const hideSuggestion = () => {
    setAnchor(null);
    setSuggestion([]);
    setOpen(false);
  };

  const handleSelect = selectedItemObject => {
    onSelect(selectedItemObject);
    hideSuggestion();
  };

  const handleEscPress = e => {
    if(e.key === "Escape"){
      setOpen(false);
    }
  }

  /*
   * Add KeyDown listener for Escape key
   */

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress)
    return () => {
      document.removeEventListener('keydown', handleEscPress)
    }
  }, [])

  React.useEffect(() => {
    if (value === undefined || value.length <= 0 || collections === undefined) {
      hideSuggestion();
      return;
    }
    const lists = collections.filter(el => el[fieldName].includes(value));
    if (lists.length > 0) {
      setAnchor(anchorEl);
      setWidth(anchorEl ? anchorEl.offsetWidth : "100%");
      setSuggestion(lists);
      setOpen(true);
    } else {
      hideSuggestion();
    }
  }, [value, collections, anchorEl, fieldName]);

  const ItemList = () => {
    return (
      <Paper
        style={{
          width: width ? width : "100%",
          maxHeight: 300,
          overflowX: "auto"
        }}
      >
        <List>
          {suggestion !== undefined &&
            suggestion.map(item => (
              <ListItem
                button
                key={item[fieldId] || item["id"]}
                onClick={() => handleSelect(item)}
              >
                <ListItemText primary={item[fieldName] || item["value"]} />
              </ListItem>
            ))}
        </List>
      </Paper>
    );
  };

  return (
    <Popper
      style={{ zIndex: 1500 }}
      anchorEl={anchor}
      open={open}
      placement="bottom-end"
    >
      {ItemList}
    </Popper>
  );
};
export default AutoSuggest;
