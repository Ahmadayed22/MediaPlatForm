import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

import { Button } from "../../ui/Button";
import { DialogContent, DialogFooter, DialogHeader } from "../../ui/Dialog";
import { trpc } from "@/trpc";
import { CommentForList } from "@/features/comments/types";

type DeleteMutationType = ReturnType<typeof trpc.comments.delete.useMutation>;
type DialogDeleteProps = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  deleteMutation: DeleteMutationType;
  comment: CommentForList;
};

const DialogDelete = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  deleteMutation,
  comment,
}: DialogDeleteProps) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive-link">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
        </DialogHeader>
        <p className="text-neutral-600 dark:text-neutral-400">
          Are you sure you want to delete this comment? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteMutation.mutate({ id: comment.id });
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDelete;
