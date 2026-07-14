import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden rounded-full border-4 border-blue-400/25 bg-slate-950 shadow-[0_20px_60px_rgba(14,116,144,0.28)]">
      <Image
        src="/hero-profile-illustration.png"
        alt="Illustrated profile portrait of a software engineer"
        fill
        priority
        sizes="(max-width: 1024px) 80vw, 430px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-3 rounded-full border border-cyan-300/20" />
    </div>
  );
}
