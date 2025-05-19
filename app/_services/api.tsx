
export async function fetchArtists(page: string): Promise<ArtistsApiResponse> {
  const baseUrl = process.env.PUBLIC_API_URL
  const res = await fetch(`${baseUrl}/artists?page=${page}&fields=id,title,description&limit=9`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}