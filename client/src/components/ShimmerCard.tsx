export const ShimmerCard = () => {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-4">

      {/* Image container (MATCH real card) */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="h-32 w-full shimmer rounded-md" />
      </div>

      {/* Title */}
      <div className="h-4 w-4/5 shimmer rounded mb-2" />

      {/* Description */}
      <div className="h-3 w-full shimmer rounded mb-1" />
      <div className="h-3 w-5/6 shimmer rounded mb-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 shimmer rounded" />
        <div className="h-8 w-16 shimmer rounded-md" />
      </div>

    </div>
  );
};
