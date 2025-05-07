import { trpc } from "@/router";
import { Experience } from "@advanced-react/server/database/schema";
import CommentList from "./CommentList";
import { CommentCreateForm } from "./CommentCreateForm";

type CommentsSectionProps = {
  experienceId: Experience["id"];
  commentsCount: number;
};

const CommentsSection = ({
  experienceId,
  commentsCount,
}: CommentsSectionProps) => {
  const commentsQuery = trpc.comments.byExperienceId.useQuery(
    {
      experienceId,
    },
    { enabled: commentsCount > 0 },
  );
  if (commentsQuery.error) {
    return <div>somthing went wrong</div>;
  }
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments ({commentsCount})</h3>
      <CommentCreateForm experienceId={experienceId} />
      <CommentList
        comments={commentsQuery.data ?? []}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  );
};

export default CommentsSection;
