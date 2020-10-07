import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://35.228.122.244:80/api/',
})

const api = {
    setToken(token) {
        Object.assign(instance.defaults, {headers: {Authorization: `Bearer ${token}`}});
    },
    login(email, password) {
        return instance.get(`login?email=${email}&password=${password}`);
    },

    getCalls(page) {
        return instance.get(`calls?page=${page}`)
    },

    getLines(page) {
        return instance.get(`lines?page=${page}`)
    },

    getBills(page) {
        return instance.get(`bills?page=${page}`)
    },
    getUserinfo(id) {
        return instance.get(`userinfo?id=${id}`)
    }
}
export default api;