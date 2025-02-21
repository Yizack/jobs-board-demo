declare global {
  interface Job {
    id: number;
    category: string;
    company: string;
    description: string;
    location: string;
    title: string;
    tags: string[];
    timestamp: number;
  }

  interface JobFilters {
    search: string;
    remote: boolean;
  }
}

export {};
