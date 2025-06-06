import { memo } from "react";
import type { NewsArticle } from "../../types/news";

const Article = ({ articles }: { articles: NewsArticle[] | undefined }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!articles || articles.length === 0 ? (
        <p className="text-2xl text-center">No articles found</p>
      ) : (
        articles.map((article: NewsArticle, index: number) => (
          <div
            key={`${article.title}-${index}`}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-400 mb-2 text-sm">
                {article.source?.name} •{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-400 line-clamp-3">
                {article.description}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(Article);
