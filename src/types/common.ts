interface LoginCredentials {
    email: string;
    password: string;
}

interface NewUserCredentials {
    email: string;
    password: string;
    name: string;
}

interface CommentInter {
    _id: string;
    body: string;
    userId: Record<string, string> | string;
    likedBy_ids: string[];
    createdAt: Date;
}

interface articleCommentLike {
    articleId: string;
    slug: string;
    likedBy_ids: string[],
    comments: Partial<CommentInter>[];
}