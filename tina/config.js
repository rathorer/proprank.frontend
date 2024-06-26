import { LocalAuthProvider, defineConfig } from "tinacms";
import { CustomAuthProvider } from "./auth";
// import { postBlog } from "../src/services/api";


// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"main";

export default defineConfig({
	branch,

	// authProvider: new CustomAuthProvider(),

	// Get this from tina.io
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "/images",
			publicFolder: "public",
		},
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [
			{
				name: "blog",
				label: "blog",
				path: "src/content/blog",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						label: 'Tags',
						name: 'tags',
						type: 'string',
						list: true,
						required: true
					},
					{
						label: 'Author',
						name: 'author',
						type: 'string',
					},
					{
						label: 'Category',
						name: 'category',
						type: 'string',
					},
					{
						type: 'string',
						name: 'slug',
						label: 'Slug',
						required: true,
					},
					{
						type: 'image',
						name: 'titleImage',
						label: 'Title Image',
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						const { title, slug, titleImage, tags, author } = values;
						const data = { title, titleImage, slug, author, tags }
						console.log(data);
						const response = await fetch(`http://localhost:8000/api/blog/postNewBlog`, {
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
					}
				}
			},
		]

	},
});
