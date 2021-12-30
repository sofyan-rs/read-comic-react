import { DiscussionEmbed } from "disqus-react";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ChapterList from "./chapterList";
import NotFoundPages from "../components/notFoundPages";
import { BookmarkContext } from "../contexts/bookmarkContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { HistoryContext } from "../contexts/historyContext";

const SeriesDetail = ({ series }) => {
    const id = series.id;
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
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date_time = date+' '+time;

    const { dispatch, bookmark } = useContext(BookmarkContext);
    const addBookmark = () => {
        dispatch({type: 'ADD_BOOKMARK', series: {
            id, title, cover, date_time
        }});
        swal({
            title: "Saved",
            text: "Success added to Bookmark",
            icon: "success",
        })
    }
    const removeBookmark = () => {
        dispatch({type: 'REMOVE_BOOKMARK', id: series.id});
        swal({
            title: "Removed",
            text: "Success removed from Bookmark",
            icon: "success",
        });
    }
    let storedSeries = bookmark.find(bookmark => bookmark.id === id);
    const bookmarkDisabled = storedSeries ? true : false;

    const { history } = useContext(HistoryContext);
    const filterHistory = history.filter(item => item.manga_title === title);
    const shortHistory = filterHistory.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

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
                                        <div className="favorite">
                                            {!bookmarkDisabled && 
                                                <button onClick={() => addBookmark()}><FontAwesomeIcon icon={faHeart} /> Add to Bookmark</button>
                                            }
                                            {bookmarkDisabled && 
                                                <button className="remove" onClick={() => removeBookmark()}><FontAwesomeIcon icon={faXmark} /> Remove</button>
                                            }
                                        </div>
                                        {shortHistory.length !== 0 && <span className="continue"><Link to={shortHistory[0].slug}>Continue Read</Link></span>}
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
                                    {genres.map((genre, index) => (
                                        <Link to={genre.genre_slug} key={index}>
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