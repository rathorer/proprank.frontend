// import { getCollection } from 'astro:content';

export const GET = async ({ params }) => {
    // console.log(url);
    const slug = params.slug;

    // Handle if query is not present
    // if (query === null) {
    //     return new Response(
    //         JSON.stringify({
    //             error: 'Query param is missing',
    //         }),
    //         {
    //             status: 400, // Bad request
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }
    //     );
    // }
    const response = await fetch(`http://localhost:8000/api/blog/getBlog/${slug}`);
    const blog = await response.json();
    // const allBlogArticles = await getCollection('blog');

    // Filter articles based on query
    // const searchResults = 

    return new Response(JSON.stringify(blog), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
