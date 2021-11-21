import React from 'react';
import c from "./users.module.css";

const User = (props) => {

    const showModal = (id) => {
        props.setModalId(id);
        props.setActiveModal(true)
    }

    return (
        <tr align='left'>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.date}</td>
            <td>{props.rating}</td>
            <td className={c.delete} onClick={() => {
                showModal(props.id)
            }}>X
            </td>
        </tr>
    );
};

export default User;