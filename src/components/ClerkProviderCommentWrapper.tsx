import { ClerkProvider } from "@clerk/clerk-react";
import CommentSection from "./CommentSection";

export default function ClerkProviderCommentSectionWrapper({  title, articleId, slug  }) {
    return (
        <ClerkProvider publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <CommentSection title={title} articleId={articleId} slug={slug} />
        </ClerkProvider>
    )
}

