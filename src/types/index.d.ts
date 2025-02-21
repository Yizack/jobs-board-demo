declare global {
  interface Job {
    id: number;
    category: string;
    company: string;
    description: string;
    location: string;
    title: string;
  }
}

export {};
