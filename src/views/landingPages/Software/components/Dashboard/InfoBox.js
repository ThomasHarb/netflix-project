import { Card, Typography } from "@mui/material";
import React from "react";

function InfoBox({ title, data }) {
  return (
    <Card
      className="infoBox"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography className="infoBox__title" color="textSecondary">
        {title}
      </Typography>
      <h3 className="infoBox__data">{data}</h3>
    </Card>
  );
}

export default InfoBox;
