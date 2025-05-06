import Spinner from "@/features/shared/components/ui/Spinner";
// import { trpc } from "@/trpc";
// import { Experience } from "@advanced-react/server/database/schema";

import ExperienceCard from "./ExperienceCard";
import { ExperienceForList } from "./types";

type ExperienceListProps = {
  experiences: ExperienceForList[];
  isLoading?: boolean;
  noExperiencesMessage?: string;
};

const ExperienceList = ({
  experiences,
  isLoading,
  noExperiencesMessage = "No experience found",
}: ExperienceListProps) => {
  const experienceRender = experiences.map((experience) => (
    <ExperienceCard key={experience.id} experience={experience} />
  ));
  return (
    <div className="space-y-4">
      {experienceRender}
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && experiences.length === 0 && (
        <div className="flex justify-center">{noExperiencesMessage}</div>
      )}
    </div>
  );
};

export default ExperienceList;
