export interface Post {
  title: string;
  content: string;
  id?: string; // id is optional, but if present then it should be a string.
}
