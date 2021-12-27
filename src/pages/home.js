import useFetch from "../useFetch";
import SeriesList from "../components/seriesList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SkeletonList from "../components/skeleton/skeletonList";

const Home = () => {
    const { data: series, isLoading, error } = useFetch('https://hiperdex-scrapper.vercel.app/api/latest/1');
    
    return (
        <div className="latest">
            <div className="container">
                <div className="notif">
                    Welcome to ReadComic
                </div>
            </div>
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonList />}
            <div className="container">
                {!error && !isLoading && series && series.error && (
                    <div className="text-message">No Series Found...</div>
                )}
                {!error && !isLoading && series && series.error === undefined && <SeriesList series={series} title1="Latest" title2="Updated" />}
                {!error && !isLoading && series && series.error === undefined && (
                    <div className="view-latest">
                        <Link to={'/latest/'}>View all updated list</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Home;