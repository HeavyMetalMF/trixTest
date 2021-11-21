import React, {useEffect, useState} from 'react';
import c from './users.module.css';
import {connect} from "react-redux";
import {deleteUserAC, setCurrentPage, setUsers, setUsersThunk} from "../../store/usersReducer";
import User from "./User";

const Users = (props) => {
    const [users, setUsers] = useState([props.users]);
    const [directionSort, setDirectionSort] = useState(true);

    useEffect(() => {

    },[users])

    const onPageChange = (currentPage) => {
        props.setCurrentPage(currentPage);
    }

    if (!props.users){
        return <div>loading</div>;
    }

    let pagesCount = props.users.length / props.limit;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);

    let rightBorder = props.currentPage * props.limit - 1;
    let leftBorder = (props.currentPage - 1) * props.limit;

    let currentUsers = props.users.filter((u, i) => {
        return i >= leftBorder && i <= rightBorder
    });

    let filterUsers = currentUsers.filter(u => {
        return u.email.toLowerCase().includes(props.searchCountries.toLowerCase()) || u.username.toLowerCase().includes(props.searchCountries.toLowerCase());
    })


    const sortByDate = () => {
        if (directionSort){
            let sortedUsers = props.users.sort((a,b) => {
                const aDate = new Date(a.registration_date).getTime();
                const bDate = new Date(b.registration_date).getTime();
                return aDate - bDate;
            })
            setUsers(sortedUsers);
        }else {
            let sortedUsers = props.users.sort((a,b) => {
                const aDate = new Date(a.registration_date).getTime();
                const bDate = new Date(b.registration_date).getTime();
                return bDate - aDate;
            })
            setUsers(sortedUsers);
        }
        setDirectionSort(!directionSort);
    }

    const deleteUser = (userId) => {
        props.deleteUserAC(userId);
    }
    // debugger
    return (
        <div className={c.usersBlock}>
            <div>
                Сортировка:
                <button onClick={sortByDate}>Дата регистрации</button>
                <button>Рейтинг</button>
            </div>
            <div className={c.usersItems}>
                {pages.map(p => {
                    return <span onClick={() => {onPageChange(p)}} className={props.currentPage === p ? c.selectedPage : ''}>{p}</span>
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
                                      rating={u.rating} deleteUser={deleteUser}
                                      id={u.id}/>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        limit: state.usersPage.limit,
        totalUsersCount: state.usersPage.totalUsersCount,
        searchCountries: state.usersPage.searchCountries,
    }
}

export default connect(mapStateToProps, {setUsersThunk, setCurrentPage, deleteUserAC, setUsers})(Users)

