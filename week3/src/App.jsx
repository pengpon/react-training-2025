import "./App.css";
// import LoginForm from './pages/LoginForm'
import TableList from "./pages/ProductTableList";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-secondary/60 p-10">
        {/* <LoginForm /> */}
        <TableList />
      </div>
    </>
  );
}

export default App;
