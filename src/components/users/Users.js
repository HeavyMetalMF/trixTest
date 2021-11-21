import React, {useState} from 'react';
import c from "./users.module.css";
import User from "./User";
import Modal from "../modal/Modal";

const Users = (props) => {
    const [directionSort, setDirectionSort] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [modalUserId, setModalUserId] = useState(false);

    const mySort = (direction, type) => (a, b) => {
        const aProp = type === 'date' ? new Date(a.registration_date).getTime() : a.rating;
        const bProp = type === 'date' ? new Date(b.registration_date).getTime() : b.rating;
        if (direction) return aProp - bProp
        else return bProp - aProp;
    }

    const sortByColumn = (directionSort, type) => {
        let sortedUsers = props.usersCopy.sort(mySort(directionSort, type))
        props.setUsersForSort(sortedUsers);
        setDirectionSort(!directionSort);
        props.clearButtonAC(true);
    }

    const onPageChange = (currentPage) => {
        props.setCurrentPage(currentPage);
    }

    const deleteUser = (userId) => {
        props.deleteUserAC(userId);
    }
    return (
        <div className={c.usersBlock}>
            <div>
                Сортировка:
                <button onClick={() => {sortByColumn(directionSort, 'date')}}>Дата регистрации</button>
                <button onClick={() => {sortByColumn(directionSort, 'rating')}}>Рейтинг</button>
            </div>
            <div className={c.usersItems}>
                {props.pages.map(p => {
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
                    {props.filterUsers.map(u => {
                            return (
                                <User username={u.username}
                                      email={u.email}
                                      date={u.registration_date.slice(0, 10).split('-').join('.')}
                                      rating={u.rating}
                                      id={u.id}
                                      key={u.id}
                                      deleteUser={deleteUser}
                                      activeModal={activeModal}
                                      setActiveModal={setActiveModal}
                                      setModalId={setModalUserId}
                                />
                            )
                        }
                    )}
                    </tbody>
                </table>
                <Modal id={modalUserId} deleteUser={deleteUser} activeModal={activeModal} setActiveModal={setActiveModal}/>
            </div>
        </div>
    );
};

export default Users;