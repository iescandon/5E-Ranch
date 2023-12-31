import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer({ content }) {
  return (
    <footer className="px-4 md:px-8 lg:px-12 py-8 md:py-6 bg-black text-white text-xs">
      <div className="font-light flex justify-between md:space-y-0">
        {/* follow */}
        <div className="flex flex-col justify-center">
          <p className="font-bold uppercase">
            {content.footerTitle ? content.footerTitle : "Follow"}
          </p>
          <div className="flex">
            <a
              href={content.footerSocialMediaLinks.facebookUrl}
              aria-label="facebook page link"
              className="mt-2 mr-6 md:mr-3"
            >
              <FontAwesomeIcon
                className="cursor-pointer text-4xl md:text-2xl"
                icon={faFacebook}
              />
            </a>
            <a
              href={content.footerSocialMediaLinks.instagramUrl}
              aria-label="instagram page link"
              className="mt-2 mr-6 md:mr-3"
            >
              <FontAwesomeIcon
                className="cursor-pointer text-4xl md:text-2xl"
                icon={faInstagram}
              />
            </a>
            <a
              href={content.footerSocialMediaLinks.tiktokUrl}
              aria-label="tiktok page link"
              className="mt-2 mr-6 md:mr-3"
            >
              <FontAwesomeIcon
                className="cursor-pointer text-4xl md:text-2xl"
                icon={faTiktok}
              />
            </a>
          </div>
        </div>
        {/* about */}
        {/* <div className="flex flex-col">
        <h4 className="font-bold uppercase">About</h4>
        <a href="/about">About H Town for Humanity</a>
        <a href="/help/faqs">Help for Refugees</a>
      </div> */}
        {/* contact */}
        {/* <div className="flex flex-col">
        <h4 className="font-bold uppercase">Contact</h4>
        <a href="mailto:donations@htownforhumanity.org">
          donations@htownforhumanity.org
        </a>
        <a href="mailto:help@htownforhumanity.org">
          help@htownforhumanity.org
        </a>
        <a href="mailto:admin@htownforhumanity.org" className="mb-3">
          admin@htownforhumanity.org
        </a>
        <a href="tel:8326302396">832-630-2396</a>
      </div> */}
        {/* logo */}
        <div className="flex flex-col space-y-2 h-full md:pb-0">
          <img
            src={content.footerIcon.fields.file.url}
            className="h-[60px]"
            alt={content.footerIcon.fields.description}
          />
        </div>
        {/* add copyright stuff */}
      </div>
    </footer>
  );
}
