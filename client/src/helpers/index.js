import devwrite from '../devwrite';
import history from '../history';
import textVersion from 'textversionjs';
import { useAlert } from 'react-alert'


export const fetchAvatar = async(id) => {
    try {
        const res = await devwrite.get(`users/${id}`);
        const user = res.data;
        return user.photo;
    } catch(err) {
        // console.log(err.response.data.err);
        return '';
    }
}

// POST ROUTES

export const fetchPost = async(id) => {
    try {
        const res = await devwrite.get(`posts/${id}`);
        const post = res.data;
        post.title = textVersion(post.title);
        post.body = textVersion(post.body);
        const photo = await fetchAvatar(post.user);
        post.photo = photo;
        return post;
        
    } catch(err) {
        console.log(err.response.data.err);
        return {error: err.response.data.err};
    }
}

export const createPost = async(postData) => {
    try {
        const res = await devwrite.post(`posts`, {
            ...postData
        });
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.log(err.response.data.err);
        alert(err.response.data.err);
        return { err: err.response.data.err }
    }
}

export const editPost = async(id, postData) => {
    try {
        const res = await devwrite.put(`posts/${id}`, {
            ...postData
        });
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.log(err.response.data.err);
        alert(err.response.data.err);
        return { err: err.response.data.err }
    }
}

export const deletePost = async(id) => {
    if (confirm('Do you want to delete this post')) {
        try {
            const res = await devwrite.delete(`posts/${id}`);
            console.log(res.data);
        } catch(err) {
            alert(err.response.data.err);
            console.log(err.response.data.err);
        }
    }
}

export const likePost = async(id) => {
    try {
        const res = await devwrite.post(`posts/${id}/like`);
        console.log(res.data);

    } catch(err) {
        console.log(err.response)
        alert(err.response.data.err);
        console.log(err.response.data.err);
        return err.response.data;
    }
}

export const savePost = async(id) => {
    try {
        const res = await devwrite.post(`posts/${id}/save`);
        console.log(res.data);
    } catch(err) {
        console.log(err.response.data.err);
        alert(err.response.data.err);
    }
}

export const getComment = async(postId, commentId) => {
    try {
        const res = await devwrite.get(`posts/${postId}/comment/${commentId}`);
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.log(err.response.data);
        return {err: err.response.data.err};
    }
}

// USER ROUTES

export const fetchUser = async(id) => {
    try {
        const res = await devwrite.get(`users/${id}`);
        const user = res.data;
        user.error = '';
        return user;
    } catch(err) {
        console.log(err.response.data.err);
        return {error: err.response.data.err};
    }
}

export const getCurrentUser = async() => {
    try {
        const res = await devwrite.get(`users/me`);
        return res.data;
    } catch(err) {
        console.log(err.response.data.err);
        return {};
    }
}

export const loginUser = async (data) => {
    try {
        const res = await devwrite.post(`login`, {
            ...data
        });
        history.goBack();
        // return res.data;
        console.log(res.data);

    } catch(err) {
        console.log(err);
        alert(err.response.data.err);
        return {};
    }
}

export const logout = async (data) => {
    try {
        const res = await devwrite.post(`logout`, {
            ...data
        });
        console.log(res);
        return res.data;

    } catch(err) {
        console.log(err);
        return {};
    }
}

export const createUser = async(data) => {
    try {
        const res = await devwrite.post(`users`, {
            ...data
        });
        console.log(res.data);
        history.goBack();
        // return res.data;
    } catch(err) {
        console.log(err.response);
        alert(err.response.data.err);
        return {};
    }
}

export const editUser = async({ id, name, about, website, photo }) => {
    try {
        const res = await devwrite.put(`users/${id}`, { name, about, website, photo });
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.log(err.response);
        alert(err.response.data.err);
        return err.response.data;
    }
}

export const deleteUser = async(id) => {
    try {
        const res = await devwrite.delete(`users/${id}`);
        console.log(res);
        return res.data;
    } catch(err) {
        console.log(err.response.data.err);
        alert(err.response.data.err);
        return {};
    }
}

export const followUser = async(id) => {
    try {
        const res = await devwrite.post(`users/${id}/follow`)
        console.log(res.data);
    } catch(err) {
        console.log(err.response.data.err);
        alert(err.response.data.err);
    }
}

export const getTagsCloud = async() => {
    try {
        const res = await devwrite.get('/tags');
        return res.data;
    } catch(err) {
        console.log(err.respose.data.err);
        return []
    }
}