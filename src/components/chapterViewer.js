import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DiscussionEmbed } from "disqus-react";
import NotFoundPages from "../components/notFoundPages";

const ChapterViewer = ({ chapter }) => {
    const title = chapter.manga_title;
    const ch = chapter.current_ch;
    const series = chapter.manga_slug;
    const images = chapter.chapters;
    const navi = chapter.nav;
    const disqusShortname = "read-comic";
    
    return (
        <div className="container">
            {!title && <NotFoundPages />}
            {title && (
                <div className="chapter-viewer">
                    <div className="viewer-info">
                        <h3>{title} - Chapter {ch}</h3>
                        {navi.map((nav) => (
                            <div className="navi-chapter">
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
                        {images.map((img) => (
                            <img src={ img.ch.replace("https://", "https://cdn.statically.io/img/") } alt={title} />
                        ))}
                    </div>
                    {navi.map((nav) => (
                        <div className="navi-chapter">
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