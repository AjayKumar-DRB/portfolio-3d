'use client';

export function PulsingOrb() {
  return (
    <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-6">
      {/* Outer ambient radiant glow */}
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-25"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, #ec4899 50%, transparent 70%)',
          animationDuration: '4s',
        }}
      />
      {/* Secondary orbital ring */}
      <div
        className="absolute w-36 h-36 rounded-full border border-cyan-400/40 animate-spin"
        style={{
          borderTopColor: 'transparent',
          borderRightColor: '#a855f7',
          animationDuration: '8s',
        }}
      />
      {/* Inner glowing sphere core */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-500 hover:scale-110 cursor-pointer"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #67e8f9, #0284c7 50%, #4c1d95 100%)',
          boxShadow: '0 0 50px rgba(56, 189, 248, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)',
        }}
      >
        <span className="text-xl">✨</span>
      </div>
    </div>
  );
}
