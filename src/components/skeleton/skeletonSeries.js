import SkeletonElement from "./skeletonElement";

const SkeletonSeries = () => {
    return (
        <div className="series">
            <div className="series-details">
                <div className="series-details-top">
                    <div className="container">
                        <div className="series-wrapper">
                            <SkeletonElement type="series-thumb" />
                            <div className="series-info">
                                <SkeletonElement type="series-title" />
                                <ul>
                                    <SkeletonElement type="info" />
                                    <SkeletonElement type="info" />
                                    <SkeletonElement type="info" />
                                    <SkeletonElement type="info" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="series-details-bottom">
                    <div className="container">
                        <div className="series-description">
                            <SkeletonElement type="synopsis-title" />
                            <SkeletonElement type="synopsis" />
                            <SkeletonElement type="synopsis" />
                            <SkeletonElement type="synopsis" />
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SkeletonSeries;