import React from 'react';
import c from './search.module.css';
import {setSearchCountries} from "../../store/usersReducer";
import {connect} from "react-redux";

const Search = (props) => {

    const filter = (e) => {
        props.setSearchCountries(e)
    }

    return (
        <div className={c.searchBlock}>
            <div>
                Список пользователей
            </div>
            <div className={c.searchItems}>
                <input onChange={(e) => filter(e.target.value)} type="text"/>
                <div className={c.clear}>Очистить фильтр</div>
            </div>
        </div>
    );
};

export default connect(null, {setSearchCountries})(Search)