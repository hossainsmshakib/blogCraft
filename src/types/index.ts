export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface BlogState {
  posts: BlogPost[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
