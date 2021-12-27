import useFetch from "../useFetch";
import SeriesList from "../components/seriesList";
import { Redirect, useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import SkeletonList from "../components/skeleton/skeletonList";
import { Helmet } from "react-helmet";
import NotFoundPages from "../components/notFoundPages";

const Genre = () => {
    const { genre, pages } = useParams();
    const { data: series, isLoading, error } = useFetch('https://hiperdex-scrapper.vercel.app/api/genre/' + genre  + '/' + pages);
    
    return (
        <div className="all-list">
            {!error && !isLoading && series && series.error === undefined && (
                <Helmet>
                    <title>Genre {series.p_title} - Page {pages} - ReadComic</title>
                    <meta name="description" content="Latest Updated Comic, Manga, Manhwa, and Manhua on ReadComic" />
                </Helmet>
            )}
            {pages === undefined && (
                <Redirect to={`/genre/` + genre + `/1/`} />
            )}
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonList />}
            <div className="container">
                {!error && !isLoading && series && series.error && <NotFoundPages />}
                {!error && !isLoading && series && series.error === undefined && <SeriesList series={series} title1="Genre" title2={series.p_title} />}
                {!error && !isLoading && series && series.error === undefined && <Pagination series={series} url={`/genre/`+ genre + `/`} />}
            </div>
        </div>
    );
}
 
export default Genre;