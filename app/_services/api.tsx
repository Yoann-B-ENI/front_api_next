
export async function fetchArtists(page: string): Promise<ArtistsApiResponse> {
  const baseUrl = process.env.PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/artists?page=${page}&fields=id,title,description&limit=9`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}

export async function fetchOneArtist(slug: string): Promise<Artist>{
    const baseUrl = process.env.PUBLIC_API_URL;
    const rqArtist = await fetch(`${baseUrl}/artists/${slug}?fields=title,description`);
    if (!rqArtist.ok) throw new Error("Artist not found or something went wrong");
    return rqArtist.json();
}

export async function fetchAllLazyArtworksByArtist(slug: string): Promise<Artwork[]>{
    const baseUrl = process.env.PUBLIC_API_URL;
    const rqArtworks = await fetch(`${baseUrl}/artworks/search?query[term][artist_id]=${slug}&fields=id,title&page=1&limit=9`)
    if (!rqArtworks.ok) throw new Error("Something went wrong fetching artworks")
    return rqArtworks.json()
}

// for url construction, see https://api.artic.edu/docs/#iiif-image-api
export async function fetchArtwork(id: number): Promise<Artwork |null>{
    const baseUrl = process.env.PUBLIC_API_URL;
    try {
        const temp = await fetch(`${baseUrl}/artworks/${id}?fields=id,title,date_display,artist_display,description,image_id`)
        const {data, config} = await temp.json()
        const tempImg: Artwork = {
            id: data.id,
            title: data.title,
            date_display: data.date_display,
            artist_display: data.artist_display,
            description: data.description,
            url: `${config.iiif_url}/${data.image_id}/full/843,/0/default.jpg`
        }
        return tempImg
    } catch (err) {
        console.error(err)
        return null;
    }
}