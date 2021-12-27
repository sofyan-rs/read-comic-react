import SkeletonElement from "./skeletonElement";

const SkeletonChapter = () => {
    return (
        <div className="skeleton-chapter container">
            <SkeletonElement type="chapter-title" />
            <SkeletonElement type="chapter-content" />
        </div>
    );
}
 
export default SkeletonChapter;