import AppRouter from './router/Router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJSUtils from '@date-io/dayjs';

function App() {
  return (
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <AppRouter />
      </MuiPickersUtilsProvider>
  );
}

export default App;
