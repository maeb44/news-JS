export type CallbackFn<T> = (data: T) => void;
export type SourceResponse = {
    status: LoadStatus;
    sources: NewsSourse[] | null;
};
export type NewsResponse = {
    status: LoadStatus;
    totalResults: number;
    articles: NewsArticle[];
};

export type NewsSourse = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};
export type NewsArticle = {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};
enum LoadStatus {
    Ok = 'ok',
    Error = 'error',
}
