import Gallery from '@components/gallery'
import { notFound } from 'next/navigation'


// for url construction, see https://api.artic.edu/docs/#iiif-image-api
async function fetchArtwork(id: number): Promise<Artwork |null>{
    try {
        const temp = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,date_display,artist_display,description,image_id`)
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

export default async function Page({
    params,
    }: {
      params: Promise<{ slug: string }>
    }) {
    const { slug } = await params

    let rawArtist;
    let rawArtworks: Artwork[] = [];

    try{
        const rqArtist = await fetch(`https://api.artic.edu/api/v1/artists/${slug}?fields=title,description`)
        if (!rqArtist.ok) throw new Error("Artist not found or something went wrong");
        rawArtist = await rqArtist.json()      //console.log(rawArtist)
    } catch (err: any){ //TODO catch more precisely
        console.error(err);
        // notFound(); // -> next 404 page
        return <div>Artist not found with error: {err.message}</div>; //early return
    }

    try{ // should only try if artist was found
        const rqArtworks = await fetch(`https://api.artic.edu/api/v1/artworks/search?query[term][artist_id]=${slug}&fields=id,title`)
        if (!rqArtworks.ok) throw new Error("Something went wrong fetching artworks")
        rawArtworks = (await rqArtworks.json()).data
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