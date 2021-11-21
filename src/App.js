import './App.css';
import Search from "./components/search/Search";
import Users from "./components/users/Users";
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
        <Users/>
    </div>
  );
}

export default connect(null, {setUsersThunk})(App)
