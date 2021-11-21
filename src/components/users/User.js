import React from 'react';
import c from "./users.module.css";

const User = (props) => {
    return (
        <tr align='left'>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.date}</td>
            <td>{props.rating}</td>
            <td className={c.delete} onClick={() => {props.deleteUser(props.id)}}>X</td>
        </tr>
    );
};

export default User;