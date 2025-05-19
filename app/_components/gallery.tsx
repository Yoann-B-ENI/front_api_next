import Image from 'next/image'

type GalleryProps = {
  titleText: string;
  description: string;
  imgArray: Artwork[];
};

//TODO make the string truncation normal (dynamic, extracted)
export default function Gallery({ titleText, description, imgArray }: GalleryProps) {
    return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">{titleText ? titleText : "No artist name available"}</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{description ? description : "No artist description available"}</p>
        </div>

        <div className="flex flex-wrap -m-4">

            {!imgArray && <p>No artworks available for this artist</p>}

            {imgArray.map((imgElem, idx) => (
              <div key = {idx} className="lg:w-1/3 sm:w-1/2 p-4">
                <div className="flex relative">
                  <Image
                    src={imgElem.url!}
                    width={360}
                    height={600}
                    alt="gallery image"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                    <h2 className="tracking-widest text-sm title-font font-medium text-blue-400 mb-1">{imgElem.artist_display +' - '+ imgElem.date_display}</h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">{imgElem.title.substring(0, 40)+'...'}</h1>
                    <p className="leading-relaxed">{imgElem.description ? imgElem.description.substring(0, 50)+'...' : "No description found"}</p>
                  </div>
                </div>
              </div>
            ))}
            
        </div>

      </div>
    </section>
    );
}