import React, {useState} from 'react';
import c from "./users.module.css";
import Modal from "../modal/Modal";

const User = (props) => {
    const [activeModal, setActiveModal] = useState(false);

    return (
        <tr align='left'>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.date}</td>
            <td>{props.rating}</td>
            <td className={c.delete} onClick={() => {setActiveModal(true)}} >X</td>
            <Modal id={props.id} deleteUser={props.deleteUser} activeModal={activeModal} setActiveModal={setActiveModal}/>
        </tr>

    );
};

export default User;