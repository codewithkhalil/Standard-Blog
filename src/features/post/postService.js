import axios from "axios"


const BASE_URL = 'http://api.gippojltd.com/api'

const getPosts = async () => {
    const response = await axios.get(BASE_URL + '/get/posts')
    return response.data;
}

const getPostById = async (id) => {
    const response = await axios.get(BASE_URL + `/single/post/${id}`)
    return response.data

}

const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(BASE_URL + `/add/post`, postData, config)
    console.log(response);
    return response.data
}
const updatePost = async (postData, id, token) => {
    const config = {
        method: 'POST',
        url: BASE_URL + `/update/post/${id}`,
        data: postData,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`
        }
    }

    console.log(config);
    const response = await axios(config).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
    console.log(response)
    return response.data
}

const deletePost = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(BASE_URL + `/delete/post/${id}`, config)
    return response.data
}

const postService = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}

export default postService;