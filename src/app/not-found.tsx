import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-washi-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-washi-200 shadow-xl text-center space-y-6">
        <div className="relative w-20 h-20 mx-auto rounded-3xl overflow-hidden bg-white shadow-md border-2 border-amber-300/60">
          <Image
            src="/images/yumira-logo.jpg"
            alt="Yumira Nihongo Gakkou"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-japanRed-600 font-mono block">
            404
          </span>
          <h1 className="text-xl font-bold text-navy-900 mt-2">
            Page Not Found / পেজটি পাওয়া যায়নি
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-japanRed-600 text-white font-bold text-xs shadow-md hover:bg-japanRed-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
