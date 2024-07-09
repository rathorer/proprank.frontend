// const default_site_url = import.meta.env.DEFAULT_SITE_URL;
const api_url = import.meta.env.API_URL;
export const getAllBlogs = async () => {
    try {
        const response = await fetch(`${api_url}api/blog/getAllBlogs`);
        if (!response.ok) {
            throw new Error("failed to fetch data");
        }
        const allBlogArticles = await response.json();
        return allBlogArticles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getBlog = async (slug) => {
    try {
        const response = await fetch(`${api_url}api/blog/getBlog/${slug}`);
        if (!response.ok) {
            throw new Error("failed to fetch data");
        }
        const allBlogArticles = await response.json();
        return allBlogArticles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const postBlog = async (data) => {
    try {
        const response = await fetch(`api/blog/postNewBlog/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("failed to save data");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loginUser = async function (credentials) {
    try {
        let api_url = import.meta.env.PUBLIC_API_URL;
        let response = await fetch(`${api_url}api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        let status = response.status;
        const result = await response.json();
        return { result, status };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createUser = async function (credentials) {
    try {
        let api_url = import.meta.env.PUBLIC_API_URL;
        let response = await fetch(`${api_url}api/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        let status = response.status;
        const result = await response.json();
        return { result, status };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const postComments = async function (data) {
    try {
        let api_url = import.meta.env.PUBLIC_API_URL;
        let response = await fetch(`${api_url}api/blog/comments/postComments/${data.articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        let status = response.status;
        const result = await response.json();
        return { result, status };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getComments = async (articleId) => {
    try {
        let api_url = import.meta.env.PUBLIC_API_URL;
        const response = await fetch(`${api_url}api/blog/comments/getComments/${articleId}`);
        if (!response.ok) {
            throw new Error("failed to fetch data");
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.log(error);
        throw error;
    }
}