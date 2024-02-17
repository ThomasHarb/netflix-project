import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Typography,
} from "@material-ui/core";
import shows from "../../../../../data/Netflix_data.json";
import InfoBox from "./InfoBox";
import { CardContent } from "@mui/material";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { GiDirectorChair, GiDualityMask } from "react-icons/gi";
import { MdSummarize } from "react-icons/md";

function Dashboard() {
  const theme = useTheme();
  const [selectedShow, setSelectedShow] = useState("");
  const [selectedShowData, setSelectedShowData] = useState(null);
  const [castList, setCastList] = useState([]);
  const [directorList, setDirectorList] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -4047796 });
  const [mapZoom, setMapZoom] = useState(3);

  const handleChange = (event) => {
    const newSelectedShow = event.target.value;
    setSelectedShow(newSelectedShow);
    const selectedShowData = shows[newSelectedShow];
    setSelectedShowData(selectedShowData);
    setCastList(
      selectedShowData.cast.split(",").map((castMember) => castMember.trim())
    );
    setDirectorList(
      selectedShowData.director
        .split(",")
        .map((directorMember) => directorMember.trim())
    );
    setMapCenter([
      parseFloat(selectedShowData.lat),
      parseFloat(selectedShowData.lng),
    ]);
    setMapZoom(4);
  };

  const DropdownSelect = () => (
    <FormControl fullWidth>
      <InputLabel id="show-select-label">Select a Show</InputLabel>
      <Select
        labelId="show-select-label"
        id="show-select"
        value={selectedShow}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.entries(shows).map(([showId, showData]) => (
          <MenuItem key={showId} value={showId}>
            {showData.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "10px",
      }}
    >
      <div
        className="app__left"
        style={{
          float: "left",
          width: "30%",
          marginRight: "2%",
          flex: "0.7",
        }}
      >
        <div
          className="app__header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          {/* Header */}
          <h1>NETFLIX DATA</h1>
          <DropdownSelect />
        </div>
        <div
          className="app__stats"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <InfoBox
            title="Type"
            data={selectedShowData ? selectedShowData.type : ""}
          />
          <InfoBox
            title="Duration"
            data={selectedShowData ? selectedShowData.duration : ""}
          />
          <InfoBox
            title="Release year"
            data={selectedShowData ? selectedShowData.release_year : ""}
          />
          <InfoBox
            title="Rating"
            data={selectedShowData ? selectedShowData.rating : ""}
          />
          {/* Title + Select Input dropdown field */}
          {/* Infobxs */}
          {/* Infobxs */}
          {/* Infobxs */}
          {/* Table */}
          {/* Graph */}
          {/* Map */}
        </div>
        <div className="Map">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
      <div className="card-container" style={{ width: "20%", height: "65%" }}>
        <Card
          sx={{
            maxWidth: 343,
            borderRadius: "20px",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            transition: "0.3s",
            margin: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: 256 }}>
            <Box
              sx={{
                padding: `4px 24px 0`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                alt={"brand logo"}
                sx={(theme) => ({
                  width: 48,
                  height: 48,
                  transform: "translateY(50%)",
                  "& > img": {
                    margin: 0,
                    backgroundColor: "common.white",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: 60,
                    height: 60,
                  },
                })}
              >
                <GiDualityMask />
              </Avatar>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: 14,
                  color: "grey.500",
                  letterSpacing: "1px",
                }}
              >
                Cast
              </Typography>
            </Box>
            <Box
              component="hr"
              sx={(theme) => ({
                backgroundColor: "grey.200",
                marginBottom: `${24 - 1}px`, // minus 1 due to divider height
                [theme.breakpoints.up("sm")]: {
                  marginBottom: `${30 - 1}px`, // minus 1 due to divider height
                },
              })}
            />
          </Box>
          <CardContent>
            <Typography variant="body2" component="div" color="text.secondary">
              {castList.map((castMember, index) => (
                <tr key={index} style={{ marginTop: "10%" }}>
                  <td>{castMember}</td>
                </tr>
              ))}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card
            className="Cast"
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent>
              <table>
                <thead>
                  <tr>
                    <th>Cast Member</th>
                  </tr>
                </thead>
                <tbody>
                  {castList.map((castMember, index) => (
                    <tr key={index} style={{ marginTop: "10%" }}>
                      <td>{castMember}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card> */}
        <Card
          sx={{
            maxWidth: 343,
            borderRadius: "20px",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            transition: "0.3s",
            margin: "60px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: 256 }}>
            <Box
              sx={{
                padding: `4px 24px 0`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                alt={"brand logo"}
                sx={(theme) => ({
                  width: 48,
                  height: 48,
                  transform: "translateY(50%)",
                  "& > img": {
                    margin: 0,
                    backgroundColor: "common.white",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: 60,
                    height: 60,
                  },
                })}
              >
                <GiDirectorChair />
              </Avatar>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: 14,
                  color: "grey.500",
                  letterSpacing: "1px",
                }}
              >
                Directed By
              </Typography>
            </Box>
            <Box
              component="hr"
              sx={(theme) => ({
                backgroundColor: "grey.200",
                marginBottom: `${24 - 1}px`, // minus 1 due to divider height
                [theme.breakpoints.up("sm")]: {
                  marginBottom: `${30 - 1}px`, // minus 1 due to divider height
                },
              })}
            />
          </Box>
          <CardContent>
            <Typography variant="body2" component="div" color="text.secondary">
              {directorList.map((directorMember, index) => (
                <tr key={index}>
                  <td>{directorMember}</td>
                </tr>
              ))}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card
            className="Director"
            director={directorList}
            style={{
              padding: "30px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent>
              <table>
                <thead>
                  <tr>
                    <th>Directed By</th>
                  </tr>
                </thead>
                <tbody>
                  {directorList.map((directorMember, index) => (
                    <tr key={index}>
                      <td>{directorMember}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card> */}
        {/* <Card
            className="Description"
            style={{
              padding: "30px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography className="Description" color="textPrimary">
              Description
            </Typography>
            <h4 className="Description_data">
              {selectedShowData ? selectedShowData.description : ""}
            </h4>
          </Card> */}
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            transition: "0.3s",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: 256 }}>
            <Box
              sx={{
                padding: `4px 24px 0`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                alt={"brand logo"}
                sx={(theme) => ({
                  width: 48,
                  height: 48,
                  transform: "translateY(50%)",
                  "& > img": {
                    margin: 0,
                    backgroundColor: "common.white",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: 60,
                    height: 60,
                  },
                })}
              >
                <MdSummarize />
              </Avatar>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: 14,
                  color: "grey.500",
                  letterSpacing: "1px",
                }}
              >
                Description
              </Typography>
            </Box>
            <Box
              component="hr"
              sx={(theme) => ({
                backgroundColor: "grey.200",
                marginBottom: `${24 - 1}px`, // minus 1 due to divider height
                [theme.breakpoints.up("sm")]: {
                  marginBottom: `${30 - 1}px`, // minus 1 due to divider height
                },
              })}
            />
          </Box>
          <CardContent>
            <Typography variant="body2" component="div" color="text.secondary">
              {selectedShowData ? selectedShowData.description : ""}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
