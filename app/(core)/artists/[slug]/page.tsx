import Gallery from '@components/gallery'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rqArtist = await fetch('https://api.artic.edu/api/v1/artists/'+slug+'?fields=title,description')
  const rawArtist = await rqArtist.json()
  //console.log(rawArtist)
  //TODO handle missing artists

  //TODO handle missing artist -> do not fetch artworks
  const rqArtworks = await fetch('https://api.artic.edu/api/v1/artworks/search?query[term][artist_id]='+slug+'&fields=id,title')
  const rawArtworks = await rqArtworks.json()
  //TODO handle missing artworks
  console.log(rawArtworks.data)

  return (
      <div>
        <Gallery titleText={"Artist " +slug+ ": " +rawArtist.data.title} description={rawArtist.data.description}/>
        <ul>
            {rawArtworks.data.map((artwork) => (
                <p>{artwork.id} - {artwork.title}</p>
                )
            )}
        </ul>
      </div>
  );
}