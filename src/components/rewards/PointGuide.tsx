import { Card } from '@nextui-org/react';

const PointGuide = () => {
  return (
    <Card className="flex flex-col items-center gap-12 p-8 text-primary">
      <p className="text-2xl text-center">Earn Points and Unlock Rewards Effortlessly</p>
      <div className="grid xl:grid-cols-2 gap-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 bg-secondary rounded-full font-semibold">
              1
            </span>
            <p className="text-xl font-medium">Deposit and Earn</p>
          </div>
          <p className="text-primary opacity-70">
            For every $100 deposited within an hour, you earn 1 point. It&apos;s that simple! Keep
            depositing to accumulate more points and enjoy exclusive benefits.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 bg-secondary rounded-full font-semibold">
              2
            </span>
            <p className="text-xl font-medium">Invite Friends and Get Bonus Points</p>
          </div>
          <p className="text-primary opacity-70">
            Share the love! Invite a friend to join our community. When your friend deposits $100
            within an hour, you earn an additional 0.1 point as a referral bonus. Watch your points
            grow as your network expands!
          </p>
        </div>
      </div>
      <p className="text-lg font-medium text-center">
        Start earning points today and unlock amazing rewards. Happy depositing and inviting!
      </p>
    </Card>
  );
};

export default PointGuide;
