import { User, Comment } from "@advanced-react/server/database/schema";

type CommentWithUser = Comment & {
  user: User;
};

export type CommentForList = CommentWithUser;
