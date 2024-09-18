import Image from "next/image";
import dynamic from 'next/dynamic';
// import TipTapEditor from '../component/TipTap-Editor';
const TipTapEditor = dynamic(() => import('../component/TipTap-Editor'), {
  ssr: false, // Ensure no SSR for the editor
});

export default function Home() {
  return (
    // <div className="min-h-screen max-w-screen-md mx-auto px-5 py-2 mt-14">
      <div className="mt-14">
        <TipTapEditor />
      </div>
    // </div>
  );
}
