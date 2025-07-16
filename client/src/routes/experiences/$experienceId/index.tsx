import { z } from "zod";
import { isTRPCClientError, trpc } from "@/router";
import { createFileRoute, notFound } from "@tanstack/react-router";

import CommentsSection from "@/features/comments/compnents/CommentsSection";
import { ExperienceDetails } from "@/features/experinces/components/ExperienceDetails";

export const Route = createFileRoute("/experiences/$experienceId/")({
  params: {
    parse: (params) => ({
      experienceId: z.coerce.number().parse(params.experienceId),
    }),
  },
  loader: async ({ params, context: { trpcQueryUtils } }) => {
    await trpcQueryUtils.experiences.byId.ensureData({
      id: params.experienceId,
    });
    try {
      await trpcQueryUtils.experiences.byId.ensureData({
        id: params.experienceId,
      });
    } catch (error) {
      if (isTRPCClientError(error) && error.data?.code === "NOT_FOUND") {
        throw notFound();
      }

      throw error;
    }
  },
  component: ExperiencePage,
});

function ExperiencePage() {
  const { experienceId } = Route.useParams();

  const [experience] = trpc.experiences.byId.useSuspenseQuery({
    id: experienceId,
  });

  return (
    <main className="spacey4 pb20">
      <ExperienceDetails experience={experience} />
      <CommentsSection
        experienceId={experienceId}
        commentsCount={experience.commentsCount}
      />
    </main>
  );
}
