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

    try{
        rawArtist = await fetchOneArtist(slug);
    } catch (err: any){ //TODO catch more precisely
        console.error(err);        // notFound(); // -> next 404 page
        return <div>Artist not found with error: {err.message}</div>; //early return
    }

    try{ // should only try if artist was found
        rawArtworks = (await fetchAllLazyArtworksByArtist(slug)).data
        console.log(rawArtworks)
    } catch (err){
        console.error(err)
        // do not return, it's fine if an artist has no artworks
    }

    const enrichedArtworks: (Artwork | null)[] = await Promise.all(rawArtworks.map((elem) => fetchArtwork(elem.id)))
    const filteredArtworks: Artwork[] = enrichedArtworks.filter(x => x !== null)
    
    return (
      <div>
        <Gallery titleText={"Artist " +slug+ ": " +rawArtist.data.title} description={rawArtist.data.description} imgArray={filteredArtworks}/>
      </div>
    );


}