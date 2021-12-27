import { useParams } from "react-router-dom";
import ChapterViewer from "../components/chapterViewer";
import SkeletonChapter from "../components/skeleton/skeletonChapter";
import useFetch from "../useFetch";
import { Helmet } from "react-helmet";

const Chapter = () => {
    const { series, ch } = useParams();
    const { data: chapter, error, isLoading } = useFetch('https://hiperdex-scrapper.vercel.app/api/chapter/' + series + '/' + ch);

    return (
        <div className="chapter-view">
            {!error && !isLoading && chapter && chapter.error === undefined && (
                <Helmet>
                    <title>{chapter.manga} - ReadComic</title>
                    <meta name="description" content={`Read ` + chapter.manga + ` on ReadComic`} />
                </Helmet>
            )}
            {error && <div className="container"><div className="text-message">{error}</div></div>}
            {isLoading && <SkeletonChapter />}
            {!error && !isLoading && chapter && <ChapterViewer chapter={chapter}></ChapterViewer>}
        </div>
    );
}
 
export default Chapter;