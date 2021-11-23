import React from 'react';
// import Home from './components/Home';
import {createContext} from 'react';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Calendar from './components/Calendar';
import MedForm from './components/MedForm';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export const WorkspaceContext = createContext();

function App() {
  const [medicineList, setMedicineList] = React.useState([]);
  const [customerID, setCustomerID] = React.useState('');
  const [activeComp, setActiveComp] = React.useState('Schedule');
  const [weekendsVisible, setWeekendsVisible] = React.useState({ weekendsVisible: true });
  const [currentEvents, setCurrentEvents] = React.useState({ currentEvents: [] });
  const [measurement, setMeasurement] = React.useState();
  const [dosage, setDosage] = React.useState();
  const [value, setValue] = React.useState();
  const [state, setState] = React.useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <div>
      <WorkspaceContext.Provider value={{
        medicineListS: [medicineList, setMedicineList],
        customerIDS: [customerID, setCustomerID],
        activeCompS: [activeComp, setActiveComp],
        weekendsVisibleS: [weekendsVisible, setWeekendsVisible],
        currentEventsS: [currentEvents, setCurrentEvents],
        measurementS: [measurement, setMeasurement],
        dosageS: [dosage, setDosage],
        valueS: [value, setValue],
        stateS: [state, setState],
        openEditS: [openEdit, setOpenEdit],
      }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Login/>
            </Route>
            <Route path="/home" exact>
              <Homepage/>
            </Route>
            <Route path="/calendar" exact>
              <Calendar/>
            </Route>
            <Route path="/medform" exact>
              <MedForm/>
            </Route>
          </Switch>
        </BrowserRouter>
      </WorkspaceContext.Provider>
    </div>
  );
}

export default App;
