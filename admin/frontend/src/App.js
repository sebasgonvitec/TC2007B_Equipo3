
import './App.css';

import AccountsTable from './components/accountsTable';
import Register from './components/register';


function App() {
  return (
    <div className="App">
      <Register></Register> 
      <br></br>
      <AccountsTable></AccountsTable>
    </div>
  );
}

export default App;
