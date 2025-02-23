declare global {
  interface Company {
    id: number;
    name: string;
    description: string;
    location: string;
    employees: number;
    website: string;
  }

  interface Job {
    id: number;
    category: string;
    company: Pick<Company, "id" | "name">;
    description: string;
    location: string;
    title: string;
    tags: string[];
    timestamp: number;
  }

  interface JobFilters {
    search: string;
    remote: boolean;
    days: number;
    tag: string;
  }

  interface AppError {
    statusCode: number;
    message: string;
  }
}

export {};
