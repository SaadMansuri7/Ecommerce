export const WishlistShimmer = () => {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
            <div className="h-40 bg-gray-200 rounded-lg" />
            <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-8 w-full bg-gray-300 rounded-lg mt-3" />
            </div>
        </div>
    );
};
