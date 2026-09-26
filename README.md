# Scheme Connect

Build a modern, premium, full-stack web application called "YojnaSetu".

PROJECT PURPOSE:

YojnaSetu is an Indian government scheme discovery platform. Its main goal is to help users discover government schemes they may be eligible for.

MAIN LEAD MAGNET:

"Find Government Schemes You Are Eligible For — in Just 2 Minutes."

IMPORTANT:

The website must NOT look like an old-fashioned government website. It should look like a modern SaaS/fintech product: clean, premium, trustworthy, simple, responsive, and user-friendly.

TECH STACK:

- React

- TypeScript

- Tailwind CSS

- shadcn/ui components

- Lucide icons

- Supabase or Lovable Cloud for authentication and database

DESIGN SYSTEM:

Primary Navy: #0F2747

Primary Blue: #2563EB

Accent Saffron: #F59E0B

Success Green: #059669

Background: #FFFFFF

Light Background: #F8FAFC

Secondary Background: #F1F5F9

Primary Text: #0F172A

Secondary Text: #475569

Muted Text: #64748B

Border: #E2E8F0

Error: #DC2626

FONT:

Use Inter as the primary font.

UI STYLE:

- Modern and premium

- Clean layout with generous whitespace

- Rounded corners between 12px and 16px

- Subtle borders and soft shadows

- Smooth transitions

- Strong typography hierarchy

- Accessible contrast

- Mobile-first responsive design

- Avoid excessive gradients

- Avoid clutter

- Avoid generic template appearance

Create a reusable design system with consistent:

- Buttons

- Cards

- Form fields

- Badges

- Navigation

- Modals

- Empty states

- Loading states

- Error states

==================================================

1. NAVIGATION

==================================================

Create a responsive sticky navbar.

Left:

YojnaSetu logo and brand name.

Desktop navigation:

- Home

- Explore Schemes

- Categories

- How It Works

- Resources

Right side for logged-out users:

- Log In

- Primary CTA button: "Check My Eligibility"

For logged-in users:

- Notification icon

- User avatar

- Profile dropdown

On mobile:

- Hamburger menu

- Mobile navigation drawer

- Keep the "Check My Eligibility" CTA prominent.

==================================================

2. HOME PAGE

==================================================

Create the following sections.

HERO SECTION:

Badge:

"🇮🇳 Making Government Benefits Easier to Access"

Main heading:

"Find Government Schemes You Are Eligible For — in Just 2 Minutes."

Highlight "Eligible For" or "2 Minutes" using the primary blue color.

Supporting text:

"Government schemes can provide valuable support, but finding the right one can be confusing. Answer a few simple questions and discover schemes that may match your profile, needs, and eligibility."

Primary CTA:

"Check My Eligibility — It's Free"

Secondary CTA:

"Explore All Schemes"

Trust indicators:

✓ Free to Use

✓ Simple & Easy

✓ Personalized Discovery

✓ Official Sources

Create a modern visual on the right side showing a UI card:

"Your Scheme Matches"

"12 Potential Matches"

Education & Scholarships — 4

Women Empowerment — 3

Employment & Skills — 3

Social Welfare — 2

On mobile, stack the content vertically.

--------------------------------------------------

PROBLEM SECTION:

Heading:

"Government Schemes Are Helpful. Finding the Right One Isn't Always Easy."

Create 4 cards:

1. Too Much Information

Important information is spread across different websites and portals.

2. Confusing Eligibility

People often don't know whether they actually qualify.

3. Unclear Documents

Users may not know which documents they need before applying.

4. Missed Deadlines

Important opportunities can be missed because users discover them too late.

Closing statement:

"YojnaSetu helps bridge the gap between people and the opportunities created to support them."

--------------------------------------------------

ELIGIBILITY CHECKER PROMOTION SECTION:

Small label:

"PERSONALIZED DISCOVERY"

Heading:

"Not Sure Which Schemes Are Right for You?"

Subheading:

"Let YojnaSetu Help You Find Them."

Text:

"Answer a few simple questions about yourself, and we'll help identify government schemes that may match your profile."

Show 3 steps:

1. Tell us about yourself

2. Answer a few eligibility questions

3. Discover schemes that may match your profile

CTA:

"Find My Eligible Schemes"

Supporting text:

"Takes approximately 2 minutes • Free to use"

--------------------------------------------------

HOW IT WORKS:

Heading:

"Finding Relevant Schemes Is Simple."

Create 4 steps:

01 — Build Your Profile

Share only the information needed to understand your needs and eligibility.

02 — Answer Simple Questions

Complete a short questionnaire designed to take approximately two minutes.

03 — Discover Your Matches

See government schemes that may match your profile.

04 — Take the Next Step

View benefits, eligibility, documents, deadlines, and official application links.

CTA:

"Start My Free Eligibility Check"

--------------------------------------------------

CATEGORIES SECTION:

Heading:

"Find Support Based on Your Needs."

Create 6 responsive category cards:

🎓 Education & Scholarships

Scholarships, fellowships, education assistance, and financial support.

👩 Women Empowerment

Education, entrepreneurship, financial support, and welfare.

🌾 Agriculture & Farmers

Financial assistance, insurance, technology, and farmer support.

💼 Employment & Skills

Jobs, apprenticeships, training, and skill development.

🚀 Startup & Business

Loans, subsidies, entrepreneurship, and business support.

🏠 Social Welfare

Housing, pensions, healthcare, disability, and welfare support.

Each card should link to a filtered scheme listing.

--------------------------------------------------

WHY YOJNASETU SECTION:

Heading:

"Everything You Need to Understand a Scheme — in One Place."

Features:

🎯 Understand Eligibility

Quickly understand who may qualify.

💰 Explore Benefits

See the financial or other support provided.

📄 Know Required Documents

Prepare before beginning your application.

📅 Track Important Dates

Stay aware of deadlines and important updates.

🔗 Visit Official Sources

Access official information and application portals.

==================================================

3. ELIGIBILITY CHECKER

==================================================

Create a dedicated page at:

/eligibility-checker

Create a beautiful multi-step form.

Include:

- Progress indicator

- Step number

- Back button

- Continue button

- Form validation

- Smooth transitions

STEP 1: BASIC INFORMATION

Fields:

- Age

- Gender where relevant

- State

- District (optional)

- Urban or Rural

STEP 2: EDUCATION

Fields:

- Education level

- Student status

- Course or field where relevant

STEP 3: EMPLOYMENT

Options:

- Student

- Employed

- Self-employed

- Unemployed

- Farmer

- Business Owner

- Other

STEP 4: INCOME

Ask for:

- Annual family income range

Do not ask for unnecessary precise financial details.

STEP 5: SUPPORT NEEDED

Allow multiple selection:

- Scholarship

- Education

- Employment

- Skill Development

- Business Support

- Agriculture

- Housing

- Healthcare

- Women Empowerment

- Social Welfare

STEP 6: ADDITIONAL INFORMATION

Show conditional questions only when relevant.

Do NOT collect:

- Aadhaar numbers

- Bank account details

- Passwords

- Unnecessary sensitive information

After completion, redirect the user to:

/eligibility-results

==================================================

4. ELIGIBILITY RESULTS PAGE

==================================================

Heading:

"Great News! We Found Schemes That May Match Your Profile."

Show:

"12 Potential Matches"

Create category filters:

- All

- Education

- Employment

- Women

- Agriculture

- Welfare

Each scheme card should contain:

- Scheme name

- Category

- Government level

- Short description

- Key benefits

- Why it may match the user

- View Details button

- Save Scheme button

Example:

"Matches your profile based on your education level and selected state."

IMPORTANT:

Use clearly labeled demo/sample data until verified government scheme data is added.

Do not present fake scheme information as official information.

If a non-authenticated user clicks "Save Scheme" or "Save My Results", show an authentication modal.

Modal heading:

"Save Your Personalized Results"

Text:

"Create a free account to access your scheme matches anytime, bookmark opportunities, and track important deadlines."

Buttons:

- Continue with Google

- Sign Up with Email

- Log In

==================================================

5. AUTHENTICATION

==================================================

Implement REAL authentication using Supabase or Lovable Cloud.

Create pages:

/login

/signup

/forgot-password

/reset-password

SIGNUP PAGE:

Heading:

"Find Opportunities Made for You."

Fields:

- Full Name

- Email

- Password

- Confirm Password

Include:

- Google Sign-In

- Password visibility toggle

- Password validation

- Terms and Privacy checkbox

CTA:

"Create My Free Account"

LOGIN PAGE:

Heading:

"Welcome Back 👋"

Text:

"Continue your journey to discover opportunities that matter to you."

Fields:

- Email

- Password

Include:

- Remember Me

- Forgot Password

- Google Sign-In

CTA:

"Log In"

Implement:

- Secure authentication

- Email/password login

- Google authentication

- Password reset

- Protected routes

- Session management

- Loading states

- Error handling

Do NOT create fake authentication.

==================================================

6. USER DASHBOARD

==================================================

Create a protected page:

/dashboard

Heading:

"Welcome Back, [First Name] 👋"

Dashboard cards:

🎯 Eligible Schemes

Number of matched schemes.

⭐ Saved Schemes

Number of bookmarked schemes.

⏰ Upcoming Deadlines

Important dates from saved schemes.

📄 Document Checklists

Saved or generated document checklists.

Create sections:

- Recommended for You

- Recently Viewed

- Saved Schemes

- Upcoming Deadlines

Create attractive empty states for new users.

==================================================

7. EXPLORE SCHEMES PAGE

==================================================

Create:

/schemes

Include:

- Search bar

- Category filters

- State filters

- Central/State Government filter

- Target user filter

- Sorting

The filters must work properly on mobile.

Each scheme card should link to:

/scheme/[slug]

==================================================

8. SCHEME DETAILS PAGE

==================================================

Create a dynamic scheme details page.

Include:

- Scheme Name

- Category

- Central or State Government

- Overview

- Benefits

- Eligibility Criteria

- Required Documents

- Application Process

- Important Dates

- Official Source

- Official Application Link

- Last Updated date

- Save Scheme button

On desktop, create a sticky sidebar or table of contents.

Include this disclaimer:

"YojnaSetu is an independent information and discovery platform. Final eligibility and application approval are determined by the respective government authorities. Please verify all information through the official source before applying."

==================================================

9. DATABASE

==================================================

Create a scalable database structure.

TABLE: profiles

- id

- full_name

- email

- age

- state

- district

- education

- occupation

- income_range

- preferences

- created_at

- updated_at

TABLE: schemes

- id

- scheme_name

- slug

- description

- category

- government_level

- state

- benefits

- eligibility_criteria

- required_documents

- application_process

- official_url

- application_url

- deadline

- last_updated

- verification_status

TABLE: saved_schemes

- id

- user_id

- scheme_id

- saved_at

TABLE: eligibility_results

- id

- user_id

- scheme_id

- match_reason

- created_at

Implement Row Level Security.

Users must only access:

- Their own profile

- Their own saved schemes

- Their own eligibility results

==================================================

10. SEO REQUIREMENTS

==================================================

Make the website SEO-friendly.

Implement:

- Semantic HTML

- Proper heading hierarchy

- Exactly one H1 per page

- SEO-friendly URLs

- Dynamic page titles

- Meta descriptions

- Canonical URLs

- Open Graph metadata

- Twitter metadata

- Sitemap

- robots.txt

- Schema.org structured data

Use structured data for:

- Organization

- WebSite

- FAQPage

- BreadcrumbList

Example URLs:

/schemes

/eligibility-checker

/categories/education

/scheme/[scheme-slug]

/resources/how-to-apply-for-government-schemes

All images must have meaningful alt text.

Optimize for:

- Fast loading

- Core Web Vitals

- Lazy loading images

- Minimal unnecessary JavaScript

- No layout shifts

==================================================

11. ACCESSIBILITY

==================================================

Follow WCAG 2.2 AA best practices where possible.

Include:

- Good color contrast

- Keyboard navigation

- Visible focus states

- Accessible labels

- Semantic HTML

- Screen-reader-friendly icons

- Accessible forms

- Large touch targets

Do not communicate important information using color alone.

==================================================

12. FOOTER

==================================================

Brand:

YojnaSetu

Tagline:

"Connecting People with Opportunities."

Description:

"YojnaSetu helps people discover and understand government schemes through simplified information and personalized scheme discovery."

Quick Links:

- Home

- Explore Schemes

- Eligibility Checker

- Categories

- Resources

- About

Legal:

- Privacy Policy

- Terms of Use

- Disclaimer

Disclaimer:

"YojnaSetu is an independent information and discovery platform and is not a government website. Scheme information may change over time. Users should verify eligibility, benefits, deadlines, and application procedures through the respective official government websites before applying."

==================================================

FINAL INSTRUCTIONS

==================================================

Build this application in a clean, scalable and maintainable way.

Prioritize:

1. Modern premium UI

2. Excellent user experience

3. Mobile-first responsiveness

4. Eligibility checker as the main conversion feature

5. Real authentication

6. Secure user data

7. SEO

8. Accessibility

9. Performance

Do not use Lorem Ipsum.

Use the actual content provided in this prompt.

Do not fabricate government scheme information.

Use clearly labeled demo data until verified scheme data is connected.

Create proper:

- Loading states

- Error states

- Empty states

- Success messages

- Form validation

Start by creating the complete project structure, reusable UI components, design system, navigation, and Home page.

Then build the Eligibility Checker and Results Page.

After that, implement Authentication, Database, User Dashboard, Explore Schemes, and Scheme Details pages.

Keep all components visually consistent and make the website feel like one premium modern product. kindly generate the website on the above code and for the ui you can take the refrence of the above mentioned picture but dont just follow that you can add your own creativity into it and make the website

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/33bb16ab-164b-4bea-b079-baaa376816f8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
