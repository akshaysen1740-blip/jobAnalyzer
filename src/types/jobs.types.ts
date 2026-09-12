export interface JobSummary {
  title: string | null;
  company: string | null;
  location: string | null;

  experience: {
    min: number | null;
    max: number | null;
  };
  qualification: string | null;

  seniority: string | null;

  technologies: {
    name: string;
    category: string;
    required: boolean;
  }[];

  responsibilities: string[];

  requirements: string[];

  niceToHave: string[];
}