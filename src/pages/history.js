import { useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";
import notFound from '../components/images/not-found.svg';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const History = () => {
    const { dispatch, history } = useContext(HistoryContext);
    const shortHistory = history.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    const removeHistory = (hist_id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your history!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        })
        .then((remove) => {
            if (remove) {
                dispatch({type: 'REMOVE_HISTORY', id: hist_id});
                swal({
                    title: "Removed",
                    text: "Success removed from History",
                    icon: "success",
                });
            } 
        });
    }
    const removeAllHistory = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your history!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        })
        .then((remove) => {
            if (remove) {
                swal({
                    title: "Removed",
                    text: "Success removed all History",
                    icon: "success",
                });
                localStorage.setItem('history', []);
                setTimeout(window.location.reload.bind(window.location), 2000);
            } 
        });
    }
    return history.length ? (
        <div className="container all-list">
            <Helmet>
                <title>History - ReadComic</title>
                <meta name="description" content="All History Read on ReadComic" />
            </Helmet>
            <div className="history-list">
                <h2><span>History</span> Read <button className="remove-all" onClick={() => removeAllHistory()}>Remove All</button></h2>
                    {shortHistory.map((hist) => (
                        <div className="history-item" key={hist.id}>
                            <Link to={hist.slug}>{hist.title}</Link>
                            <button className="remove" onClick={() => removeHistory(hist.id)}><FontAwesomeIcon icon={faXmark} /> Remove</button>
                        </div>
                    ))}
            </div>
        </div>
    ) : (
        <div className="container">
            <Helmet>
                <title>History - ReadComic</title>
                <meta name="description" content="All Series List Comic, Manga, Manhwa, and Manhua on ReadComic" />
            </Helmet>
            <div className="text-message not-found">
                <h2>Empty History</h2>
                <p>Your history is empty</p>
                <div className="svg-img">
                    <img src={notFound} alt="Not Found" />
                </div>
                <Link to="/series-list/"><span className="back-home">Series List</span></Link>
            </div>
        </div>
    );
}
 
export default History;