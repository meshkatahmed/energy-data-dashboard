/**
 * Types for ENTSO‑E generation data.
 */
export interface GenerationData {
  datetime: string;
  value: number;
}

/**
 * Parameters accepted by the service. All are optional – the function will use sensible defaults
 * if they are omitted.
 */
export interface FetchGenerationParams {
  country?: string;
  start?: string;
  end?: string;
}

/**
 * Fetch hourly generation data from ENTSO‑E.
 *
 * The function builds a request URL using the provided parameters and the API key stored in
 * `process.env.ENTSOE_API_KEY`. It returns an array of {@link GenerationData}.
 *
 * ENTSO‑E historically returns XML; for this prototype we assume JSON is returned (or that the
 * required transformation is handled elsewhere). Adjust the parsing logic if you need to work with the
 * original XML format.
 */
export async function fetchGeneration(
  params: FetchGenerationParams = {}
): Promise<GenerationData[]> {
  const apiKey = process.env.ENTSOE_API_KEY;
  if (!apiKey) {
    throw new Error("ENTSOE_API_KEY is not defined in .env.local");
  }

  const baseUrl = "https://web-api.tp.entsoe.eu/api";

  const query = new URLSearchParams({
    securityToken: apiKey,
    documentType: "A75", 
    ...(params.country && { inDomain: params.country }),
    ...(params.start && { periodStart: params.start }),
    ...(params.end && { periodEnd: params.end }),
  });

  const url = `${baseUrl}?${query.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ENTSO‑E generation data: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as GenerationData[];
  return data;
}
