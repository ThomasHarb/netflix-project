import { Card, Typography } from "@mui/material";
import React from "react";

function InfoBox({ title, data }) {
  return (
    <Card
      className="infoBox"
      style={{
        width: "24.5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography className="infoBox__title" color="textSecondary">
        {title}
      </Typography>
      <h2 className="infoBox__data">{data}</h2>
    </Card>
  );
}

export default InfoBox;
