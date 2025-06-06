import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../../config/axiosInstance";
import Article from "../../components/home/Article";
import PageHeader from "../../components/home/PageHeader";

const Trending = () => {
  const { data } = useQuery({
    queryKey: ["news", "trending"],
    queryFn: () => fetchNews({ query: "trending" }),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Trending" />
      <Article articles={data || []} />
    </div>
  );
};

export default memo(Trending);
