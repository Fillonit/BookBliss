import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const footer = () =>{
return(
<footer className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <div className="flex justify-center text-cyan-500 sm:justify-start">
          <h1 className="text-3xl font-bold">BookBliss</h1>
        </div>

        <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa
          cum itaque neque.
        </p>

        <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
        <li>
            <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-cyan-600 transition hover:text-cyan-600/75"
        >
            <span className="sr-only">Facebook</span>
            <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
        </a>
        </li>

  <li>
    <a
      href="#"
      rel="noreferrer"
      target="_blank"
      className="text-cyan-600 transition hover:text-cyan-600/75"
    >
      <span className="sr-only">Instagram</span>
      <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
    </a>
  </li>

  <li>
    <a
      href="#"
      rel="noreferrer"
      target="_blank"
      className="text-cyan-600 transition hover:text-cyan-600/75"
    >
      <span className="sr-only">Twitter</span>
      <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
    </a>
  </li>

  <li>
    <a
      href="#"
      rel="noreferrer"
      target="_blank"
      className="text-cyan-600 transition hover:text-cyan-600/75"
    >
      <span className="sr-only">GitHub</span>
      <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
    </a>
  </li>

  <li>
    <a
      href="#"
      rel="noreferrer"
      target="_blank"
      className="text-cyan-600 transition hover:text-cyan-600/75"
    >
      <span className="sr-only">Dribbble</span>
      <FontAwesomeIcon icon={faDribbble} className="h-6 w-6" />
    </a>
        </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-gray-900">About Us</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                Company History
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                Meet the Team
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                Employee Handbook
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-gray-900">Our Services</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                Web Development
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Web Design </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Marketing </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Google Ads </a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-gray-900">Helpful Links</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
            </li>

          </ul>
        </div>

        <div className="text-right sm:text-left">
            <p className="text-lg font-medium text-gray-900">Contact Us</p>
            <div className="flex items-center mt-8">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6 text-cyan-600 transition hover:text-cyan-600/75 mr-2" />
                <input type="text" placeholder="123 Main Street" />
            </div>
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="h-6 w-6 text-cyan-600 transition hover:text-cyan-600/75 mr-2" />
                <input type="text" placeholder="Phone: (123) 456-7890" />
            </div>
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-cyan-600 transition hover:text-cyan-600/75 mr-2" />
                <input type="text" placeholder="Email: info@example.com" />
            </div>
        </div>
      </div>
    </div>

    <div className="mt-12 border-t border-gray-100 pt-6">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm text-gray-500">
          <span className="block sm:inline">All rights reserved. </span>

          <a
            className="inline-block text-cyan-500 underline transition hover:text-cyan-500/75"
            href="#"
          >
            Terms & Conditions
          </a>

          <span> &middot;</span>

          <a
            className="inline-block text-cyan-500 underline transition hover:text-cyan-500/75"
            href="#"
          >
            Privacy Policy
          </a>
        </p>

        <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">&copy; 2024 BookBliss</p>
      </div>
    </div>
  </div>
</footer>
);
};
export default footer;
