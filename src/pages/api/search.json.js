// import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
// import type { CollectionEntry } from 'astro:content';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('query');

	// Handle if query is not present
	if (query === null) {
		return new Response(
			JSON.stringify({
				error: 'Query param is missing',
			}),
			{
				status: 400, // Bad request
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	const allBlogArticles = await getCollection(
		'blog'
	);

	// Filter articles based on query
	const searchResults = allBlogArticles.filter((article) => {
		const titleMatch= article.data.title
			.toLowerCase()
			.includes(query?.toLowerCase());

		const bodyMatch = article.body
			.toLowerCase()
			.includes(query?.toLowerCase());

		const slugMatch = article.slug
			.toLowerCase()
			.includes(query?.toLowerCase());

		return titleMatch || bodyMatch || slugMatch;
	});

	return new Response(JSON.stringify(searchResults), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
