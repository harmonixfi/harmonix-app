import BannerText from "@/components/BannerText";
import BannerButton from "@/components/BannerButton";
import BannerImage from "@/components/BannerImage";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center mx-auto p-4 sm:px-12 sm:py-8 md:py-16 xl:p-24">
      <div className="w-full flex flex-col-reverse sm:flex-none sm:grid sm:grid-cols-2 sm:items-baseline gap-6 items-center">
        <div className="w-full text-center sm:text-left">
          <BannerText />
          <BannerButton />
        </div>
        <BannerImage />
      </div>

      <div className="w-full mt-32 mb-24 sm:mb-0">
        <div className="text-center sm:text-left">
          <h3 className="text-4xl font-bold capitalize">How it works</h3>
          <p className="text-lg capitalize mt-2 mb-8">
            Find out how to get started
          </p>
        </div>

        <HowItWorks />
      </div>
    </main>
  );
}
