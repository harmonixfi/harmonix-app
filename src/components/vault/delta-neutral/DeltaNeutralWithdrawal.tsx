import Typography from '@/components/shared/Typography';

const DeltaNeutralWithdrawal = () => {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="subtitle">Withdrawals</Typography>

      <Typography variant="body">
        Upon utilization of user funds in spot and perpetual trading on DEX, there is a necessary
        period for withdrawing funds from our vendor.
      </Typography>
      <Typography variant="body">
        The withdrawal process from RockOnyx is straightforward and adaptable. Users have the option
        to initiate a withdrawal request on the website at their convenience. Once your request is
        received, we will promptly trigger the withdrawal of funds from the vendor. This process may
        take several minutes or hours. After the funds have been successfully withdrawn from the
        vendor and transferred back to the vault, users can then claim their funds from the RockOnyx
        website.
      </Typography>
    </div>
  );
};

export default DeltaNeutralWithdrawal;
