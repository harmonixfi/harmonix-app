import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "./icons";

const Footer = () => {
  return (
    <footer className="bg-rock-foreground bg-opacity-10 px-20 pt-24 pb-12 mb-16 mx-auto rounded-3xl">
      <div className="grid grid-cols-2 items-start">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Rock Onyx Logo"
            width={32}
            height={40}
          />
          <h4 className="uppercase text-3xl font-semibold">Rock Onyx</h4>
        </Link>
        <div>
          <div className="grid grid-cols-3">
            <div>
              <p className="text-rock-gray text-lg font-medium uppercase">
                About
              </p>
              <ul className="flex flex-col gap-3 mt-6 text-sm text-white font-normal">
                <li>
                  <Link href="/">Faq</Link>
                </li>
                <li>
                  <Link href="/">Blog</Link>
                </li>
                <li>
                  <Link href="/">Team</Link>
                </li>
                <li>
                  <Link href="/">Audit</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-rock-gray text-lg font-medium uppercase">
                Community
              </p>
              <ul className="flex flex-col gap-3 mt-6 text-sm text-white font-normal">
                <li>
                  <Link href="/">Github</Link>
                </li>
                <li>
                  <Link href="/">Discord</Link>
                </li>
                <li>
                  <Link href="/">Twitter</Link>
                </li>
                <li>
                  <Link href="/">Media Kit</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-rock-gray text-lg font-medium uppercase">
                Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-48">
        <p className="text-sm text-white font-normal">{`© Copyright • Rock Onyx • ${new Date().getFullYear()}`}</p>
        <ul className="flex gap-6">
          <li>
            <a href="#">
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <InstagramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
