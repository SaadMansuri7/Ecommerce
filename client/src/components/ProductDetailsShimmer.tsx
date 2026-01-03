export const ProductDetailsShimmer = () => {
    return (
        <div className="max-w-full mx-auto px-6 py-10 animate-pulse">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Image Section */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-16 w-16 rounded-lg bg-gray-200"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-gray-100 rounded-2xl p-8 min-h-[420px] flex items-center justify-center">
                        <div className="h-[360px] w-full rounded-xl bg-gray-200" />
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="h-8 w-3/4 bg-gray-200 rounded-md" />

                    {/* Brand */}
                    <div className="h-4 w-40 bg-gray-200 rounded-md" />

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-28 bg-gray-200 rounded-md" />
                        <div className="h-4 w-20 bg-gray-200 rounded-md" />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <div className="h-8 w-32 bg-gray-200 rounded-md" />
                        <div className="h-4 w-40 bg-gray-200 rounded-md" />
                    </div>

                    {/* Stock & Shipping */}
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-gray-200 rounded-md" />
                        <div className="h-4 w-52 bg-gray-200 rounded-md" />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <div className="flex-1 h-12 rounded-xl bg-gray-300" />
                        <div className="flex-1 h-12 rounded-xl bg-gray-200" />
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-14 border-t pt-8 space-y-4">
                <div className="h-6 w-56 bg-gray-200 rounded-md" />

                <div className="space-y-2 max-w-4xl">
                    <div className="h-4 w-full bg-gray-200 rounded-md" />
                    <div className="h-4 w-full bg-gray-200 rounded-md" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 w-64 bg-gray-200 rounded-md"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
