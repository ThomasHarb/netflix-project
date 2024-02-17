import React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { colors } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import { CodeBlock, paraisoDark } from "react-code-blocks";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

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
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
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
            The database was downloaded from Kaggle website
          </Typography>
        </Box>
        <Box
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
        </Box>
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
              <Tab label="Databases" {...a11yProps(2)} />
              <Tab label="Display Results" {...a11yProps(3)} />
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
            Item 3
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {/*             <iframe
              title="DataAnalystPowerBi"
              width="1140"
              height="741.25"
              src="https://app.powerbi.com/reportEmbed?reportId=8162c62e-4834-4d9b-876f-ee9828b8bd83&autoAuth=true&embeddedDemo=true"
              frameborder="0"
              allowFullScreen="true"
            ></iframe> */}
            {/* <PowerBIEmbed
              embedConfig={{
                type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                id: "8162c62e-4834-4d9b-876f-ee9828b8bd83>",
                embedUrl:
                  "https://app.powerbi.com/reportEmbed?reportId=8162c62e-4834-4d9b-876f-ee9828b8bd83&groupId=8f58fe7b-3b97-4b21-a51f-691b40aeb946&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUZSQU5DRS1DRU5UUkFMLUEtUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsImRpc2FibGVBbmd1bGFySlNCb290c3RyYXBSZXBvcnRFbWJlZCI6dHJ1ZX19",
                accessToken: "<Access Token>",
                tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false,
                    },
                  },
                  background: models.BackgroundType.Transparent,
                },
              }}
              eventHandlers={
                new Map([
                  [
                    "loaded",
                    function () {
                      console.log("Report loaded");
                    },
                  ],
                  [
                    "rendered",
                    function () {
                      console.log("Report rendered");
                    },
                  ],
                  [
                    "error",
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                  ["visualClicked", () => console.log("visual clicked")],
                  ["pageChanged", (event) => console.log(event)],
                ])
              }
              cssClassName={"reportClass"}
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            /> */}
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
