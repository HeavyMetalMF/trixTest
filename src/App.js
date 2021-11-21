import './App.css';
import UsersPage from "./components/users/UsersPage";
import {useEffect} from "react";
import {connect} from "react-redux";
import {setUsersThunk} from "./store/usersReducer";

function App(props) {
    useEffect(() => {
        props.setUsersThunk();
        console.log('render')
    }, []);
  return (
    <div className="App">
        <UsersPage/>
    </div>
  );
}

export default connect(null, {setUsersThunk})(App)
