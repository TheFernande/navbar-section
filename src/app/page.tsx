import Navbar from "@/components/navbar";
import SampleFormModal from "@/components/sample-form-modal";

export default function Home() {
  return (
    // `<main>` -> this is the "Page body" element in the Figma design
    <main className='gfe-main mx-auto flex w-full flex-col pt-4 md:max-w-full md:px-4 md:py-16 lg:px-28 lg:pt-4'>
      <Navbar />
      <SampleFormModal />
    </main>
  );
}
