// const default_site_url = import.meta.env.DEFAULT_SITE_URL;
const api_url = import.meta.env.PUBLIC_API_URL;
import type { CommentType, LoginCredentials, NewComment, NewUserCredentials, articleCommentLike } from "../types/common"

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
export const getBlog = async (slug: string): Promise<[]> => {
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

export const loginUser = async function (credentials: LoginCredentials) {
    try {
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

export const createUser = async function (credentials: NewUserCredentials) {
    try {
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

export const likeUnLikeComment = async (data: { articleId: string, commentId: string, clerkUserId: string, event: "like" | "unlike" }, token: string | null) => {
    try {
        const response = await fetch(`${api_url}api/blog/comments/likeUnLikeComment/${data.articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        let status = response.status;
        const result = await response.json();
        return { result, status };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const likeUnLikeArticle = async (data: { articleId: string, slug: string, clerkUserId: string, event: "like" | "unlike" }, token: string | null) => {
    try {
        const response = await fetch(`${api_url}api/blog/comments/likeUnLikeArticle/${data.articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        let status = response.status;
        const result = await response.json();
        return { result, status };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const postComment = async function (data: { articleId: string, slug: string, comment: NewComment }, token: string | null) {
    try {
        const response = await fetch(`${api_url}api/blog/comments/postComment/${data.articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteComment = async (articleId: string, commentId: string, token: string | null) => {
    try {
        await fetch(`${api_url}api/blog/comments/deleteComment/${articleId}/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getComments = async (articleId: string) => {
    try {
        const response = await fetch(`${api_url}api/blog/comments/getComments/${articleId}`);
        if (response.status == 404) {
            throw new Error("failed to fetch data");
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
}