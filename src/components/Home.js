import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import Question from './Question';

function TabPanel(props) {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Home(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {answeredQuestions, unansweredQuestions} = props 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Unanswered Questions" {...a11yProps(0)} />
          <Tab label="Answared Questions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {
          unansweredQuestions.map((question)=>(
            <Question key={question.id} questionId={question.id} />
          ))
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
      {
          answeredQuestions.map((question)=>(
            <Question key={question.id} questionId={question.id} />
          ))
        }
      </TabPanel>
    
    </div>
  );
}
function mapStateToProps({questions, users, authedUser}){
  return {
    answeredQuestions: Object.values(questions).filter((question)=> users[authedUser].answers[question.id] ).sort((a,b)=> b.timestamp - a.timestamp ),
    unansweredQuestions: Object.values(questions).filter((question)=> !users[authedUser].answers[question.id]).sort((a,b)=> b.timestamp - a.timestamp)
  }
}
export default connect(mapStateToProps)(Home)