import { Link } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HistoryContext } from "../contexts/historyContext";
import { DiscussionEmbed } from "disqus-react";
import NotFoundPages from "../components/notFoundPages";
import LazyLoad from 'react-lazyload';

const ChapterViewer = ({ chapter, slug }) => {
    const id = chapter.id;
    const title = chapter.manga_title;
    const ch = chapter.current_ch;
    const ch_title = title + ' - Chapter ' + ch;
    const series = chapter.manga_slug;
    const images = chapter.chapters;
    const navi = chapter.nav;
    const disqusShortname = "read-comic";
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date_time = date+' '+time;
    const { dispatch } = useContext(HistoryContext);
    const addHistory = () => {
        dispatch({type: 'REMOVE_HISTORY', id: id});
        dispatch({type: 'ADD_HISTORY', chapter: {
            id, ch_title, slug, date_time, title
        }});
    }
    
    return (
        <div className="container">
            {!title && <NotFoundPages />}
            {title && (
                <div className="chapter-viewer" onLoad={() => addHistory()}>
                    <div className="viewer-info">
                        <h3>{title} - Chapter {ch}</h3>
                        {navi.map((nav, index) => (
                            <div className="navi-chapter" key={index}>
                                {nav.prev && (
                                    <Link to={nav.prev.replace('https://hiperdex.com/manga','/chapter')}>
                                    <span className="prev"><FontAwesomeIcon icon={faArrowLeft} /> Prev</span>
                                    </Link>
                                )}
                                <Link to={series}>
                                    <span className="all-chapter">View All Chapters</span>
                                </Link>
                                {nav.next && (
                                    <Link to={nav.next.replace('https://hiperdex.com/manga','/chapter')}>
                                        <span className="prev">Next <FontAwesomeIcon icon={faArrowRight} /></span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="reader-area">
                        {images.map((img, index) => (
                            <LazyLoad height={200} offset={100} key={index}>
                                <img src={ img.img.replace("https://", "https://cdn.statically.io/img/") } alt={title} />
                            </LazyLoad>
                        ))}
                    </div>
                    {navi.map((nav, index) => (
                        <div className="navi-chapter" key={index}>
                            {nav.prev && (
                                <Link to={nav.prev.replace('https://hiperdex.com/manga','/chapter')}>
                                <span className="prev"><FontAwesomeIcon icon={faArrowLeft} /> Prev</span>
                                </Link>
                            )}
                            <Link to={ series }>
                                <span className="all-chapter">View All Chapters</span>
                            </Link>
                            {nav.next && (
                                <Link to={nav.next.replace('https://hiperdex.com/manga','/chapter')}>
                                    <span className="prev">Next <FontAwesomeIcon icon={faArrowRight} /></span>
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="comments"><DiscussionEmbed shortname={disqusShortname}  /></div>
                </div>
            )}
        </div>
    );
}
 
export default ChapterViewer;
