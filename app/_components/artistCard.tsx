import Link from 'next/link'

// artist card props?

export default function ArtistCard(artist: Artist){

    return (
        <div className="xl:w-1/3 md:w-1/2 p-4">
            <Link href={"/artists/"+artist.id}>
                <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-blue-400 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-white font-medium title-font mb-2">{artist.title}</h2>
                  <p className="leading-relaxed text-base">{artist.description ? artist.description : "No description available"}</p>
                </div>
            </Link>
        </div>
        );
    }