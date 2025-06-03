import { LocalAuthProvider, defineConfig, defineSchema, createClient, Form, TinaCMS } from "tinacms";
import CustomAuthProvider from "./auth";


// const canAccessAdminCollection = (user) => {
// 	return false
// }
const url = process.env.API_URL;
// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"master";

const apiUrl = process.env.TINA_PUBLIC_API_URL;

export default defineConfig({
	branch,
	authProvider: new CustomAuthProvider(),
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
	server: {
		cors: {
			origin: "*", // Allow all origins (or specify your domain)
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
		},
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
						type: 'string',
						name: 'slug',
						label: 'Slug',
						required: true,
					},
					{
						type: 'string',
						name: 'quote',
						label: 'Quote',
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
						type: "datetime",
						name: "createdAt",
						label: "created At",
						ui: {
							component: "hidden"
						}
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						const { title, slug, titleImage, tags, db_id, quote } = values;
						const data = { _id: db_id, title, titleImage, slug, tags, type: "infographics", quote };
						const response = await fetch(`${apiUrl}api/blog/postNewBlog`, {
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
						values.createdAt = new Date();
						return { ...values };
					},
				},
			},
			{
				name: "caseStudy",
				label: "Case Study",
				path: "src/content/caseStudy",
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
						label: 'Title Image',
						required: true,
					},
					{
						type: 'image',
						name: 'images',
						label: 'Images',
						required: true,
						list: true
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
						type: "datetime",
						name: "createdAt",
						label: "created At",
						ui: {
							component: "hidden"
						}
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						const { title, slug, titleImage, tags, db_id, images } = values;
						const data = { _id: db_id, title, titleImage, slug, tags, type: "caseStudy", images };
						console.log(data);
						const response = await fetch(`${apiUrl}api/blog/postNewBlog`, {
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
						values.createdAt = new Date();
						return { ...values };
					},
				},
			},
			{
				name: "motionGraphics",
				label: "Motion Graphics",
				path: "src/content/motionGraphics",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "string",
						name: "videoId",
						label: "Video Id",
						required: true,
					},
					{
						type: 'image',
						name: 'titleImage',
						label: 'Thumbnail',
						required: true,
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
						type: "datetime",
						name: "createdAt",
						label: "created At",
						ui: {
							component: "hidden"
						}
					},
				],
				ui: {
					beforeSubmit: async ({ form, cms, values }) => {
						const { title, titleImage, db_id, videoId } = values;
						const data = { _id: db_id, title, titleImage, type: "motionGraphic", videoId };
						console.log(data);
						const response = await fetch(`${apiUrl}api/blog/postNewBlog`, {
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
						values.createdAt = new Date();
						return { ...values };
					},
				},
			},
		]
	}
});