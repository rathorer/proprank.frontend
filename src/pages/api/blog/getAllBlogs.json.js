// import { getCollection } from 'astro:content';
const api_url = import.meta.env.API_URL;
export const GET = async () => {
    const response = await fetch(`${api_url}api/blog/getAllBlogs`);
    const allBlogArticles = await response.json();
    return new Response(JSON.stringify(allBlogArticles), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
