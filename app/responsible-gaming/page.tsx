import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible Gaming | Bonus topbon.us",
  description:
    "Navigate the complexities of casino payment methods with ease, thanks to Bonus topbon.us's comprehensive Payments guide. From credit cards and e-wallets to cryptocurrencies, we cover all the options, detailing the pros and cons to help you make informed decisions. Learn about processing times, fees, and security measures so you can deposit and withdraw funds with confidence. Your seamless gaming experience starts with choosing the right payment method, and we're here to guide you every step of the way!",
};

export default async function Bonuses() {
  return (
    <div className="page-gaming pt-10 pb-10">
      <div className="main__container">
        <h1 className="mb-3">Responsible Gaming</h1>
        <p>
          At Bonus topbon.us, we believe that gambling should always be a form
          of entertainment. However, it&#39;s important to recognize that a
          small percentage of individuals may lose control when gambling. Before
          you begin playing, it&#39;s crucial to understand that gambling should
          never be viewed as a means of generating income or solving financial
          problems. We recommend keeping track of the time and money you spend
          at our online casino each day.
        </p>
        <p>
          If you find that you&#39;re spending more money than you can afford or
          if gambling is interfering with your daily life, we strongly advise
          taking several measures to help you regain control. These measures
          include setting Personal Limits on your gaming activities, choosing
          Self-Exclusion, and seeking assistance from trusted independent
          organizations.
        </p>
        <h2 className="mb-3">Setting Personal Limits</h2>
        <p>
          To promote responsible gambling, we offer the Personal Limits feature.
          You can set limits on the following aspects of your gaming experience:
        </p>
        <ul>
          <li>
            Deposit Limit: Control the amount you can deposit in a day, week, or
            month.
          </li>
          <li>
            Loss Limit: Set a limit on your casino losses for a specific period
            (day, week, or month). Please note that this limit is based on your
            initial deposit and not on any winnings you may have.
          </li>
          <li>
            Wager Limit: Limit the amount you can wager in a day, week, or
            month.
          </li>
          <li>
            Cooling-Off Limit: Choose a Cooling-Off Period for a specific
            duration.
          </li>
          <li>
            Self-Exclusion Limit: Opt for a Self-Exclusion Limit for a defined
            period. When activated, your Player Account will be disabled, and
            you will not receive any promotional offers. You won&#39;t be able
            to deposit or withdraw funds during this period. Your account will
            automatically be re-activated after the limit&#39;s expiry.
          </li>
        </ul>
        <p>
          You can adjust these limits at any time. Reducing a limit takes effect
          immediately, while increasing it requires email confirmation and can
          only occur after the previous limit of the same type expires. If you
          need more information or assistance with Personal Limits, please
          contact our support team at{" "}
          <a target="_blank" href="mailto:support@myawardwallet.com">
            support@myawardwallet.com
          </a>
        </p>
        <h2 className="mb-3">Self-Exclusion by Request</h2>
        <p>
          If you decide to stop gambling at{" "}
          <a target="_blank" href="mailto:support@myawardwallet.com">
            support@myawardwallet.com
          </a>{" "}
          for a specific or indefinite period. We will take all necessary steps
          to block your access to your account and ensure that you receive no
          promotional materials.
        </p>
        <p>
          When you are self-excluded, you won&#39;t be able to log into your
          account or withdraw any remaining balance. To initiate a withdrawal of
          your remaining balance, contact our support team at{" "}
          <a target="_blank" href="mailto:support@myawardwallet.com">
            support@myawardwallet.com
          </a>
          . They will provide you with information and assistance within a
          reasonable timeframe.
        </p>

        <p>
          Please note that active self-exclusion does not exempt you from the
          verification procedure if required by the casino to process funds.
          Remaining funds will be paid according to the casino&#39;s limits.
        </p>
        <h2 className="mb-3">External Help</h2>
        <p>
          If you or someone you know is struggling with gambling-related issues,
          we encourage you to seek assistance from the following organizations:
        </p>
        <ul>
          <li>
            <a target="_blank" href="https://www.gamblersanonymous.org/">
              Gamblers Anonymous
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.gamcare.org.uk/">
              GamCare
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.gamblingtherapy.org/">
              Gambling Therapy
            </a>
          </li>
        </ul>
        <h2 className="mb-3">Protection of Minors</h2>
        <p>
          Bonus topbon.us only accepts players who are at least 18 years old and
          employs various methods to prevent minors from registering and playing
          on our website. We reserve the right to request proof of identity, and
          if a player is under the legal age to play, access to the website will
          be immediately denied.
        </p>
        <p>
          However, we recognize that due to the wide availability of the
          internet, individuals under the legal age may still attempt to
          register and play at an online casino. We strongly encourage parents
          to cooperate in protecting their children from unrestricted access to
          gaming websites. Special software tools are available to assist in
          this matter. For more information, please visit the following
          websites:
        </p>
        <ul>
          <li>
            <a target="_blank" href="https://www.cyberpatrol.com/">
              CyberPatrol
            </a>
          </li>
          <li>
            <a target="_blank" href="https://gamblock.com/">
              GamBlock®
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.solidoak.com/">
              Solid Oak Software
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.netnanny.com/">
              Net Nanny
            </a>
          </li>
        </ul>
        <p className="text-right">
          Responsible Gaming Last Updated: 19/09/2023.
        </p>
      </div>
    </div>
  );
}
