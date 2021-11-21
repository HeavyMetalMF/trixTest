import React from 'react';
import c from './modal.module.css';
import cn from 'classnames';

const Modal = (props) => {

    const deleteUser = () => {
        props.deleteUser(props.id);
        props.setActiveModal(false);
    }

    return (
        <div className={cn({[c.active]:props.activeModal}, c.modal)} onClick={() => {props.setActiveModal(false)}}>
            <div className={c.modal_content} onClick={(e) => {e.stopPropagation()}}>
                <div>Вы уверены что хотите удалить пользователя?</div>
                <div>
                    <button className={c.questionsButton} onClick={deleteUser}>Да</button>
                    <button className={c.questionsButton} onClick={() => {props.setActiveModal(false)}}>Нет</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;