import { CardActionArea, Paper } from "@material-ui/core";
import React from "react";
import "../styles/cardtopinfo.css";

function CardTopInfo({
  title,
  isRed,
  active,
  cases,
  total,
  styleColor,
  ...props
}) {
  return (
    <CardActionArea>
      <Paper
        elevation={4}
        onClick={props.onClick}
        className={`track_cards_cases ${active && "selected_card"} ${
          isRed && "selected_red"
        }`}>
        <p className="cardtopinfo_title">{title}</p>
        <p
          style={{ color: styleColor }}
          id="track_cards_cases_h2"
          className="cardtopinfo_new">
          <strong>{cases}</strong>
        </p>
        <p className="cardtopinfo_total">{total}</p>
      </Paper>
    </CardActionArea>
  );
}

export default CardTopInfo;
