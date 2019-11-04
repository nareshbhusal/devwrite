import devwrite from '../devwrite';
import history from '../history';

const handleError = (err, alert=window.alert) => {
    let error;
    error = { err: 'Server error!' }
    if (err.response){
        error = err.response.data;
    }
    alert(error.err);
    return error;
}

const helpers= {

    fetchAvatar: async(id) => {
        try {
            const res = await devwrite.get(`users/${id}/avatar`);
            const photo = res.data;
            return photo;
        } catch(err) {
            return '';
        }
    },
    
    // POST ROUTES
    
    fetchPost: async(id) => {
        try {
            const res = await devwrite.get(`posts/${id}`);
            const post = res.data;
            const photo = await helpers.fetchAvatar(post.user);
            post.photo = photo;
            return post;
            
        } catch(err) {
            return handleError(err, alert=()=>{console.log});
        }
    },
    
    createPost: async(postData, alert=window.alert) => {
        try {
            const res = await devwrite.post(`posts`, {
                ...postData
            });
            // alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    editPost: async(id, postData, alert=window.alert) => {
        try {
            const res = await devwrite.put(`posts/${id}`, {
                ...postData
            });
            // alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert);
        }
    },
    
    deletePost: async(id, alert=window.alert) => {
        if (confirm('Do you want to delete this post')) {
            try {
                const res = await devwrite.delete(`posts/${id}`);
                alert.success(res.data.msg);
            } catch(err) {
                return handleError(err, alert.error);
            }
        }
    },
    
    likePost: async(id, alert=window.alert) => {
        try {
            const res = await devwrite.post(`posts/${id}/like`);
            return res.data;

        } catch(err){
            return handleError(err, alert.error);
        }
    },
    
    savePost: async(id, alert=window.alert) => {
        try {
            const res = await devwrite.post(`posts/${id}/save`);
            console.log(res.data);
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    getComment: async(postId, commentId, alert=window.alert) => {
        try {
            const res = await devwrite.get(`posts/${postId}/comment/${commentId}`);
            return res.data;
        } catch(err) {
            return handleError(err, alert=()=>{console.log});
        }
    },

    postComment: async({ body, postId }) => {
        try {
            const res = await devwrite.post(`posts/${postId}/comment`, {
                body
            });
            console.log(res.data);
            return res.data;
        } catch(err) {
            handleError(err);
        }
    },
    likeComment: async({ id, postId }, alert=window.alert)=> {
        try {
            const res = await devwrite.post(`posts/${postId}/comment/${id}/like`);
            console.log(res.data);
        } catch(err) {
            handleError(err, alert);
        }
    },

    editComment: async({ body, postId, id }) => {
        try {
            const res = await devwrite.put(`posts/${postId}/comment/${id}`, {
                body
            });
            return res.data;
        } catch(err) {
            handleError(err);
        }
    },

    deleteComment: async({ id, postId })=>{
        try {
            const res = await devwrite.delete(`posts/${postId}/comment/${id}`);
            console.log(res.data);
        } catch(err) {
            handleError(err);
        }
    },
    
    // USER ROUTES
    
    fetchUser: async(id) => {
        try {
            const res = await devwrite.get(`users/${id}`);
            const user = res.data;
            user.err = '';
            return user;
        } catch(err) {
            return handleError(err, alert=()=>{console.log});
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
    
    loginUser: async (data, alert=window.alert) => {
        try {
            const res = await devwrite.post(`login`, {
                ...data
            });
            alert.success(res.data.msg);
            history.goBack();
    
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    logout: async (data, alert=window.alert) => {
        try {
            const res = await devwrite.post(`logout`, {
                ...data
            });
            // alert.success(res.data.msg);
            return res.data;
    
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    createUser: async(data, alert=window.alert) => {
        try {
            const res = await devwrite.post(`users`, {
                ...data
            });
            alert.success(res.data.msg);
            history.goBack();
            // return res.data;
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    editUser: async({ id, name, about, website, photo }, alert=window.alert) => {
        try {
            const res = await devwrite.put(`users/${id}`, { name, about, website, photo });
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    deleteUser: async(id) => {
        try {
            const res = await devwrite.delete(`users/${id}`);
            alert.success(res.data.msg);
            return res.data;
        } catch(err) {
            return handleError(err, alert.error);
        }
    },
    
    followUser: async(id, alert=window.alert) => {
        try {
            const res = await devwrite.post(`users/${id}/follow`)
            // alert.success(res.data.msg);
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