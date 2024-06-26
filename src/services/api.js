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
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}