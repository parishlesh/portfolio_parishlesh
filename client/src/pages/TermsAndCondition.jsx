import React, { useEffect } from 'react';

function TermsAndCondition({ setProgress }) {

  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 500);
  }, [setProgress]);

  return (
    <div className="mt-16">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>Welcome. These Terms and Conditions govern your use of this portfolio website and form a binding agreement between you and us. By accessing or using this website, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use this website.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
          <p>To access certain features, you may be required to create an account. When creating an account, you agree to provide accurate and up-to-date information, including your phone number, email address, and username. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. User Data</h2>
          <p>By creating an account, you consent to our collection, use, and storage of your personal information, including your phone number, email address, and username. We are committed to protecting your privacy and will use your data in accordance with our Privacy Policy.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Privacy Policy</h2>
          <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using this website, you agree to the terms of our Privacy Policy.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Use of Website</h2>
          <p>You agree to use this website only for lawful purposes and in a manner that does not infringe on the rights of others or restrict or inhibit their use and enjoyment of the website. Prohibited activities include, but are not limited to:</p>
          <ul className="list-disc pl-6">
            <li>Unauthorized access to or use of the website or its services</li>
            <li>Interfering with the operation of the website or its services</li>
            <li>Uploading or transmitting any harmful or malicious code</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of the website owner and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, the website owner shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
          <p>I reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this website. Your continued use of the website after any changes constitute your acceptance of the new terms.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
          <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the relevant jurisdiction. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>If you have any questions or concerns about these Terms and Conditions, please contact me at <a href="mailto:parishleshfulvanshi@gmail.com" className="text-blue-500">parishleshfulvanshi@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
