import { memo } from "react";
import PageHeader from "../../components/home/PageHeader";

const Saved = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Saved" />
    </div>
  );
};

export default memo(Saved);
