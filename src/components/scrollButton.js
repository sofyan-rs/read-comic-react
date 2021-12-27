import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useWindowScroll } from "react-use";

const ScrollButton = () => {
    const [show, setShow] = useState(false);
    const { y: pageYOffset } = useWindowScroll();
    const scrolltoTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    useEffect(() => {
        if (pageYOffset > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [pageYOffset]);

    if (!show) {
        return false;
    }
    return (
        <div className="scroll-top" onClick={scrolltoTop}>
            <FontAwesomeIcon icon={faChevronUp} />
        </div>
    );
}
 
export default ScrollButton;