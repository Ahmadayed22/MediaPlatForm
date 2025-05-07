import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@/router";
import InfiniteScroll from "@/features/shared/components/common/InfiniteScroll";
import ExperienceList from "@/features/experinces/components/ExperienceList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const experiencesQuery = trpc.experiences.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <div>
      <InfiniteScroll onLoadMore={experiencesQuery.fetchNextPage}>
        <ExperienceList
          experiences={
            experiencesQuery.data?.pages.flatMap((page) => page.experiences) ??
            []
          }
          isLoading={
            experiencesQuery.isLoading || experiencesQuery.isFetchNextPageError
          }
        />
      </InfiniteScroll>
    </div>
  );
}
