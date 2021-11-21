import {usersAPI} from "../api/usersApi";

const SET_USERS = 'SET_USERS';
const SET_CUR_PAGE = 'SET_CUR_PAGE';
const SET_SEARCH_USERS = 'SET_SEARCH_USERS';
const DELETE_USER = 'DELETE_USER';

const initialState = {
    users: null,
    currentPage: 1,
    limit: 5,
    searchUsers: '',
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
        case SET_SEARCH_USERS:
            return {
                ...state,
                searchUsers: action.searchUsers
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

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CUR_PAGE,
        currentPage: currentPage,
    }
}

export const setSearchUsers = (value) => {
    return {
        type: SET_SEARCH_USERS,
        searchUsers: value,
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
            dispatch(setUsers(response.data));
        })
    }
}

export default usersReducer;