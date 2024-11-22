export interface NewsCategory {
    name: string;
    file: string;
  }
  
  export interface NewsSource {
    name: string;
    url: string;
  }
  
  export interface NewsPerspective {
    text: string;
    sources: NewsSource[];
  }
  
  export interface NewsArticle {
    title: string;
    link: string;
    domain: string;
    date: string;
    image: string;
    image_caption: string;
  }
  
  export interface NewsDomain {
    name: string;
    favicon: string;
  }
  
  export interface NewsCluster {
    cluster_number: number;
    unique_domains: number;
    number_of_titles: number;
    category: string;
    title: string;
    short_summary: string;
    did_you_know: string;
    talking_points: string[];
    quote: string;
    quote_author: string;
    perspectives: NewsPerspective[];
    emoji: string;
    articles: NewsArticle[];
    domains: NewsDomain[];
    // ... other fields as needed
  }
  
  export interface NewsResponse {
    category: string;
    timestamp: number;
    read: number;
    clusters: NewsCluster[];
  }
  
  export interface CategoriesResponse {
    timestamp: number;
    categories: NewsCategory[];
  }