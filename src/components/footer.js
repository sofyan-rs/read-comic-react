import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="footer">
            <div className="credit">
                Created with <FontAwesomeIcon icon={faHeart} color='#e64444' /> by KDevz
            </div>
        </div>
    );
}
 
export default Footer;