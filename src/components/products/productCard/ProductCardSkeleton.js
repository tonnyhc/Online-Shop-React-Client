import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = ({ cards }) => {
    return (
        Array(cards)
            .fill(0)
            .map((_, i) => (
                <div key={i} className={'product-card__skeleton'}>
                    <div className="card-image">
                        <Skeleton height={220} />
                    </div>
                    <div className='card-info'>
                        <Skeleton count={4} />
                    </div>
                </div>
            )
            )
    );
}

export default ProductCardSkeleton;