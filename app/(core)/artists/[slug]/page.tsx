import Gallery from '@components/gallery'
import { notFound } from 'next/navigation'


export default async function Page({
    params,
    }: {
      params: Promise<{ slug: string }>
    }) {
    const { slug } = await params

    let rawArtist;
    let rawArtworks;

    try{
        const rqArtist = await fetch('https://api.artic.edu/api/v1/artists/'+slug+'?fields=title,description')
        if (!rqArtist.ok) throw new Error("Artist not found or something went wrong");
        rawArtist = await rqArtist.json()      //console.log(rawArtist)
    } catch (err){ //TODO catch more precisely
        console.error(err);
        // notFound(); // -> next 404 page
        return <div>Artist not found with error: {err.message}</div>; //early return
    }

    try{ // should only try if artist was found
        const rqArtworks = await fetch('https://api.artic.edu/api/v1/artworks/search?query[term][artist_id]='+slug+'&fields=id,title')
        if (!rqArtworks.ok) throw new Error("Something went wrong fetching artworks")
        rawArtworks = await rqArtworks.json() //console.log(rawArtworks.data)
    } catch (err){
        console.error(err)
        // do not return, it's fine if an artist has no artworks
    }

    return (
      <div>
        <Gallery titleText={"Artist " +slug+ ": " +rawArtist.data.title} description={rawArtist.data.description}/>
        <ul>
            {rawArtworks.data.map((artwork) => (
                <li key={artwork.id}>{artwork.id} - {artwork.title}</li>
                )
            )}
        </ul>
      </div>
    );
}