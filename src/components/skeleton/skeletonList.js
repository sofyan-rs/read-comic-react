import SkeletonElement from "./skeletonElement";

const SkeletonList = () => {
    return (
        <div className="container">
            <div className="skeleton p-title"></div>
            <div className="skeleton-list">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((index) => (
                    <div className="skeleton-item" key={index}>
                        <div className="skeleton-item-content">
                            <SkeletonElement type="thumb" />
                            <SkeletonElement type="title" />
                            <SkeletonElement type="chapter" />
                            <SkeletonElement type="date" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default SkeletonList;