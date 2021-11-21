import React, {useEffect, useState} from 'react';
import c from './users.module.css';
import {connect} from "react-redux";
import {clearButtonAC, deleteUserAC, setCurrentPage, setUsers, setUsersThunk} from "../../store/usersReducer";
import User from "./User";
import Search from "../search/Search";

const Users = (props) => {
    const [users, setUsersForSort] = useState(props.users);
    const [directionSort, setDirectionSort] = useState(false);
    const [visibleClearButton, setVisibleClearButton] = useState(false);

    useEffect(() => {
        setUsersForSort(props.users);
    }, [props.users])

    const onPageChange = (currentPage) => {
        props.setCurrentPage(currentPage);
    }

    if (!users) {
        return <div>loading</div>;
    }

    let pagesCount = props.users.length / props.limit;
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
        return u.email.toLowerCase().includes(props.searchUsers.toLowerCase()) || u.username.toLowerCase().includes(props.searchUsers.toLowerCase());
    })

    const mySort = (direction, type) => (a, b) => {
        const aProp = type === 'date' ? new Date(a.registration_date).getTime() : a.rating;
        const bProp = type === 'date' ? new Date(b.registration_date).getTime() : b.rating;
        if (direction) return aProp - bProp
        else return bProp - aProp;
    }

    const sortByColumn = (directionSort, type) => {
        let newObj = JSON.parse(JSON.stringify(users));
        let sortedUsers = newObj.sort(mySort(directionSort, type))
        setUsersForSort(sortedUsers);
        setDirectionSort(!directionSort);
        setVisibleClearButton(true);
    }

    const deleteUser = (userId) => {
        props.deleteUserAC(userId);
    }

    return (
        <div>
            <Search visibleClearButton={visibleClearButton} setVisibleClearButton={setVisibleClearButton} setUsersForSort={setUsersForSort}/>
            <div className={c.usersBlock}>
                <div>
                    Сортировка:
                    <button onClick={() => {sortByColumn(directionSort, 'date')
                    }}>Дата регистрации</button>
                    <button onClick={() => {sortByColumn(directionSort, 'rating')}}>Рейтинг</button>
                </div>
                <div className={c.usersItems}>
                    {pages.map(p => {
                        return <span key={p} onClick={() => {onPageChange(p)}} className={props.currentPage === p ? c.selectedPage : ''}>{p}</span>
                    })}
                    <table>
                        <tbody>
                        <tr align='left'>
                            <th>Имя пользователя</th>
                            <th>E-mail</th>
                            <th>Дата регистрации</th>
                            <th>рейтинг</th>
                        </tr>
                        {filterUsers.map(u => {
                                return (
                                    <User username={u.username}
                                          email={u.email}
                                          date={u.registration_date.slice(0, 10).split('-').join('.')}
                                          rating={u.rating}
                                          id={u.id}
                                          key={u.id}
                                          deleteUser={deleteUser}/>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, {setUsersThunk, setCurrentPage, deleteUserAC, setUsers, clearButtonAC})(Users)

