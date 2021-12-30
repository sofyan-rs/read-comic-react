import { useContext } from "react";
import { BookmarkContext } from "../contexts/bookmarkContext";
import notFound from '../components/images/not-found.svg';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const Bookmark = () => {
    const { dispatch, bookmark } = useContext(BookmarkContext);
    const shortBookmark = bookmark.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    const removeBookmark = (seri_id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your bookmark!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        })
        .then((remove) => {
            if (remove) {
                dispatch({type: 'REMOVE_BOOKMARK', id: seri_id});
                swal({
                    title: "Removed",
                    text: "Success removed from Bookmark",
                    icon: "success",
                });
            } 
        });
    }
    const removeAllBookmark = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your bookmark!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        })
        .then((remove) => {
            if (remove) {
                swal({
                    title: "Removed",
                    text: "Success removed all Bookmark",
                    icon: "success",
                });
                localStorage.setItem('bookmark', []);
                setTimeout(window.location.reload.bind(window.location), 2000);
            } 
        });
    }
    return bookmark.length ? (
        <div className="container all-list">
            <Helmet>
                <title>Bookmark - ReadComic</title>
                <meta name="description" content="All Series List Comic, Manga, Manhwa, and Manhua on ReadComic" />
            </Helmet>
            <div className="serieslist">
                <h2><span>Bookmark</span> List <button className="remove-all" onClick={() => removeAllBookmark()}>Remove All</button></h2>
                    <div className="series-list">
                    {shortBookmark.map((seri) => (
                        <div className="series-item" key={seri.id}>
                            <div className="series-content">
                                <div className="thumb">
                                    <Link to={`/series/` + seri.id + `/`}>
                                        <img src={seri.cover.replace("https://", "https://cdn.statically.io/img/")} alt={seri.id} />
                                    </Link>
                                </div>
                                <div className="series-preview">
                                    <Link to={`/series/` + seri.id + `/`}>
                                        <h3 className="title">{seri.title}</h3>
                                    </Link>
                                    <div className="favorite pages">
                                        <button className="remove" onClick={() => removeBookmark(seri.id)}><FontAwesomeIcon icon={faXmark} /> Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="container">
            <Helmet>
                <title>Bookmark - ReadComic</title>
                <meta name="description" content="All Bookmark List on ReadComic" />
            </Helmet>
            <div className="text-message not-found">
                <h2>Empty Bookmark</h2>
                <p>Your bookmark is empty</p>
                <div className="svg-img">
                    <img src={notFound} alt="Not Found" />
                </div>
                <Link to="/series-list/"><span className="back-home">Series List</span></Link>
            </div>
        </div>
    );
}
 
export default Bookmark;