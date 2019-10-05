import devwrite from '../devwrite';
import history from '../history';
import textVersion from 'textversionjs';
import _ from 'underscore';

const handleError = (err, alert) => {
    let error;
    error = { err: 'Server error!' }
    if (err.response){
        error = err.response.data;
    }
    alert.error(error.err);
    return error;
}

const helpers= {

    fetchAvatar: async(id) => {
        try {
            const res = await devwrite.get(`users/${id}`);
            const user = res.data;
            return user.photo;
        } catch(err) {
            return '';
        }
    },
    
    // POST ROUTES
    
    fetchPost: async(id) => {
        try {
            const res = await devwrite.get(`posts/${id}`);
            const post = res.data;
            post.title = textVersion(post.title);
            post.body = textVersion(post.body);
            const photo = await helpers.fetchAvatar(post.user);
            post.photo = photo;
            return post;
            
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    createPost: async(postData, alert) => {
        try {
            const res = await devwrite.post(`posts`, {
                ...postData
            });
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    editPost: async(id, postData, alert) => {
        try {
            const res = await devwrite.put(`posts/${id}`, {
                ...postData
            });
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    deletePost: async(id, alert) => {
        if (confirm('Do you want to delete this post')) {
            try {
                const res = await devwrite.delete(`posts/${id}`);
                alert.success(res.data.msg);
            } catch(err) {
                return handleError(err, alert);
            }
        }
    },
    
    likePost: async(id, alert) => {
        try {
            const res = await devwrite.post(`posts/${id}/like`);
            return res.data;

        } catch(err){
            return handleError(err, alert);
        }
    },
    
    savePost: async(id, alert) => {
        try {
            const res = await devwrite.post(`posts/${id}/save`);
            console.log(res.data);
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    getComment: async(postId, commentId, alert) => {
        try {
            const res = await devwrite.get(`posts/${postId}/comment/${commentId}`);
            console.log(res.data);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    // USER ROUTES
    
    fetchUser: async(id) => {
        try {
            const res = await devwrite.get(`users/${id}`);
            const user = res.data;
            user.error = '';
            return user;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    getCurrentUser: async() => {
        try {
            const res = await devwrite.get(`users/me`);
            return res.data;
        } catch(err) {
            console.log(err.response.data.err);
            return {};
        }
    },
    
    loginUser: async (data, alert) => {
        try {
            const res = await devwrite.post(`login`, {
                ...data
            });
            console.log(res.data);
            alert.success(res.data.msg);
            // history.goBack();
    
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    logout: async (data, alert) => {
        try {
            const res = await devwrite.post(`logout`, {
                ...data
            });
            alert.success(res.data.msg);
            return res.data;
    
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    createUser: async(data, alert) => {
        try {
            const res = await devwrite.post(`users`, {
                ...data
            });
            alert.success(res.data.msg);
            history.goBack();
            // return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    editUser: async({ id, name, about, website, photo }) => {
        try {
            const res = await devwrite.put(`users/${id}`, { name, about, website, photo });
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    deleteUser: async(id) => {
        try {
            const res = await devwrite.delete(`users/${id}`);
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    followUser: async(id, alert) => {
        try {
            const res = await devwrite.post(`users/${id}/follow`)
            alert.success(res.data.msg);
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    getTagsCloud: async() => {
        try {
            const res = await devwrite.get('/tags');
            return res.data;
        } catch(err) {
            console.log(err.respose.data.err);
            return []
        }
    }
}

export default helpers;