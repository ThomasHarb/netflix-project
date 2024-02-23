import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
/* import Button from "@mui/material/Button"; */
/* import useMediaQuery from "@mui/material/useMediaQuery"; */
import { colors } from "@mui/material";
/* import GitHubIcon from "@mui/icons-material/GitHub"; */
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import { CodeBlock, paraisoDark } from "react-code-blocks";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Typography,
} from "@mui/material";
import shows from "../../../../../data/Netflix_data.json";
import InfoBox from "../Dashboard/InfoBox";
import { CardContent } from "@mui/material";
import Map from "../Dashboard/Map";
import "leaflet/dist/leaflet.css";
import Avatar from "@mui/material/Avatar";
import { GiDirectorChair, GiDualityMask } from "react-icons/gi";
import { MdSummarize } from "react-icons/md";
import Grid from "@mui/material/Grid";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Hero = () => {
  const [selectedShow, setSelectedShow] = useState("");
  const [selectedShowData, setSelectedShowData] = useState(null);
  const [castList, setCastList] = useState([]);
  const [directorList, setDirectorList] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -4047796 });
  const [mapZoom, setMapZoom] = useState(3);

  const handleChangeMovie = (event) => {
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
    if (selectedShowData) {
      setSelectedShowData(selectedShowData);
      const lat = parseFloat(selectedShowData.lat);
      const lng = parseFloat(selectedShowData.lng);
      if (isNaN(lat) || isNaN(lng)) {
        // If the lat or lng is not a valid number, set the map center to a default value
        setMapCenter([34.80746, -4047796]);
      } else {
        setMapCenter([lat, lng]);
        setMapZoom(4);
      }
    } else {
      setMapCenter([34.80746, -4047796]);
    }
  };

  const DropdownSelect = () => (
    <FormControl fullWidth>
      <InputLabel id="show-select-label">Select a Show</InputLabel>
      <Select
        labelId="show-select-label"
        id="show-select"
        value={selectedShow}
        onChange={handleChangeMovie}
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
  const theme = useTheme();
  /*   const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  }); */
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const showLineNumbers = true;
  const librariesImport = `import pandas as pd
import argparse


parser = argparse.ArgumentParser(description='Split a CSV file into multiple files, one per column.')
parser.add_argument('csv_file', help='Path to the CSV file to be processed')
args = parser.parse_args()
csv_file = args.csv_file`;

  const SecondPartScript = `df = pd.read_csv(csv_file)
df = df.fillna('')
dictionary_df = df.to_dict('index')`;

  const ThirdPartScript = `listToSplit = ['type','director','cast','country']
for key in dictionary_df:
  newDict = {}
  for subkey in dictionary_df[key]:
      if subkey in listToSplit:
          listElemColumn = dictionary_df[key][subkey].split(',')
          indexColumnName = 0
          for elem in listElemColumn:
              indexColumnName += 1
              nameColumn = f'{subkey}_{indexColumnName}'
              newDict[nameColumn] = elem        
      else:
          pass
  dictionary_df[key].update(newDict)
  for elem in listToSplit:
      dictionary_df[key].pop(elem)`;

  const WholeScript = `import pandas as pd  # importing the pandas library
  import argparse  # importing the argparse library
  
  def main():
      # creating an argument parser object
      parser = argparse.Argument(description='Split a CSV file into multiple files, one per column.')
  
      # adding a positional argument to the parser object
      parser.add_argument('csv_file', help='Path to the CSV file to be processed')
  
      # parsing the arguments
      args = parser.parse_args()
  
      # reading the CSV file using pandas
      csv_file = args.csv_file
      df = pd.read_csv(csv_file)
  
      # filling any missing values in the DataFrame with an empty string
      df = df.fillna('')
  
      # converting the DataFrame into a dictionary where each key in the dictionary corresponds to a row in the original DataFrame
      # and the value for each key is another dictionary that contains the column names and values for that row
      dictionary_df = df.to_dict('index')
  
      # defining a list of column names that should be split into multiple columns
      listToSplit = ['type','director','cast','country']
  
      # looping through each row in the dictionary
      for key in dictionary_df:
          newDict = {}  # creating a new dictionary to store the updated values for the current row
          for subkey in dictionary_df[key]:  # looping through each column in the current row
              if subkey in listToSplit:  # checking if the current column is in the list of columns to be split
                  listElemColumn = dictionary_df[key][subkey].split(',')  # splitting the values in the current column by the comma character
                  indexColumnName = 0  # initializing the index for the new column names
                  for elem in listElemColumn:  # looping through each value in the split column
                      indexColumnName += 1  # incrementing the index for the new column names
                      nameColumn = f'{subkey}_{indexColumnName}'  # creating the new column name by appending the index to the original column name
                      newDict[nameColumn] = elem  # adding the new column and value to the new dictionary
              else:
                  pass  # if the current column is not in the list of columns to be split, do nothing
          dictionary_df[key].update(newDict)  # updating the current row in the original dictionary with the new dictionary
          for elem in listToSplit:  # looping through each column in the list of columns to be split
              dictionary_df[key].pop(elem)  # removing the original column from the current row in the original dictionary
  
      # converting the modified dictionary back into a DataFrame
      df = pd.DataFrame(dictionary_df).T
  
      # printing the modified DataFrame to the console
      print(df)
  
  if  __name__ == '__main__':
      main()`;

  return (
    <Box
      sx={{
        position: "relative",
        "&::after": {
          position: "absolute",
          content: '""',
          width: "30%",
          zIndex: 1,
          top: 0,
          right: 0,
          height: "100%",
          backgroundSize: "18px 18px",
          backgroundImage: `radial-gradient(${theme.palette.primary.dark} 20%, transparent 20%)`,
          opacity: 0.2,
        },
      }}
    >
      <Box position="relative" zIndex={2}>
        <Box marginBottom={2}>
          <Typography
            variant="h2"
            align={"center"}
            sx={{
              fontWeight: 700,
            }}
          >
            Netflix Movies Data Analysis
          </Typography>
        </Box>
        <Box marginBottom={4}>
          <Typography variant="h6" align={"center"} color={"textSecondary"}>
            This project is design to analysis Netflix movies.
            <br />
            The dataset was downloaded from Kaggle website
          </Typography>
        </Box>
        {/*         <Box
          marginBottom={{ xs: 4, sm: 6, md: 8 }}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={{ xs: "stretched", sm: "center" }}
        >
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth={!isMd}
            startIcon={<GitHubIcon />}
          >
            View on Github
          </Box>
        </Box> */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <AppBar position="flex" style={{ position: "flex" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              color="primary"
            >
              <Tab label="Notebook" {...a11yProps(0)} />
              <Tab label="Code Source" {...a11yProps(1)} />
              <Tab label="Display Results" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <CustomTabPanel value={value} index={0}>
            {/* FIRST PART */}
            <Typography variant="h5" align={"center"}>
              First Part : Importing Libraries
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              This script use a Python 3 environment. Below we will find the
              different package needful :
              <br />
              - Pandas : A very powerfult package to manipulate, to filter and
              to sort data
              <br />- Argparse : the recommended command-line parsing module in
              the Python standard library
            </Typography>
            <br />
            <Box
              component={Card}
              bgcolor={colors.blueGrey[800]}
              padding={4}
              maxWidth={800}
              margin={"0 auto"}
              boxShadow={3}
            >
              <CodeBlock
                text={librariesImport}
                language="python"
                showLineNumbers={showLineNumbers}
                theme={paraisoDark}
              />
            </Box>
            <br />
            {/* SECOND PART */}
            <Typography variant="h5" align={"center"}>
              Second Part : Load Data
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              The function read_csv from pandas is used here to load the csv
              file "data.csv" as argument. If you want to change this file, just
              replace it with your own one.
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              Note that if there are missing values (NaN) or infinite values in
              your dataset, they will be automatically replaced by zeroes. You
              can modify this behavior using or not the method fillna.
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              Then , we need to modify some columns. Indeed, our data has some
              columns which contains mulitple elements separate by coma. By
              example the cast columns which contains the name of all actors
              separateby coma). To do so, we modify our dataframe into
              dictionary to easy manipulate them.
            </Typography>
            <br />
            <Box
              component={Card}
              bgcolor={colors.blueGrey[800]}
              padding={4}
              maxWidth={800}
              margin={"0 auto"}
              boxShadow={3}
            >
              <CodeBlock
                text={SecondPartScript}
                language="python"
                showLineNumbers={showLineNumbers}
                theme={paraisoDark}
              />
            </Box>
            <br />
            {/* THIRD PART */}
            <Typography variant="h5" align={"center"}>
              Third Part : Modify Dataset
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              Then we convert the DataFrame into a dictionary, where each key in
              the dictionary corresponds to a row in the original DataFrame and
              the value for each key is another dictionary that contains the
              column names and values for that row.
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              The second part is about to define a list of column names that
              should be split into multiple columns. In this case, the list
              includes "type", "director", "cast", and "country".
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              Then , loops through each row in the dictionary and checks if any
              of the column names in the current row are in the list of columns
              to be split.
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              If a column name is in the list, the script splits the values in
              that column by the comma character and creates new columns in the
              row dictionary for each value. The new column names are formed by
              appending a number to the original column name.
            </Typography>
            <br />
            <Typography variant="h6" align={"center"}>
              The script then removes the original column from the row
              dictionary and adds the new columns.
            </Typography>
            <br />
            <Box
              component={Card}
              bgcolor={colors.blueGrey[800]}
              padding={4}
              maxWidth={800}
              margin={"0 auto"}
              boxShadow={3}
            >
              <CodeBlock
                text={ThirdPartScript}
                language="python"
                showLineNumbers={showLineNumbers}
                theme={paraisoDark}
              />
            </Box>
          </CustomTabPanel>
          <Grid item xs={12}>
            <CustomTabPanel value={value} index={1}>
              <Box
                component={Card}
                bgcolor={colors.blueGrey[800]}
                padding={4}
                maxWidth={1400}
                margin={"0 auto"}
                boxShadow={3}
              >
                <CodeBlock
                  text={WholeScript}
                  language="python"
                  showLineNumbers={showLineNumbers}
                  theme={paraisoDark}
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
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
                    <Typography variant="h4" color={"primary"}>
                      NETFLIX DATA
                    </Typography>
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
                      data={
                        selectedShowData ? selectedShowData.release_year : ""
                      }
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
                    <Map
                      center={mapCenter}
                      zoom={mapZoom}
                      onCenterChange={(newCenter) => setMapCenter(newCenter)}
                    />
                  </div>
                </div>
                <div
                  className="card-container"
                  style={{ width: "30%", height: "65%" }}
                >
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
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
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
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
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
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
                        {selectedShowData ? selectedShowData.description : ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CustomTabPanel>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
