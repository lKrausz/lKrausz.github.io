import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | topbon.us",
  description:
    " This Privacy Policy outlines how we collect, use, and protect your personal information.",
};

export default async function Privacy() {
  return (
    <div className="page-gaming pt-10 pb-10">
      <div className="main__container">
        <h1 className="mb-3">Welcome to topbon.us</h1>
        <p>
          This Privacy Policy outlines how we collect, use, and protect your
          personal information. By using the Website, you consent to the
          practices described herein. If you do not agree with this Privacy
          Policy, please refrain from using the Website.
        </p>
        <h2 className="mb-3">Information We Collect</h2>
        <p>
          We collect the email addresses provided by users who choose to
          subscribe to our promotional emails. We do not collect any personally
          identifiable information beyond email addresses.
        </p>
        <h2 className="mb-3">Use of Information</h2>
        <p>
          The email addresses collected are used solely for the purpose of
          sending occasional promotional emails containing offers provided by
          third-party websites. We do not expose or sell your personal
          information to any third parties.
        </p>
        <h2 className="mb-3">Unsubscribing from Emails</h2>
        <p>
          Users have the option to unsubscribe from receiving promotional emails
          at any time by clicking the &#34;unsubscribe&#34; link provided at the
          bottom of every promotional email. Your request will be processed
          within 10 business days.
        </p>
        <h2 className="mb-3">Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. However, no data transmission over the internet or
          electronic storage is entirely secure, and we cannot guarantee
          absolute security.
        </p>
        <h2 className="mb-3">Cookies and Tracking</h2>
        <p>
          The Website may use cookies and similar tracking technologies to
          enhance user experience and gather non-personal information about user
          activities on the Website. This information is used for analytical
          purposes and to improve the Website&#39;s content and functionality.
        </p>
        <h2 className="mb-3">Children&#39;s Privacy</h2>
        <p>
          Bonus topbon.us is not intended for individuals under the age of 18.
          We do not knowingly collect personal information from individuals
          under 18. If you believe that we have inadvertently collected such
          information, please contact us so we can promptly remove it.
        </p>
        <h2 className="mb-3">Changes to Privacy Policy</h2>
        <p>
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes will be reflected on this page with an updated
          effective date. Users are encouraged to review this Privacy Policy
          periodically.
        </p>
        <h2 className="mb-3">Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests related to your
          personal information or this Privacy Policy, please contact us at
          <a href="mailto:support@myawardwallet.com"> support@myawardwallet.com</a>. We will make
          reasonable efforts to address your inquiries in a timely manner. By
          using Bonus topbon.us, you agree to the practices outlined in this
          Privacy Policy. If you do not agree with any part of this policy,
          please refrain from using the Website.
        </p>
      </div>
    </div>
  );
}
