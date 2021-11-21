import {usersAPI} from "../api/usersApi";

const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CUR_PAGE = 'SET_CUR_PAGE';
const SET_SEARCH_COUNTRIES = 'SET_SEARCH_COUNTRIES';
const DELETE_USER = 'DELETE_USER';

const initialState = {
    users: null,
    currentPage: 1,
    limit: 5,
    totalUsersCount: 0,
    searchCountries: '',
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CUR_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_SEARCH_COUNTRIES:
            return {
                ...state,
                searchCountries: action.searchCountries
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(u => u.id !== action.userId)
            }
        default:
            return state;
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users: users,
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalUsersCount,
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CUR_PAGE,
        currentPage: currentPage,
    }
}

export const setSearchCountries = (value) => {
    return {
        type: SET_SEARCH_COUNTRIES,
        searchCountries: value,
    }
}

export const deleteUserAC = (userId) => {
    return {
        type: DELETE_USER,
        userId: userId,
    }
}

export const setUsersThunk = () => {
    return (dispatch) => {
        usersAPI.getAllUsers().then(response => {
            dispatch(setTotalUsersCount(response.data.length));
            dispatch(setUsers(response.data));
            // debugger
        })
    }
}

export default usersReducer;