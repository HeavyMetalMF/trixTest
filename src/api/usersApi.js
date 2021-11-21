const axios = require('axios').default;

export const usersAPI = {
    getUsers(currentPage, limit){
        return axios.get(`https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users?page=${currentPage}&limit=${limit}`);
    },
    getAllUsers(){
        return axios.get(`https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users`);
    }
}