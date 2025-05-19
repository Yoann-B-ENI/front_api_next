import Gallery from '@components/gallery'
import { notFound } from 'next/navigation'
import {fetchOneArtist, fetchAllLazyArtworksByArtist, fetchArtwork} from '@services/api'


export default async function Page({
    params,
    }: {
      params: Promise<{ slug: string }>
    }) {
    const { slug } = await params

    let rawArtist;
    let rawArtworks: Artwork[] = [];

    // ** Fetch artist **
    try{
        rawArtist = await fetchOneArtist(slug);
    } catch (err: any){ //TODO catch more precisely
        console.error(`Error fetch artist ${slug}`, err.message);
        notFound();
        // return <div>Artist not found with error: {err.message}</div>; //early return
    }
    if (!rawArtist){notFound();}

    // ** Fetch artworks of the artist **
    // > should only try if artist was found
    // > hardcoded only fetch first 9
    // > don't return if not found, we still display the artist
    try{
        rawArtworks = (await fetchAllLazyArtworksByArtist(slug)).data
    } catch (err){
        console.error(`Error fetching artworks of artist ${slug}`, err.message)
    }

    const enrichedArtworks: (Artwork | null)[] = await Promise.all(rawArtworks.map((elem) => fetchArtwork(elem.id)))
    const filteredArtworks: Artwork[] = enrichedArtworks.filter(x => x !== null)
    
    return (
      <div>
        <Gallery titleText={"Artist " +slug+ ": " +rawArtist.data.title} description={rawArtist.data.description} imgArray={filteredArtworks}/>
      </div>
    );


}