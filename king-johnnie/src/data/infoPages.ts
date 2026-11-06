export interface InfoPage {
  slug: string;
  title: string;
  sections: string[];
  /** last-updated label shown in the doc meta row */
  updated: string;
}

/**
 * Section titles are ported from the prototype. Body copy is generated per
 * section at render time (placeholder legal/informational text). Wire the real
 * CMS content through `services/content.ts` -> getInfoPage().
 */
export const INFO_PAGES: Record<string, InfoPage> = {
  terms: {
    slug: 'terms',
    title: 'Terms & Conditions',
    updated: 'Updated 1 Nov 2026',
    sections: ['Introduction', 'Eligibility', 'Your account', 'Deposits & withdrawals', 'Bonuses & promotions', 'Responsible gaming', 'Complaints', 'Changes to these terms'],
  },
  responsible: {
    slug: 'responsible',
    title: 'Responsible Gaming',
    updated: 'Updated 1 Nov 2026',
    sections: ['Our commitment', 'Signs of problem gambling', 'Tools to stay in control', 'Self-exclusion', 'Getting help', 'Underage gambling'],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: 'Updated 1 Nov 2026',
    sections: ['What we collect', 'How we use it', 'Sharing', 'Cookies', 'Your rights', 'Contact'],
  },
  about: {
    slug: 'about',
    title: 'About King Johnnie',
    updated: 'Updated 1 Nov 2026',
    sections: ['Welcome to Spin City', "What's on the map", 'Licensing', 'Contact'],
  },
  faq: {
    slug: 'faq',
    title: 'Casino FAQs',
    updated: 'Updated 1 Nov 2026',
    sections: ['Account', 'Deposits', 'Withdrawals', 'Bonuses', 'Games', 'Technical'],
  },
  promoterms: {
    slug: 'promoterms',
    title: 'Promotion T&Cs',
    updated: 'Updated 1 Nov 2026',
    sections: ['General', 'Wagering requirements', 'Eligible games', 'Maximum bet', 'Expiry'],
  },
  banking: {
    slug: 'banking',
    title: 'Banking',
    updated: 'Updated 1 Nov 2026',
    sections: ['Deposit methods', 'Withdrawal methods', 'Processing times', 'Verification'],
  },
};

export const FOOTER_LINKS: Array<{ slug: string; label: string }> = [
  { slug: 'about', label: 'About us' },
  { slug: 'terms', label: 'Terms & Conditions' },
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'responsible', label: 'Responsible Gaming' },
  { slug: 'banking', label: 'Banking' },
  { slug: 'faq', label: 'FAQs' },
  { slug: 'promoterms', label: 'Promotion T&Cs' },
];

/** Deterministic placeholder paragraph for a section until the CMS is wired. */
export function sectionBody(page: string, section: string): string {
  return (
    `This section covers "${section}" for King Johnnie. ` +
    `Replace this placeholder with the live copy served from your CMS via ` +
    `getInfoPage('${page}'). King Johnnie is operated under licence and is ` +
    `committed to fair play, secure banking and responsible gaming for all players 18+.`
  );
}
