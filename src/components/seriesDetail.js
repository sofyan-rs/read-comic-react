import { DiscussionEmbed } from "disqus-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ChapterList from "./chapterList";
import NotFoundPages from "../components/notFoundPages";

const SeriesDetail = ({ series }) => {
    const title = series.page;
    const cover = series.poster;
    const alternative = series.other_name;
    const authors = series.authors;
    const artists = series.artists;
    const type = series.type;
    const status = series.status;
    const released = series.released;
    const genres = series.genres;
    const disqusShortname = "read-comic";

    return (
        <div className="series">
            {series.error && <NotFoundPages />}
            {!series.error && (
                <div className="series-details">
                    <div className="series-details-top">
                        <div className="container">
                            <div className="series-wrapper">
                                <div className="series-thumb">
                                    <img src={cover.replace("https://", "https://cdn.statically.io/img/")} alt={title} />
                                </div>
                                <div className="series-info">
                                    <div className="series-title">
                                        <h3>{title}</h3>
                                    </div>
                                    <ul>
                                        <li><b>Alternative</b><span>{alternative}</span></li>
                                        {authors && (
                                            <li><b>Author(s)</b><span>{authors}</span></li>
                                        )}
                                        {artists && (
                                            <li><b>Artist(s)</b><span>{artists}</span></li>
                                        )}
                                        {type && (
                                            <li><b>Type</b><span>{type}</span></li>
                                        )}
                                        {status && (
                                            <li><b>Status</b><span>{status}</span></li>
                                        )}
                                        {released && (
                                            <li><b>Released</b><span>{released}</span></li>
                                        )}
                                    </ul>
                                    <div className="series-genres">
                                    {genres.map((genre) => (
                                        <Link to={genre.genre_slug}>
                                            {genre.genre_title}
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="series-details-bottom">
                        <div className="container">
                            {series.description && 
                                <div className="series-description">
                                    <h4>Synopsis</h4>
                                    <p>{series.description}</p>
                                </div>
                            }
                            {series.ch_list === "Error Getting Chapters!" && 
                                <div className="text-message">No Chapter Found...</div>
                            }
                            {series.ch_list.length === 0 && 
                                <div className="text-message">No Chapter Found...</div>
                            }
                            {series.ch_list !== "Error Getting Chapters!" && series.ch_list.length !== 0 && 
                                <ChapterList chapters={series.ch_list}></ChapterList>
                            }
                            <div className="comments"><DiscussionEmbed shortname={disqusShortname}  /></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default SeriesDetail;