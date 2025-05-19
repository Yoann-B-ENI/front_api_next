import Link from 'next/link'
import ArtistCard from '@components/artistCard'
import {fetchArtists} from '@services/api'
import PaginationButtons from '@components/pagination'

interface ArtistsApiResponse {
  data: Artist[];
  pagination: Pagination;
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { page = '1', sort = 'asc', query = '' } = await searchParams

    let artistList: Artist[];
    let pagination: Pagination;

    try{
        const temp: ArtistsApiResponse = await fetchArtists(page)
        artistList = temp.data
        pagination = temp.pagination
    } catch (err: any) {
        console.error(err);
        return <p className="text-white text-center">Failed to load artists.</p>;
    }

    if (!artistList) {
      return <p className="text-white text-center">Failed to load artists.</p>;
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
                    <ArtistCard
                        key={elem.id}
                        id={elem.id}
                        title={elem.title}
                        description={elem.description}
                      />
                ))}
            </div>

          <PaginationButtons
            url="/artists"
            page={page}
            pagination={pagination}
          />

          </div>
        </section>
    );

}