export interface LoginCredentials {
    email: string;
    password: string;
}

export interface NewUserCredentials {
    email: string;
    password: string;
    name: string;
}

export interface CommentType {
    _id: string;
    body: string;
    userId: { _id: string; clerkId: string, name: string, photoUrl: string };
    likedBy_ids: string[];
    createdAt: Date;
}

export interface articleCommentLike {
    articleId: string;
    slug: string;
    likedBy_ids: string[],
    comments: CommentType[];
}

export interface NewComment {
    body: string;
    createdAt: Date;
    clerkUserId: string
}