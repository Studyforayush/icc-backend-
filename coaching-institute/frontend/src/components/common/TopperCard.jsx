import { Award, Trophy, Lightbulb } from 'lucide-react';

export default function TopperCard({ topper }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition text-center p-6">
      {/* Avatar */}
      <div className="mb-4 relative">
        {topper.photo ? (
          <img
            src={topper.photo}
            alt={topper.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-600"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <Trophy size={40} className="text-white" />
          </div>
        )}
        <div className="absolute top-0 right-6 bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center">
          ⭐
        </div>
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-gray-800 mb-1">{topper.name}</h3>
      <p className="text-primary-600 font-semibold mb-4">{topper.exam}</p>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        {topper.rank && (
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-red-600">
            <Trophy size={20} />
            <span>Rank: {topper.rank}</span>
          </div>
        )}
        {topper.marks && (
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-green-600">
            <Lightbulb size={20} />
            <span>Marks: {topper.marks}</span>
          </div>
        )}
        {topper.year && (
          <div className="text-sm text-gray-600">Year: {topper.year}</div>
        )}
      </div>

      {/* Achievement */}
      {topper.achievement && (
        <p className="text-sm text-gray-600 italic border-t pt-4">
          "{topper.achievement}"
        </p>
      )}
    </div>
  );
}
