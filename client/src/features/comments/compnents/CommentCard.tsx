import Card from "@/features/shared/components/ui/Card";
import { CommentForList } from "../types";
import { useState } from "react";
import { CommentEditForm } from "./CommentEditForm";
import { Button } from "@/features/shared/components/ui/Button";
import { trpc } from "@/router";
import { useToast } from "@/features/shared/hooks/useToast";
import DialogDelete from "@/features/shared/components/common/Model/DialogDelete";

type CommentCardProps = {
  comment: CommentForList;
};

function CommentCard({ comment }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <CommentEditForm comment={comment} setIsEditing={setIsEditing} />;
  }
  return (
    <Card className="space-y-4">
      <CommentCardHeader comment={comment} />
      <CommentCardContent comment={comment} />
      <CommentCardButtons comment={comment} setIsEditing={setIsEditing} />
    </Card>
  );
}

type CommentCardHeaderProps = Pick<CommentCardProps, "comment">;

function CommentCardHeader({ comment }: CommentCardHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div>{comment.user.name}</div>
      <time className="text-sm text-neutral-500">
        · {new Date(comment.createdAt).toLocaleDateString()}
      </time>
    </div>
  );
}

type CommentCardContentProps = Pick<CommentCardProps, "comment">;

function CommentCardContent({ comment }: CommentCardContentProps) {
  return <p>{comment.content}</p>;
}

type CommentCardButtonsProps = Pick<CommentCardProps, "comment"> & {
  setIsEditing: (value: boolean) => void;
};

function CommentCardButtons({
  setIsEditing,
  comment,
}: CommentCardButtonsProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteMutation = trpc.comments.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.comments.byExperienceId.invalidate({
          experienceId: comment.experienceId,
        }),
        utils.experiences.feed.invalidate(),
      ]);

      setIsDeleteDialogOpen(false);

      toast({
        title: "Comment deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete comment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex gap-4">
      <Button variant="link" onClick={() => setIsEditing(true)}>
        Edit
      </Button>
      <DialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        deleteMutation={deleteMutation}
        comment={comment}
      />
    </div>
  );
}

export default CommentCard;
