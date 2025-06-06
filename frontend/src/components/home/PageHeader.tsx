import { memo } from "react";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
    </div>
  );
};

export default memo(PageHeader);
