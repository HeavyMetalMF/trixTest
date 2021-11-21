import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {clearButtonAC, deleteUserAC, setCurrentPage, setUsers, setUsersThunk} from "../../store/usersReducer";
import Search from "../search/Search";
import Users from "./Users";

const UsersPage = (props) => {
    const [users, setUsersForSort] = useState(props.users);
    let usersCopy = JSON.parse(JSON.stringify(users));

    useEffect(() => {
        setUsersForSort(props.users);
    }, [props.users])

    if (!users) {
        return <div>loading</div>;
    }

    let pagesCount = Math.ceil(props.users.length / props.limit);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);

    //левая и привая границы индексов пользователей, которых нужно отобразить (0-4, 5-9)
    let rightBorder = props.currentPage * props.limit - 1;
    let leftBorder = (props.currentPage - 1) * props.limit;

    //пользователи после фильтра пагинации
    let currentUsers = users.filter((u, i) => {
        return i >= leftBorder && i <= rightBorder
    });
    //пользователи после фильтра поиска (изначально там все пользователи после пагинации)
    let filterUsers = currentUsers.filter(u => {
        return u.email.toLowerCase().includes(props.searchUsers.toLowerCase())
            || u.username.toLowerCase().includes(props.searchUsers.toLowerCase());
    })
    return (
        <div>
            <Search setUsersForSort={setUsersForSort}/>
            <Users users={props.users}
                    setUsersForSort={setUsersForSort}
                    usersCopy={usersCopy}
                    pages={pages}
                    filterUsers={filterUsers}
                    clearButtonAC={props.clearButtonAC}
                    deleteUserAC={props.deleteUserAC}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        limit: state.usersPage.limit,
        searchUsers: state.usersPage.searchUsers,
    }
}

export default connect(mapStateToProps, {setUsersThunk, setCurrentPage, deleteUserAC, setUsers, clearButtonAC})(UsersPage)

