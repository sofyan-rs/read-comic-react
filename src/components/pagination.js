import { Link } from "react-router-dom";

const Pagination = ({ series, url }) => {
    const checkNull = series.last_page !== null && series.last_page !== undefined;
    const currentPages = checkNull ? parseInt(series.current_page) : 1;
    const totalPages = checkNull ? parseInt(series.last_page[1]) : 1;
    const prev = currentPages - 1;
    const next = currentPages + 1;
    const prev_status = currentPages !== 1;
    const next_status = currentPages !== totalPages;

    return (
        <div className="pagination">
            {!series.error && checkNull === true && (
                <ul className="pagination-list">
                    {prev_status === true && (
                        <li className="prev-page">
                            <Link to={url + prev + `/`}>Prev Page</Link>
                        </li>
                    )}
                    {prev_status === false && (
                        <li className="prev-page disabled"><span>Prev Page</span></li>
                    )}
                    {currentPages && (
                        <li className="current-page"><span>{currentPages}</span></li>
                    )}
                    {next_status === true && (
                        <li className="next-page">
                            <Link to={url + next + `/`}>Next Page</Link>
                        </li>
                    )}
                    {next_status === false && (
                        <li className="next-page disabled"><span>Next Page</span></li>
                    )}
                </ul>
            )}
        </div>
    );
}
 
export default Pagination;