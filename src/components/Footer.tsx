import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary text-stroke">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Rock Onyx Logo"
              width="0"
              height="0"
              sizes="60px"
              className="w-auto h-full"
            />
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ml-4">
              Rock Onyx
            </span>
          </Link>
          <span className="text-sm text-stroke font-light sm:text-center">
            © Rock Onyx - {new Date().getFullYear()}
          </span>
        </div>

        <hr className="my-4 border-caption border-opacity-25 sm:mx-auto" />

        <div className="flex flex-col sm:flex-row items-baseline gap-16">
          <div>
            <h5 className="text-white text-lg">Essential Resources</h5>
            <a href="#" className="block font-normal">
              Docs
            </a>
            <a href="#" className="block font-normal">
              Audit
            </a>
          </div>
          <div>
            <h5 className="text-white text-lg">Connect with Us</h5>
            <a href="#" className="block font-normal">
              Discord
            </a>
            <a href="#" className="block font-normal">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
