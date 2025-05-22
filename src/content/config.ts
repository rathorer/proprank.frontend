import { defineCollection, z } from 'astro:content';
const infographicsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		titleImage: z.string(),
		quote: z.string(),
		db_id: z.string(),
		createdAt: z.date()
	}),
});

const caseStudyCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		titleImage: z.string(),
		images: z.array(z.string()),
		db_id: z.string(),
		createdAt: z.date()
	}),
});

export const collections = {
	infographics: infographicsCollection,
	caseStudy: caseStudyCollection
};
