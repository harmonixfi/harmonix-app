import Image from "next/image";
import Link from "next/link";
import Discord from "./icons/Discord";
import Youtube from "./icons/Youtube";
import Twitter from "./icons/Twitter";
import Instagram from "./icons/Instagram";

const Footer = () => {
  return (
    <footer className="bg-secondary text-stroke">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:justify-between">
          <div className="flex flex-col justify-between gap-4">
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

            <p className="font-light">Decentralized Long-Only Hedge Fund</p>

            <div>
              <p className="font-light mb-2">Join our community</p>
              <div className="flex gap-x-1">
                <a href="#" className="text-stroke hover:text-gray-900">
                  <Discord />
                  <span className="sr-only">Discord community</span>
                </a>
                <a href="#" className="text-stroke hover:text-gray-900 ms-5">
                  <Youtube />
                  <span className="sr-only">Youtube channel</span>
                </a>
                <a href="#" className="text-stroke hover:text-gray-900 ms-5">
                  <Twitter />
                  <span className="sr-only">Twitter page</span>
                </a>
                <a href="#" className="text-stroke hover:text-gray-900 ms-5">
                  <Instagram />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-4">
            <div>
              <h2 className="mb-6 text-xl font-semibold text-white">
                Governance
              </h2>
              <ul className="flex flex-col gap-4 font-light">
                <li className="">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Governance process
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Research forum
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Snapshot voting
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-4 border-caption sm:mx-auto" />
        <span className="text-sm text-stroke font-light sm:text-center">
          © Rock Onyx - {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
