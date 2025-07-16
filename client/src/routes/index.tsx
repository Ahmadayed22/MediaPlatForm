import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { trpc, trpcQueryUtils } from "@/router";
import InfiniteScroll from "@/features/shared/components/common/InfiniteScroll";
import ExperienceList from "@/features/experinces/components/ExperienceList";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ context: { trpcQueryUtils } }) => {
    await trpcQueryUtils.experiences.feed.prefetchInfinite({});
  },
});

function Index() {
  const [{ pages }, experiencesQuery] =
    trpc.experiences.feed.useSuspenseInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  return (
    <div>
      <InfiniteScroll onLoadMore={experiencesQuery.fetchNextPage}>
        <ExperienceList
          experiences={pages.flatMap((page) => page.experiences)}
          isLoading={experiencesQuery.isFetchNextPageError}
        />
      </InfiniteScroll>
    </div>
  );
}
