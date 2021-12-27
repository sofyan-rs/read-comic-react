import { useParams } from "react-router-dom";
import SeriesDetail from "../components/seriesDetail";
import useFetch from "../useFetch";
import SkeletonSeries from "../components/skeleton/skeletonSeries";
import { Helmet } from "react-helmet";

const Series = () => {
    const { slug } = useParams();
    const { data: series, error, isLoading } = useFetch('https://hiperdex-scrapper.vercel.app/api/info/' + slug);

    return (
        <div className="series">
            {!error && !isLoading && series && series.error === undefined && (
                <Helmet>
                    <title>{series.page} - ReadComic</title>
                    <meta name="description" content={`Read ` + series.page + ` on ReadComic`} />
                </Helmet>
            )}
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonSeries />}
            {!error && !isLoading && series && <SeriesDetail series={series}></SeriesDetail>}
        </div>
    );
}
 
export default Series;