# Accuracy review

Review date: **2026-08-14**  
Status: **Foundation approved for study; refresh regulatory sources near the exam date.**

## Independent source pass

- Exam administration was checked against both [FINRA's Series 3 page](https://www.finra.org/registration-exams-ce/qualification-exams/series3) and the [NFA futures-industry exam outline](https://www.nfa.futures.org/registration-membership/study-outlines/index.html): 120 scored questions, 2 hours 30 minutes, and 70% required on each part. NFA also states that five additional experimental questions do not count toward the grade.
- Passing the examination was kept distinct from registration by checking [NFA proficiency requirements](https://www.nfa.futures.org/registration-membership/how-to-register/proficiency-requirements.html).
- Contract purpose, clearing, offset, settlement, margin, marking to market, leverage, hedging, and customer-risk language were checked against [CFTC Futures Market Basics](https://www.cftc.gov/LearnAndProtect/EducationCenter/FuturesMarketBasics/index2.htm), the [CFTC economic-purpose explainer](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/economicpurpose.html), and [CME's Introduction to Futures](https://www.cmegroup.com/education/courses/introduction-to-futures).
- Options rights, obligations, premium, expiration value, and strategy payoffs were checked against the [CFTC glossary](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CFTCGlossary/index.htm), [CME's options introduction](https://www.cmegroup.com/education/courses/cme-institute-live/chapter-1-introduction-to-cme-group-and-fundamentals-of-financial-futures-and-options/introduction-to-options), and [CME option strategies](https://www.cmegroup.com/education/courses/option-strategies).
- Registrant roles, Rules 2-4, 2-9, 2-13, 2-29, and 2-30, customer funds, disclosures, supervision, position reporting, arbitration, and discipline were checked against the current [NFA Rulebook](https://www.nfa.futures.org/rulebooksql/rules.aspx) and the official Series 3 outline.
- Federal position-limit purpose, aggregation, and hedge-exemption framing were checked against the [CFTC position-limits overview](https://www.cftc.gov/IndustryOversight/MarketSurveillance/SpeculativeLimits/speculativelimits.html).

## Calculation pass

The verifier independently recomputes fixed examples for:

- Tick value and long/short futures profit or loss
- Margin equity and restore-to-initial margin calls
- Basis level and strengthening/weakening direction
- Short- and long-hedge effective prices
- Call and put intrinsic value, time value, breakeven, and profit
- Bull/bear vertical-spread maximum gain and loss
- Futures interdelivery-spread leg results

It also validates the generated assessment data: 24 diagnostic questions, six 9-question module checks, 60 cumulative questions, and two 120-question timed forms with separately scored sections.

## Deliberate qualifications

- Examples use fictional specifications stated inside each problem. Contract units, quote conventions, ticks, position limits, price limits, delivery rules, settlement, margin, and supported order types are not universal.
- The two readiness forms use an 85 market / 35 regulation **study allocation**. The public FINRA and NFA pages verify the 120 scored total and separate-part passing rule but do not publish that section allocation, so the course does not describe it as an official current weighting.
- Registrant definitions and regulatory requirements can have exclusions, exemptions, and fact-specific conditions. Reference matrices are memory aids; current rules and qualified compliance/legal guidance control real conduct.
- The course uses original practice questions. It does not claim to reproduce actual or recalled exam questions.

## Verification record

Run `npm run check` to rebuild and repeat the structural, coverage, arithmetic, link, citation, responsive-layout, and print checks. The completed build passed those automated checks and a browser review at desktop and mobile widths.
