import { Link } from "react-router-dom";

const ChapterList = ({ chapters }) => {
    return (
        <div className="chapter-list">
            <h4>Chapter List</h4>
            <div className="chapter-wrapper">
                {chapters.map((chapter) => (
                    <Link to={chapter.slug} key={chapter.slug.replace('/','')}>
                        <div className="chapter" key={chapter.slug}>
                                <span className="ch-title">Chapter {chapter.ch}</span>
                                {chapter.time ? <span className="ch-date">{chapter.time}</span> : <span className="ch-new">New</span>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default ChapterList;