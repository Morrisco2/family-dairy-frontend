import { useEffect } from "react";

const LegalAndPolicies = () => {
    const today = new Date().toLocaleDateString();

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);

                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);
        }
    }, []);

    return (
        <div className="bg-[#E9F1FA] text-gray-600 py-6 px-5 w-full max-w-sm min-h-screen flex flex-col gap-5">

            <h1 className="text-2xl font-semibold text-[#2E5E99]">
                LEGAL & POLICIES
            </h1>

            <div>
                <ul className="flex gap-3 list-disc list-inside text-[#2E5E99] flex-wrap">
                    <li>
                        <small>
                            Last Updated: <span>{today}</span>
                        </small>
                    </li>

                    <li>
                        <small>
                            Effective Date: <span>{today}</span>
                        </small>
                    </li>
                </ul>
            </div>

            {/* INTRODUCTION */}
            <div className="flex flex-col gap-3">
                <p>Welcome to Family Diary</p>

                <small>
                    Family Diary is a digital platform designed to help individuals
                    and families create, organize, preserve, and share family
                    histories, family relationships, photographs, biographies,
                    and related memories.
                </small>

                <small>
                    By accessing or using Family Diary, you acknowledge that you
                    have read and understood these Legal & Policies and agree to
                    comply with them.
                </small>

                <small>
                    If you do not agree with these terms, please do NOT use the App.
                </small>
            </div>


            {/* ABOUT THESE POLICIES */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    1. ABOUT THESE POLICIES
                </h2>

                <small>
                    This document combines the principal legal and usage policies
                    applicable to Family Diary, including:
                </small>

                <ul className="flex flex-col list-disc list-inside flex-wrap">
                    <li><small>Terms of Use</small></li>
                    <li><small>Privacy Policy</small></li>
                    <li><small>Family Data and Consent Policy</small></li>
                    <li><small>User Content Policy</small></li>
                    <li><small>Acceptable Use Policy</small></li>
                    <li><small>Intellectual Property Policy</small></li>
                    <li><small>Data Retention and Deletion Policy</small></li>
                    <li><small>Cookies and Similar Technologies</small></li>
                    <li><small>Disclaimer and Limitation of Liability</small></li>
                    <li><small>Changes to These Policies</small></li>
                    <li><small>Legal and Privacy Contact</small></li>
                </ul>

                <small>
                    These policies apply to the Family Diary website,
                    Progressive Web App (PWA), mobile applications, and other
                    services operated by us, where applicable.
                </small>

            </div>


            {/* TERMS OF USE */}
            <div className="flex flex-col gap-3 scroll-mt-5" id="terms">

                <h2 className="font-semibold text-[#2E5E99]">
                    2. TERMS OF USE
                </h2>

                <h3 className="font-medium text-black">
                    2.1 Acceptance of Terms
                </h3>

                <small>
                    By creating an account, accessing, or using Family Diary,
                    you agree to these Legal & Policies.
                </small>

                <small>
                    If you are using Family Diary on behalf of another person,
                    family, organization, or group, you confirm that you have
                    the authority to do so.
                </small>

                <small>
                    We may update these policies from time to time. Continued
                    use of the App after an updated policy becomes effective
                    constitutes acceptance of the updated terms, subject to
                    applicable law.
                </small>

                <h3 className="font-medium text-black">
                    2.2 Eligibility
                </h3>

                <small>
                    You must provide information that is accurate and truthful
                    when creating an account.
                </small>

                <small>
                    Where applicable, you are responsible for ensuring that
                    your use of the App complies with any age requirements
                    imposed by applicable law.
                </small>

                <small>
                    If a parent, guardian, or other authorized adult creates
                    or manages an account or family record involving a child,
                    that person is responsible for ensuring that the information
                    is provided and processed appropriately.
                </small>

                <h3 className="font-medium text-black">
                    2.3 Your Account
                </h3>

                <small>
                    You are responsible for:
                </small>

                <ul className="list-disc pl-5">
                    <li>
                        <small>
                            Maintaining the confidentiality of your login credentials.
                        </small>
                    </li>

                    <li>
                        <small>
                            Providing accurate account information.
                        </small>
                    </li>

                    <li>
                        <small>
                            Keeping your account secure.
                        </small>
                    </li>

                    <li>
                        <small>
                            Not allowing unauthorized persons to access your account.
                        </small>
                    </li>

                    <li>
                        <small>
                            Not impersonating another person.
                        </small>
                    </li>

                    <li>
                        <small>
                            Not knowingly creating fraudulent accounts.
                        </small>
                    </li>
                </ul>

                <small>
                    You should notify us promptly if you believe that your
                    account has been accessed without authorization.
                </small>

                <small>
                    We are not responsible for losses resulting from your
                    failure to properly protect your account credentials,
                    except where liability cannot lawfully be excluded.
                </small>

            </div>


            {/* FAMILY INFORMATION AND CONSENT */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    3. FAMILY INFORMATION AND CONSENT
                </h2>

                <small>
                    Family Diary allows users to create records concerning
                    family members.
                </small>

                <small>
                    This may include information such as:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Names</small></li>
                    <li><small>Family relationships</small></li>
                    <li><small>Birth dates</small></li>
                    <li><small>Death dates</small></li>
                    <li><small>Biographical information</small></li>
                    <li><small>Photographs</small></li>
                    <li><small>Family memories</small></li>
                    <li><small>Places associated with family history</small></li>
                    <li><small>Other information voluntarily entered by users</small></li>
                </ul>

                <h3 className="font-medium text-black">
                    3.1 Responsibility for Information You Add
                </h3>

                <small>
                    If you add information about another person, you are
                    responsible for ensuring that you have an appropriate
                    legal basis, authority, permission, or other legitimate
                    reason for providing that information.
                </small>

                <small>
                    You should not use Family Diary to publish another person's
                    private information merely because you have access to it.
                </small>

                <small>
                    In particular, users should exercise additional care before
                    entering information such as:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Residential addresses</small></li>
                    <li><small>Telephone numbers</small></li>
                    <li><small>Email addresses</small></li>
                    <li><small>Financial information</small></li>
                    <li><small>Identification numbers</small></li>
                    <li><small>Passwords</small></li>
                    <li><small>Medical information</small></li>
                    <li><small>Private correspondence</small></li>
                    <li><small>Other sensitive personal information</small></li>
                </ul>

                <small>
                    Unless necessary and legally appropriate, users should
                    avoid adding sensitive information about living individuals.
                </small>

                <h3 className="font-medium text-black">
                    3.2 Information About Deceased Persons
                </h3>

                <small>
                    Family Diary may contain historical information about
                    deceased relatives.
                </small>

                <small>
                    Users should nevertheless exercise reasonable care when
                    entering information about deceased persons, particularly
                    where the information also identifies or reveals personal
                    information about living relatives.
                </small>

                <small>
                    Family history should not be used as a means of exposing
                    another person's private information.
                </small>

                <h3 className="font-medium text-black">
                    3.3 Accuracy of Family Information
                </h3>

                <small>
                    Family Diary is a platform for recording family information
                    supplied by users.
                </small>

                <small>
                    We do not necessarily independently verify:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Family relationships</small></li>
                    <li><small>Dates</small></li>
                    <li><small>Names</small></li>
                    <li><small>Historical events</small></li>
                    <li><small>Genealogical claims</small></li>
                    <li><small>Biographical information</small></li>
                    <li><small>Photographs</small></li>
                    <li><small>User-submitted family records</small></li>
                </ul>

                <small>
                    Users are responsible for checking information before
                    treating it as accurate.
                </small>

                <small>
                    A family-tree entry on Family Diary should not automatically
                    be treated as an official government, civil-registration,
                    legal, genealogical, or historical record.
                </small>

            </div>


            {/* PRIVACY POLICY */}
            <div className="flex flex-col gap-3 scroll-mt-5" id="privacy">

                <h2 className="font-semibold text-[#2E5E99]">
                    4. PRIVACY POLICY
                </h2>

                <h3 className="font-medium text-black">
                    4.1 Information We May Collect
                </h3>

                <small>
                    Depending on the features you use, we may collect information
                    including:
                </small>

                <h3 className="font-medium text-black">
                    Account Information
                </h3>

                <ul className="list-disc pl-5">
                    <li><small>Name</small></li>
                    <li><small>Email address</small></li>
                    <li><small>Username</small></li>
                    <li><small>Password or authentication credentials</small></li>
                    <li><small>Profile information</small></li>
                </ul>

                <h3 className="font-medium text-black">
                    Family Information
                </h3>

                <ul className="list-disc pl-5">
                    <li><small>Family members' names</small></li>
                    <li><small>Relationships</small></li>
                    <li><small>Dates of birth</small></li>
                    <li><small>Dates of death</small></li>
                    <li><small>Biographical information</small></li>
                    <li><small>Family history</small></li>
                    <li><small>Photographs</small></li>
                    <li><small>Other information entered by users</small></li>
                </ul>

                <h3 className="font-medium text-black">
                    Technical Information
                </h3>

                <small>
                    We may collect certain technical information necessary to
                    operate, secure, and improve the App, such as:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>IP address</small></li>
                    <li><small>Browser type</small></li>
                    <li><small>Device type</small></li>
                    <li><small>Operating system</small></li>
                    <li><small>Log information</small></li>
                    <li><small>Authentication information</small></li>
                    <li><small>App usage information</small></li>
                    <li><small>Error and diagnostic information</small></li>
                </ul>

                <small>
                    The exact information collected will depend on the features
                    and technologies implemented in the App.
                </small>

                <h3 className="font-medium text-black">
                    4.2 How We Use Information
                </h3>

                <small>
                    We may use information to:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Create and maintain user accounts.</small></li>
                    <li><small>Provide family-tree and family-diary functionality.</small></li>
                    <li><small>Store and display information entered by authorized users.</small></li>
                    <li><small>Authenticate users.</small></li>
                    <li><small>Secure the App.</small></li>
                    <li><small>Prevent abuse and unauthorized access.</small></li>
                    <li><small>Provide customer support.</small></li>
                    <li><small>Diagnose technical problems.</small></li>
                    <li><small>Improve the App.</small></li>
                    <li><small>Maintain backups and service reliability.</small></li>
                    <li><small>Comply with legal obligations.</small></li>
                    <li><small>Protect our rights and the rights of users.</small></li>
                </ul>

                <small>
                    We will not use personal information for purposes materially
                    different from those described in this policy without
                    appropriate notice or other lawful basis where required.
                </small>

                <h3 className="font-medium text-black">
                    4.3 Sharing of Personal Information
                </h3>

                <small>
                    We do not sell users' personal information merely because
                    they use Family Diary.
                </small>

                <small>
                    We may disclose information where reasonably necessary to:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Provide the service.</small></li>
                    <li><small>Use service providers that help us operate the platform.</small></li>
                    <li><small>Protect the security of the App.</small></li>
                    <li><small>Prevent fraud or abuse.</small></li>
                    <li><small>Comply with a valid legal obligation, court order, or lawful request.</small></li>
                    <li><small>Protect the rights, property, or safety of users, us, or others.</small></li>
                    <li><small>Respond to emergencies where legally permitted.</small></li>
                </ul>

                <small>
                    Where third-party service providers process personal
                    information on our behalf, we expect them to handle such
                    information in accordance with applicable contractual and
                    legal requirements.
                </small>

            </div>


            {/* DATA SECURITY */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    5. DATA SECURITY
                </h2>

                <small>
                    We take reasonable technical and organizational measures
                    designed to protect personal information against unauthorized
                    access, loss, alteration, disclosure, or destruction.
                </small>

                <small>
                    Depending on the implementation of the App, these measures
                    may include:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Authentication controls</small></li>
                    <li><small>Password protection</small></li>
                    <li><small>Access controls</small></li>
                    <li><small>Encryption where appropriate</small></li>
                    <li><small>Secure communications</small></li>
                    <li><small>Database security measures</small></li>
                    <li><small>Backup procedures</small></li>
                    <li><small>Monitoring and logging</small></li>
                    <li><small>Security updates</small></li>
                </ul>

                <small>
                    However, no internet-based service can guarantee absolute
                    security.
                </small>

                <small>
                    You acknowledge that information transmitted over the
                    internet may face risks despite reasonable security measures.
                </small>

                <small>
                    If we become aware of a security incident affecting personal
                    information, we will respond in accordance with applicable
                    law and our incident-response procedures.
                </small>

            </div>


            {/* USER CONTENT */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    6. USER CONTENT
                </h2>

                <small>
                    Users may be able to upload or create content, including:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Family photographs</small></li>
                    <li><small>Family biographies</small></li>
                    <li><small>Written memories</small></li>
                    <li><small>Family histories</small></li>
                    <li><small>Documents</small></li>
                    <li><small>Names</small></li>
                    <li><small>Family-tree information</small></li>
                    <li><small>Other materials</small></li>
                </ul>

                <small>
                    This is referred to as "User Content".
                </small>

                <h3 className="font-medium text-black">
                    6.1 Ownership of User Content
                </h3>

                <small>
                    You generally retain ownership of User Content that you
                    lawfully own.
                </small>

                <small>
                    Uploading content to Family Diary does not, by itself,
                    transfer ownership of that content to us.
                </small>

                <small>
                    However, you grant us the permissions reasonably necessary
                    to store, process, back up, display, and transmit your User
                    Content for the purpose of providing the Family Diary service.
                </small>

                <small>
                    You represent that you have the necessary rights or
                    authorization to provide content that you upload.
                </small>

                <h3 className="font-medium text-black">
                    6.2 Third-Party Content
                </h3>

                <small>
                    Do not upload photographs, documents, writings, recordings,
                    or other material belonging to another person unless you
                    have the necessary permission or legal authority to do so.
                </small>

                <small>
                    You are responsible for content you upload.
                </small>

            </div>


            {/* ACCEPTABLE USE */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    7. ACCEPTABLE USE
                </h2>

                <small>
                    You agree not to use Family Diary to:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Violate applicable law.</small></li>
                    <li><small>Impersonate another person.</small></li>
                    <li><small>Access another person's account without authorization.</small></li>
                    <li><small>Attempt to bypass security controls.</small></li>
                    <li><small>Introduce malicious software.</small></li>
                    <li><small>Attack, disrupt, or interfere with the App.</small></li>
                    <li><small>Scrape or systematically extract information without authorization.</small></li>
                    <li><small>Upload content that infringes another person's intellectual-property rights.</small></li>
                    <li><small>Publish private information without appropriate authorization.</small></li>
                    <li><small>Harass, threaten, or abuse other users.</small></li>
                    <li><small>Commit fraud.</small></li>
                    <li><small>Create fraudulent family records for unlawful purposes.</small></li>
                    <li><small>Use the App to facilitate identity theft.</small></li>
                    <li><small>Attempt to obtain passwords or authentication credentials.</small></li>
                    <li><small>Exploit vulnerabilities in the App.</small></li>
                    <li><small>Use the App for any unlawful or abusive purpose.</small></li>
                </ul>

                <small>
                    We may restrict, suspend, or terminate accounts that violate
                    these rules, subject to applicable law.
                </small>

            </div>


            {/* CHILDREN AND MINORS */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    8. CHILDREN AND MINORS
                </h2>

                <small>
                    Family Diary may contain information about children as part
                    of family records.
                </small>

                <small>
                    Users should not upload unnecessary personal information
                    about children.
                </small>

                <small>
                    Where a child is involved, parents, guardians, or other
                    authorized adults should take particular care to ensure
                    that information is shared appropriately.
                </small>

                <small>
                    We do not intentionally seek unnecessary personal information
                    from children.
                </small>

                <small>
                    If you believe that information relating to a child has
                    been collected or displayed improperly, please contact us
                    using the legal/privacy contact information below.
                </small>

            </div>


            {/* INTELLECTUAL PROPERTY */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    9. INTELLECTUAL PROPERTY
                </h2>

                <small>
                    Unless otherwise stated, Family Diary and its original
                    components are owned by or licensed to [OWNER / COMPANY NAME].
                </small>

                <small>
                    This may include:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Software code</small></li>
                    <li><small>Website and application design</small></li>
                    <li><small>Logos</small></li>
                    <li><small>Branding</small></li>
                    <li><small>Original graphics</small></li>
                    <li><small>Original written material</small></li>
                    <li><small>Interface designs</small></li>
                    <li><small>Database structures</small></li>
                    <li><small>Documentation</small></li>
                    <li><small>Other original materials</small></li>
                </ul>

                <small>
                    Except where permitted by law or expressly authorized by
                    us, you may not reproduce, modify, distribute, sell, license,
                    reverse engineer, or commercially exploit our protected
                    materials.
                </small>

                <small>
                    Third-party software, libraries, icons, fonts, images, and
                    other components remain subject to their respective licenses
                    and ownership rights.
                </small>

            </div>


            {/* COPYRIGHT COMPLAINTS */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    10. COPYRIGHT COMPLAINTS
                </h2>

                <small>
                    If you believe that content available through Family Diary
                    infringes your copyright or other intellectual-property
                    rights, you may contact us.
                </small>

                <small>
                    Your complaint should, where applicable, include:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Your name and contact information.</small></li>
                    <li><small>Identification of the copyrighted work.</small></li>
                    <li><small>Identification of the material you believe infringes your rights.</small></li>
                    <li><small>Information reasonably sufficient to locate the material.</small></li>
                    <li><small>An explanation of the alleged infringement.</small></li>
                    <li><small>Confirmation that the information supplied is accurate.</small></li>
                    <li><small>Any other information reasonably required to investigate the complaint.</small></li>
                </ul>

                <small>
                    Where appropriate and legally required, we may investigate,
                    restrict access to, remove, or otherwise address allegedly
                    infringing content.
                </small>

            </div>


            {/* DATA RETENTION */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    11. DATA RETENTION
                </h2>

                <small>
                    We retain personal information only for as long as reasonably
                    necessary for the purposes for which it was collected, to
                    provide the service, maintain legitimate business records,
                    resolve disputes, enforce agreements, maintain security,
                    comply with legal obligations, or for other lawful purposes.
                </small>

                <small>
                    Different categories of information may be retained for
                    different periods.
                </small>

                <small>
                    Backup copies may remain for a limited period after
                    information is deleted from active systems, depending on
                    our backup and disaster-recovery procedures.
                </small>

            </div>


            {/* ACCOUNT AND DATA DELETION */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    12. ACCOUNT AND DATA DELETION
                </h2>

                <small>
                    Users may request deletion of their account and applicable
                    personal information.
                </small>

                <small>
                    A deletion request may be submitted through:
                </small>

                <small className="text-[#2E5E99]">
                    Email: [PRIVACY EMAIL]
                </small>

                <small>
                    We may request reasonable information to verify the identity
                    or authority of the person making the request.
                </small>

                <small>
                    Deletion may not immediately remove information that we are
                    legally required or legitimately entitled to retain,
                    including information necessary for:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Legal compliance</small></li>
                    <li><small>Fraud prevention</small></li>
                    <li><small>Security</small></li>
                    <li><small>Dispute resolution</small></li>
                    <li><small>Enforcement of agreements</small></li>
                    <li><small>Backup or disaster-recovery purposes</small></li>
                </ul>

                <small>
                    Where information cannot immediately be deleted for one of
                    these reasons, we will restrict its use where reasonably
                    appropriate.
                </small>

            </div>


            {/* PRIVACY RIGHTS */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    13. PRIVACY RIGHTS
                </h2>

                <small>
                    Subject to applicable Nigerian law and the circumstances
                    of the particular request, individuals may have rights
                    relating to their personal information, which may include
                    rights concerning:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Access</small></li>
                    <li><small>Correction</small></li>
                    <li><small>Updating inaccurate information</small></li>
                    <li><small>Deletion</small></li>
                    <li><small>Restriction of certain processing</small></li>
                    <li><small>Objection to certain processing</small></li>
                    <li><small>Other rights provided by applicable data-protection law</small></li>
                </ul>

                <small>
                    Requests concerning personal information may be submitted
                    through:
                </small>

                <small className="text-[#2E5E99]">
                    Privacy Contact: [PRIVACY EMAIL]
                </small>

                <small>
                    We will handle valid requests in accordance with applicable law.
                </small>

            </div>


            {/* COOKIES */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    14. COOKIES AND SIMILAR TECHNOLOGIES
                </h2>

                <small>
                    Family Diary may use cookies, local storage, session
                    technologies, analytics tools, or similar technologies
                    where necessary to operate and secure the service or
                    understand how the service is used.
                </small>

                <small>
                    The technologies actually used by the App may change as
                    the service develops.
                </small>

                <small>
                    Where required by applicable law, we will provide appropriate
                    notice or obtain applicable consent before using technologies
                    that require it.
                </small>

                <small>
                    Users may also be able to control certain browser or device
                    settings relating to cookies and similar technologies.
                </small>

            </div>


            {/* THIRD-PARTY SERVICES */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    15. THIRD-PARTY SERVICES
                </h2>

                <small>
                    Family Diary may integrate with third-party services such as:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Authentication providers</small></li>
                    <li><small>Cloud hosting providers</small></li>
                    <li><small>Database providers</small></li>
                    <li><small>Storage providers</small></li>
                    <li><small>Analytics services</small></li>
                    <li><small>Email providers</small></li>
                    <li><small>Payment providers</small></li>
                    <li><small>Other technical service providers</small></li>
                </ul>

                <small>
                    Third-party services may have their own terms and privacy
                    policies.
                </small>

                <small>
                    We are not responsible for the independent policies or
                    practices of third-party services that are outside our control.
                </small>

                <small>
                    Where appropriate, we will identify relevant third-party
                    services in our privacy documentation.
                </small>

            </div>


            {/* SERVICE AVAILABILITY */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    16. SERVICE AVAILABILITY
                </h2>

                <small>
                    We aim to keep Family Diary available and reliable, but we
                    do not guarantee uninterrupted availability.
                </small>

                <small>
                    The service may occasionally become unavailable because of:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Maintenance</small></li>
                    <li><small>Updates</small></li>
                    <li><small>Security incidents</small></li>
                    <li><small>Infrastructure failures</small></li>
                    <li><small>Internet or network problems</small></li>
                    <li><small>Third-party service failures</small></li>
                    <li><small>Events beyond our reasonable control</small></li>
                </ul>

                <small>
                    We may modify, suspend, or discontinue features of the App
                    where reasonably necessary.
                </small>

            </div>


            {/* DISCLAIMER */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    17. DISCLAIMER
                </h2>

                <small>
                    Family Diary is provided as a digital family-history and
                    information-management service.
                </small>

                <small>
                    Unless expressly stated otherwise, we do not guarantee that:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Family information entered by users is accurate.</small></li>
                    <li><small>Historical information is complete.</small></li>
                    <li><small>Family relationships have been independently verified.</small></li>
                    <li><small>User-submitted photographs or documents are authentic.</small></li>
                    <li><small>The service will always be available.</small></li>
                    <li><small>Information stored in the App will never be lost or corrupted.</small></li>
                </ul>

                <small>
                    Users should maintain appropriate independent copies of
                    important photographs, documents, records, and family
                    information.
                </small>

                <small>
                    Family Diary should not be treated as a replacement for
                    official government records, civil-registration records,
                    legal documents, wills, certificates, or other official
                    documentation.
                </small>

            </div>


            {/* LIMITATION OF LIABILITY */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    18. LIMITATION OF LIABILITY
                </h2>

                <small>
                    To the maximum extent permitted by applicable law, we will
                    not be responsible for losses arising from circumstances
                    outside our reasonable control, including certain:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Internet failures</small></li>
                    <li><small>Third-party service failures</small></li>
                    <li><small>Unauthorized access</small></li>
                    <li><small>User errors</small></li>
                    <li><small>Loss of user credentials</small></li>
                    <li><small>Incorrect information supplied by users</small></li>
                    <li><small>User-uploaded content</small></li>
                    <li><small>Device failures</small></li>
                    <li><small>Force majeure events</small></li>
                </ul>

                <small>
                    Nothing in these policies is intended to exclude or limit
                    liability where such exclusion or limitation is prohibited
                    by applicable law.
                </small>

                <small>
                    Nothing in these policies removes any mandatory legal rights
                    that cannot lawfully be excluded.
                </small>

            </div>


            {/* INDEMNITY */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    19. INDEMNITY
                </h2>

                <small>
                    To the extent permitted by applicable law, a user may be
                    responsible for losses or claims arising from the user's
                    unlawful use of Family Diary, violation of these policies,
                    or infringement of another person's rights through content
                    or information supplied by that user.
                </small>

                <small>
                    This section does not apply where such responsibility cannot
                    lawfully be imposed.
                </small>

            </div>


            {/* SUSPENSION OR TERMINATION */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    20. SUSPENSION OR TERMINATION
                </h2>

                <small>
                    We may suspend or terminate access to Family Diary where
                    reasonably necessary because of:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Serious violation of these policies.</small></li>
                    <li><small>Fraudulent activity.</small></li>
                    <li><small>Unauthorized access attempts.</small></li>
                    <li><small>Security threats.</small></li>
                    <li><small>Abuse of the service.</small></li>
                    <li><small>Legal requirements.</small></li>
                    <li><small>Other circumstances where continued access creates significant risk.</small></li>
                </ul>

                <small>
                    Where appropriate, we may provide notice before suspension
                    or termination.
                </small>

                <small>
                    Nothing in this section prevents users from exercising
                    rights available under applicable law.
                </small>

            </div>


            {/* CHANGES */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    21. CHANGES TO THE APP OR THESE POLICIES
                </h2>

                <small>
                    Family Diary may evolve over time.
                </small>

                <small>
                    We may modify:
                </small>

                <ul className="list-disc pl-5">
                    <li><small>Features</small></li>
                    <li><small>Interface</small></li>
                    <li><small>Technical infrastructure</small></li>
                    <li><small>Policies</small></li>
                    <li><small>Security procedures</small></li>
                    <li><small>Data-processing practices</small></li>
                </ul>

                <small>
                    When changes to these Legal & Policies are material, we will
                    provide appropriate notice where required.
                </small>

                <small>
                    The updated version will indicate its effective date.
                </small>

            </div>


            {/* GOVERNING LAW */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    22. GOVERNING LAW
                </h2>

                <small>
                    These policies are intended to operate in accordance with
                    the applicable laws of the Federal Republic of Nigeria,
                    subject to any mandatory laws or rights that apply to the
                    particular user or circumstances.
                </small>

                <small>
                    Nothing in these policies is intended to deprive a person
                    of mandatory legal rights that cannot lawfully be excluded.
                </small>

            </div>


            {/* DISPUTES AND LEGAL REQUESTS */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    23. DISPUTES AND LEGAL REQUESTS
                </h2>

                <small>
                    If you have a complaint or concern, we encourage you to
                    contact us first so that we can attempt to resolve the matter.
                </small>

                <small>
                    Legal notices, privacy requests, copyright complaints,
                    and other formal requests should be sent to:
                </small>

                <small className="text-[#2E5E99]">
                    Email: [LEGAL EMAIL]
                </small>

                <small className="text-[#2E5E99]">
                    Privacy: [PRIVACY EMAIL]
                </small>

                <small className="text-[#2E5E99]">
                    Business/Company Name: [LEGAL BUSINESS NAME]
                </small>

                <small className="text-[#2E5E99]">
                    Address: [BUSINESS ADDRESS]
                </small>

                <small>
                    We may require reasonable information to verify the identity
                    or authority of the person making a legal or privacy request.
                </small>

            </div>


            {/* CONTACT */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    24. CONTACT
                </h2>

                <small>
                    For questions concerning these policies, privacy, family
                    information, account deletion, copyright, or other legal
                    matters:
                </small>

                <small className="font-medium text-black">
                    Family Diary
                </small>

                <small className="text-[#2E5E99]">
                    Website: [WEBSITE]
                </small>

                <small className="text-[#2E5E99]">
                    Email: [LEGAL EMAIL]
                </small>

                <small className="text-[#2E5E99]">
                    Privacy Email: [PRIVACY EMAIL]
                </small>

                <small className="text-[#2E5E99]">
                    Business Name: [LEGAL BUSINESS NAME]
                </small>

            </div>


            {/* IMPORTANT NOTICE */}
            <div className="flex flex-col gap-3">

                <h2 className="font-semibold text-[#2E5E99]">
                    IMPORTANT NOTICE
                </h2>

                <small>
                    This Legal & Policies document is intended as a general
                    policy framework for Family Diary and should not be
                    interpreted as legal advice.
                </small>

                <small>
                    The actual rights, obligations, data-processing practices,
                    retention periods, consent mechanisms, security measures,
                    and legal requirements applicable to Family Diary depend
                    on the final features, business structure, users, hosting
                    providers, third-party services, and jurisdictions in which
                    the service operates.
                </small>

                <small>
                    Before publicly launching the service, the owner or operating
                    company should have this document reviewed by a qualified
                    Nigerian lawyer or data-protection professional and should
                    ensure that the application's actual technical behaviour
                    matches the statements made in this document.
                </small>

                <small>
                    Last Updated: <span>{today}</span>
                </small>

            </div>

        </div>
    );
};

export default LegalAndPolicies;