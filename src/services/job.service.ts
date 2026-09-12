import { getGemini } from "../config/gemini";
import { JobSummary } from "../types/jobs.types";
import { systemPromt } from "../types/static";

export async function analyzeJob(jobDescription: string): Promise<JobSummary> {
  const gemini = await getGemini();
  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: `${systemPromt} JOB DESCRIPTION: ${jobDescription}`,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          title: {
            type: "string",
            nullable: true,
          },

          company: {
            type: "string",
            nullable: true,
          },

          location: {
            type: "string",
            nullable: true,
          },

          qualification: {
            type: "string",
            nullable: true,
          },

          experience: {
            type: "object",

            properties: {
              min: {
                type: "number",
                nullable: true,
              },

              max: {
                type: "number",
                nullable: true,
              },
            },

            required: ["min", "max"],
          },

          seniority: {
            type: "string",
            nullable: true,
          },

          technologies: {
            type: "array",

            items: {
              type: "object",

              properties: {
                name: {
                  type: "string",
                },

                category: {
                  type: "string",
                },

                required: {
                  type: "boolean",
                },
              },

              required: ["name", "category", "required"],
            },
          },

          responsibilities: {
            type: "array",

            items: {
              type: "string",
            },
          },

          requirements: {
            type: "array",

            items: {
              type: "string",
            },
          },

          niceToHave: {
            type: "array",

            items: {
              type: "string",
            },
          },
        },

        required: [
          "title",
          "company",
          "location",
          "qualification",
          "experience",
          "seniority",
          "technologies",
          "responsibilities",
          "requirements",
          "niceToHave",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text) as JobSummary;
}
