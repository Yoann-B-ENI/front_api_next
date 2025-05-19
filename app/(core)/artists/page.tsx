import Link from 'next/link'

function artistElement(artistId, artistTitle, artistDescription?){

    return (
        <div className="xl:w-1/3 md:w-1/2 p-4">
            <Link href={"/artists/"+artistId} key={artistId}>
                <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-blue-400 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-white font-medium title-font mb-2">{artistTitle}</h2>
                  <p className="leading-relaxed text-base">{artistDescription ? artistDescription : "No description available"}</p>
                </div>
            </Link>
        </div>
        );
    }

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { page = '1', sort = 'asc', query = '' } = await searchParams

    let artistList;
    let pagination;

    try{
        const rqArtists = await fetch(`https://api.artic.edu/api/v1/artists?page=${page}&fields=id,title,description&limit=9`)
        const temp = await rqArtists.json()
        artistList = temp.data
        pagination = temp.pagination
    } catch (err: any) {
        console.error(err);
    }

    return (
        <section className="text-gray-400 body-font bg-gray-900">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Artist list</h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-opacity-80">Showing page {page}</p>
            </div>
            <div className="flex flex-wrap -m-4">
            {artistList.map((elem, index) => (
                artistElement(elem.id, elem.title, elem.description)
            ))}
            </div>

            {pagination.prev_url && (
                <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                    <Link href={`/artists?page=${Number(page) - 1}`}>Previous page</Link>
                </button>
            )}
            {pagination.next_url && (
                <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                    <Link href={`/artists?page=${Number(page) + 1}`}>Next page</Link>
                </button>
            )}
          </div>
        </section>
    );



}