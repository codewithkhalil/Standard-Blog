import axios from "axios";

const BASE_URL = 'http://api.gippojltd.com/api'

const register = async (userData) => {
    const response = await axios.post(BASE_URL + '/register', userData)

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(BASE_URL + '/login', userData)

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    console.log(response.data);
    return response.data
}

const updateUser = async (userData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(BASE_URL + `/user/update/${id}`, userData, config)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data);

    return response.data
}

const deleteUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(BASE_URL + `/user/delete/${id}`, config)

    localStorage.removeItem('user')

    console.log(response.data);

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const userService = {
    register,
    login,
    logout,
    updateUser,
    deleteUser
}

export default userService
