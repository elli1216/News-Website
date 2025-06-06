import { useInfiniteQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "../../api/fetchers";
import PageHeader from "../../components/home/PageHeader";
import Article from "../../components/home/Article";
import Loading from "../../pages/common/Loading";
import { Loader2 } from "lucide-react";

const Home = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["news"],
      queryFn: fetchItems,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Latest News" />
      <Article articles={data?.pages.flatMap((page) => page.data) || []} />
      <div className="flex justify-center items-center p-4" ref={ref}>
        {isFetchingNextPage && <Loader2 className="animate-spin" />}
      </div>
    </div>
  );
};

export default memo(Home);
