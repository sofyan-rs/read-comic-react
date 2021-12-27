import { Link } from "react-router-dom/cjs/react-router-dom.min";
import notFound from './images/not-found.svg';
import { Helmet } from "react-helmet";

const NotFoundPages = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Page Not Found - ReadComic</title>
                <meta name="description" content="This Page is Not Found on ReadComic" />
            </Helmet>
            <div className="text-message not-found">
                <h2>Sorry</h2>
                <p>This page cannot be found</p>
                <div className="svg-img">
                    <img src={notFound} alt="404 Not Found" />
                </div>
                <Link to="/"><span className="back-home">Back to Home</span></Link>
            </div>
        </div>
    );
}
 
export default NotFoundPages;