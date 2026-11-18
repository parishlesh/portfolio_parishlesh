import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CipherText from "../components/CipherText";

export default function PageNotFound({ setProgress }) {
  useEffect(() => { setProgress?.(100); }, [setProgress]);

  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="max-w-lg">
        <CipherText as="h1" text="404" duration={900} className="block font-display font-extrabold text-[clamp(5rem,20vw,10rem)] leading-none" />
        <p className="mt-6 text-xl text-fog/80">This page doesn’t exist. The link may be old or mistyped.</p>
        <Link to="/" className="mt-10 inline-block rounded-full bg-fog px-6 py-3 font-medium text-night hover:bg-packet hover:text-white transition-colors">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}

PageNotFound.propTypes = {
  setProgress: PropTypes.func,
};
