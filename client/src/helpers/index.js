import devwrite from '../devwrite';
import history from '../history';
import textVersion from 'textversionjs';

// POST ROUTES

export const fetchPost = async(id) => {
    try {
        const res = await devwrite.get(`posts/${id}`);
        const post = res.data;
        post.title = textVersion(post.title);
        post.body = textVersion(post.body);
        return post;
        
    } catch(err) {
        console.log(err.response.data);
        return {error: err.response.data.err};
    }
}

export const createPost = async() => {
    try {
        const res = await devwrite.post(`posts`);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const editPost = async(id) => {
    try {
        const res = await devwrite.put(`posts/${id}`);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const deletePost = async(id) => {
    if (confirm('Do you want to delete this post')) {
        try {
            const res = await devwrite.delete(`posts/${id}`);
            console.log(res.data);
        } catch(err) {
            console.log(err);
        }
    }
}

export const likePost = async(id) => {
    try {
        const res = await devwrite.post(`posts/${id}/like`);
        console.log(res.data);

    } catch(err) {
        console.log(err);
    }
}

export const savePost = async(id) => {
    try {
        const res = await devwrite.post(`posts/${id}/save`);
        console.log(res.data);
    } catch(err) {
        console.log(err);
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
        console.log(res.data);
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
        // console.log(res);
        return res.data;
    } catch(err) {
        console.log(err.response);
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

    } catch(err) {
        console.log(err);
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
        return {};
    }
}

export const editUser = async({ id, name, about, website }) => {
    try {
        const res = await devwrite.put(`users/${id}`, { name, about, website });
        console.log(res.data);
    } catch(err) {
        console.log(err.response);
    }
}

export const deleteUser = async(id) => {
    try {
        const res = await devwrite.delete(`users/${id}`);
        console.log(res);
        return res.data;
    } catch(err) {
        console.log(err);
        return {};
    }
}

export const followUser = async(id) => {
    try {
        const res = await devwrite.post(`users/${id}/follow`)
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}