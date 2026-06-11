"use server";

/**
 * Types for ENTSO‑E generation data.
 */
export interface GenerationData {
  datetime: string;
  Germany?: number;
  Italy?: number;
  France?: number;
  [key: string]: string | number | undefined;
}

export interface FetchGenerationParams {
  start?: string;
  end?: string;
}

const COUNTRIES = {
  Germany: "10Y1001A1001A83F",
  Italy: "10YIT-GRTN-----B",
  France: "10YFR-RTE------C"
};

export async function fetchGeneration(
  params: FetchGenerationParams = {}
): Promise<GenerationData[]> {
  const apiKey = process.env.NEXT_PUBLIC_ENTSOE_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_ENTSOE_API_KEY is not defined in .env.local");
  }

  const baseUrl = "https://web-api.tp.entsoe.eu/api";
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatEntsoeDate = (date: Date) => 
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}${pad(date.getUTCHours())}00`;

  const start = params.start || formatEntsoeDate(yesterday);
  const end = params.end || formatEntsoeDate(now);

  const combinedData: GenerationData[] = Array.from({ length: 24 }).map((_, index) => {
    const time = new Date(yesterday.getTime() + index * 60 * 60 * 1000);
    return {
      datetime: `${pad(time.getHours())}:00`,
      Germany: 0,
      Italy: 0,
      France: 0,
    };
  });

  const fetchCountry = async (countryName: keyof typeof COUNTRIES, eicCode: string) => {
    const query = new URLSearchParams({
      securityToken: apiKey,
      documentType: "A75", 
      processType: "A16",
      in_Domain: eicCode,
      periodStart: start,
      periodEnd: end,
    });

    const url = `${baseUrl}?${query.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ENTSO‑E data for ${countryName}: ${response.status}`);
      return;
    }

    const text = await response.text();
    const points = text.match(/<Point>[\s\S]*?<\/Point>/g) || [];
    
    points.slice(0, 24).forEach((point, index) => {
      const qtyMatch = point.match(/<quantity>([\d.]+)<\/quantity>/);
      const value = qtyMatch ? Math.round(parseFloat(qtyMatch[1])) : 0;
      if (combinedData[index]) {
        combinedData[index][countryName] = value;
      }
    });
  };

  await Promise.all(Object.entries(COUNTRIES).map(([name, code]) => 
    fetchCountry(name as keyof typeof COUNTRIES, code)
  ));

  return combinedData;
}
