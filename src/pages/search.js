import useFetch from "../useFetch";
import SeriesList from "../components/seriesList";
import { Redirect, useParams } from "react-router-dom";
import Pagination from "../components/pagination";
import SkeletonList from "../components/skeleton/skeletonList";
import { Helmet } from "react-helmet";
import NotFoundPages from "../components/notFoundPages";

const Search = () => {
    const { search, pages } = useParams();
    const { data: series, isLoading, error } = useFetch('https://hiperdex-scrapper.vercel.app/api/search/' + search  + '/' + pages);
    
    return (
        <div className="all-list">
            {pages === undefined && (
                <Redirect to={`/search/` + search + `/1/`} />
            )}
            {!error && !isLoading && series && series.error === undefined && (
                <Helmet>
                    <title>Search Result - Page {pages} - ReadComic</title>
                    <meta name="description" content="Search Result for Comic, Manga, Manhwa, and Manhua on ReadComic" />
                </Helmet>
            )}
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonList />}
            <div className="container">
                {!error && !isLoading && series && series.error && <NotFoundPages />}
                {!error && !isLoading && series && series.error === undefined && <SeriesList series={series} title1="Search" title2={series.p_title} />}
                {!error && !isLoading && series && series.error === undefined && series.list.length !== 0 && <Pagination series={series} url={`/search/`+ search + `/`} />}
            </div>
        </div>
    );
}
 
export default Search;