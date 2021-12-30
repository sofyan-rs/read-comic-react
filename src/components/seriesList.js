import { Link } from "react-router-dom";
import NotFoundSeries from "./notFoundSeries";

const SeriesList = ({ series, title1, title2 }) => {
    return (
        <div className="serieslist">
            {series.list.length !== 0 && <h2><span>{title1}</span> {title2}</h2>}
            {!series.list.length && <NotFoundSeries />}
            {!series.error && series.list.length !== 0 && (
                <div className="series-list">
                {series.list.map((seri) => (
                    <div className="series-item" key={seri.id}>
                        <div className="series-content">
                            <div className="thumb">
                                <Link to={seri.slug}>
                                    <img src={seri.image.replace("https://", "https://cdn.statically.io/img/")} alt={seri.slug} />
                                </Link>
                            </div>
                            <div className="series-preview">
                                <Link to={seri.slug}>
                                    <h3 className="title">{seri.title}</h3>
                                </Link>
                                <ul>
                                    {seri.chapters.map((chapter, index) => (
                                        <li key={index}><Link to={chapter.c_slug}>Chapter {chapter.c_ch}</Link>{chapter.c_date && <span className="date">{chapter.c_date}</span>}{chapter.status && <span className="date">{chapter.status}</span>}{!chapter.c_date && !chapter.status && <span className="date-new">New</span>}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
 
export default SeriesList;