
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden animate-pulse">
      {/* Cover placeholder */}
      <div className="h-52 bg-gray-100" />

      {/* Body placeholders */}
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-3 bg-gray-100 rounded-full w-full mt-1" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="h-3 bg-gray-100 rounded-full w-12" />
          <div className="h-3 bg-gray-100 rounded-full w-20" />
        </div>
      </div>
    </div>
  )
}
