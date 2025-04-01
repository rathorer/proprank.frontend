import { LocalAuthProvider, defineConfig, defineSchema, createClient } from "tinacms";
import CustomAuthProvider from "./auth";
import { CalculateReadTime } from "../src/utils";


const canAccessAdminCollection = (user) => {
	return false
}
const url = process.env.API_URL;
// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"main";


export default defineConfig({
	branch,

	authProvider: new CustomAuthProvider(url),
	admin: {
		authHooks: {

		}
	},

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
						list: false,
						options: [
							{
								value: "residential",
								label: "Residential",
							},
							{
								value: "commerical",
								label: "Commerical"
							},
							{
								value: "agriculture",
								label: "Agriculture",
							},
							{
								value: "institutional",
								label: "Institutional"
							},
							{
								value: "industrial",
								label: "Industrial"
							},
							{
								value: "comparative",
								label: "Comparative Analysis"
							}
						]
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
					{
						type: "string",
						name: "db_id",
						label: "db_id",
						ui: {
							component: "hidden"
						}
					},
					{
						type: "number",
						name: "readTime",
						label: "readTime",
						ui: {
							component: "hidden"
						}
					},
					{
						type: "string",
						name: "type",
						label: "type",
						ui: {
							component: "hidden"
						}
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						values.readTime = CalculateReadTime(values.body.children);
						values.type = "article";
						const { title, slug, titleImage, tags, author, db_id, readTime, type, category } = values;
						const data = { _id: db_id, title, titleImage, category, slug, author, tags, readTime, type }
						const response = await fetch(`https://proprankapi.azurewebsites.net/api/blog/postNewBlog`, {
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
						values.db_id = result.blog._id;
						return { ...values };
					},
				},
			},
			{
				name: "infographics",
				label: "Infographics",
				path: "src/content/infographics",
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
						type: 'image',
						name: 'titleImage',
						label: 'Infographic',
						required: true,
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
						list: false,
						options: [
							{
								value: "residential",
								label: "Residential",
							},
							{
								value: "commerical",
								label: "Commerical"
							},
							{
								value: "agriculture",
								label: "Agriculture",
							},
							{
								value: "institutional",
								label: "Institutional"
							},
							{
								value: "industrial",
								label: "Industrial"
							},
							{
								value: "comparative",
								label: "Comparative Analysis"
							}
						]
					},
					{
						type: 'string',
						name: 'slug',
						label: 'Slug',
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
					{
						type: "string",
						name: "db_id",
						label: "db_id",
						ui: {
							component: "hidden"
						}
					},
					{
						type: "string",
						name: "type",
						label: "type",
						ui: {
							component: "hidden"
						}
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						values.readTime = 0;
						values.type = "infographics";
						const { title, slug, titleImage, tags, author, db_id, readTime, type, category } = values;
						const data = { _id: db_id, title, titleImage, slug, category, author, tags, readTime, type }
						const response = await fetch(`https://proprankapi.azurewebsites.net/api/blog/postNewBlog`, {
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
						values.db_id = result.blog._id;
						return { ...values };
					},
				},
			},
			{
				name: "Questions",
				label: "Questions",
				path: "src/content/Questions",
				fields: [
					{
						type: "string",
						name: "questionTitle",
						label: "Question Title",
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
						list: false,
						options: [
							{
								value: "residential",
								label: "Residential",
							},
							{
								value: "commerical",
								label: "Commerical"
							},
							{
								value: "agriculture",
								label: "Agriculture",
							},
							{
								value: "institutional",
								label: "Institutional"
							},
							{
								value: "industrial",
								label: "Industrial"
							},
							{
								value: "comparative",
								label: "Comparative Analysis"
							}
						]
					},
					{
						type: 'string',
						name: 'slug',
						label: 'Slug',
						required: true,
					},
					{
						type: "rich-text",
						name: "questionBody",
						label: "Question",
						isBody: true,
					},
					{
						type: "string",
						name: "db_id",
						label: "db_id",
						ui: {
							component: "hidden"
						}
					}
				],
			},
		]
	}
});

export const schema = defineSchema({
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
				{
					type: "string",
					name: "db_id",
					label: "db_id",
					ui: {
						component: "hidden"
					}
				}
			],
			ui: {
				beforeSubmit: async ({ form, cms, values }) => {
					const { title, slug, titleImage, tags, author, db_id } = values;
					const data = { _id: db_id, title, titleImage, slug, author, tags }
					const response = await fetch(`https://proprankapi.azurewebsites.net/api/blog/postNewBlog`, {
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
					values.db_id = result.blog._id;
				},
			},
		}
	],
});
