'use client';

import { BookmarkSquareIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem, Card } from '@nextui-org/react';

const ReferralGuide = () => {
  return (
    <Card className="flex flex-col items-center gap-12 p-8 2xl:p-12 text-primary">
      <p className="text-2xl font-medium text-center">
        Share Harmonix and earn up to 8% commission
      </p>
      <div className="flex flex-col gap-12">
        <div className="flex gap-3 sm:gap-6">
          <span className="relative w-12 h-12 sm:w-16 sm:h-16 bg-secondary rounded-full shrink-0">
            <PaperAirplaneIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8" />
          </span>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Standard referral rate</p>
            <p className="text-gray-500">
              Earn <span className="text-primary font-semibold">5%</span> commission on all
              qualifying deposits made by users you refer using your referral link.
            </p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-6">
          <span className="relative w-12 h-12 sm:w-16 sm:h-16 bg-secondary rounded-full shrink-0">
            <BookmarkSquareIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8" />
          </span>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Special treats for early adopters</p>

            <p className="text-gray-500">
              The first <span className="text-primary font-semibold">101</span> referral links
              ENABLED (activated by the referred user depositing a minimum of{' '}
              <span className="text-primary font-semibold">$50</span> into Harmonix across any
              vaults) will receive an increased commission of{' '}
              <span className="text-primary font-semibold">8%</span>
            </p>
            <p className="text-gray-500">
              The <span className="text-primary font-semibold">8%</span> commission rate applies for
              the initial <span className="text-primary font-semibold">90</span> days from the date
              the referral link is enabled. After this period, the commission rate reverts to the
              standard <span className="text-primary font-semibold">5%</span>
            </p>
          </div>
        </div>

        <Accordion
          selectionMode="multiple"
          itemClasses={{
            trigger: 'py-2',
            title: 'text-base text-primary font-medium',
            content: 'text-base text-opacity-80 text-primary mb-6',
          }}
        >
          <AccordionItem key="1" aria-label="Activation requirement" title="Activation requirement">
            Referral links must be used by new users for eligibility.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Terms and conditions apply"
            title="Terms and conditions apply"
          >
            Harmonix reserves the right to modify or terminate this program at any time.
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};

export default ReferralGuide;
