import useFetch from "../useFetch";
import SeriesList from "../components/seriesList";
import { useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import SkeletonList from "../components/skeleton/skeletonList";
import { Helmet } from "react-helmet";
import NotFoundPages from "../components/notFoundPages";

const Completed = () => {
    const { pages } = useParams();
    const { data: series, isLoading, error } = useFetch('https://hiperdex-scrapper.vercel.app/api/completed/' + pages);
    
    return (
        <div className="all-list">
            {!error && !isLoading && series && series.error === undefined && (
                <Helmet>
                    <title>Completed Series - Page {pages} - ReadComic</title>
                    <meta name="description" content="Completed Series Comic, Manga, Manhwa, and Manhua on ReadComic" />
                </Helmet>
            )}
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonList />}
            <div className="container">
                {!error && !isLoading && series && series.error && <NotFoundPages />}
                {!error && !isLoading && series && series.error === undefined && <SeriesList series={series} title1="Completed" title2="Series" />}
                {!error && !isLoading && series && series.error === undefined && <Pagination series={series} url="/completed/" />}
            </div>
        </div>
    );
}
 
export default Completed;