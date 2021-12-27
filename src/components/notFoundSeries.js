import { Link } from "react-router-dom/cjs/react-router-dom.min";
import notFound from './images/not-found.svg';
import { Helmet } from "react-helmet";

const NotFoundSeries = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Search Not Found - ReadComic</title>
                <meta name="description" content="This Search Result is Not Found on ReadComic" />
            </Helmet>
            <div className="text-message not-found">
                <h2>Sorry</h2>
                <p>This search result is not found</p>
                <div className="svg-img">
                    <img src={notFound} alt="Not Found" />
                </div>
                <Link to="/"><span className="back-home">Back to Home</span></Link>
            </div>
        </div>
    );
}
 
export default NotFoundSeries;