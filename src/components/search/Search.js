import React from 'react';
import c from './search.module.css';
import {setSearchUsers, setUsers} from "../../store/usersReducer";
import {connect} from "react-redux";

const Search = (props) => {
    const filter = (e) => {
        props.setSearchUsers(e);
    }
    const clear = () => {
        props.setSearchUsers('');
        props.setUsersForSort(props.users);
        props.setVisibleClearButton(false);
    }

    return (
        <div className={c.searchBlock}>
            <div>
                Список пользователей
            </div>
            <div className={c.searchItems}>
                <input onChange={(e) => filter(e.target.value)} type="text" value={props.searchUsers}/>
                {props.visibleClearButton || props.searchUsers ? <div onClick={clear} className={c.clear}>Очистить фильтр</div> : ''}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchUsers: state.usersPage.searchUsers,
        users: state.usersPage.users,
    }
}

export default connect(mapStateToProps, {setSearchUsers, setUsers})(Search)