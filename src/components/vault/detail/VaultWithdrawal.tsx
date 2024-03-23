import Typography from '@/components/shared/Typography';

const VaultWithdrawal = () => {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="subtitle">Withdrawals</Typography>
      <Typography variant="body">
        Once user funds have been used in the vault’s weekly strategy they cannot be withdrawn until
        the vault closes it’s position the following Friday at 8am UTC.
      </Typography>
      <Typography variant="body">
        The process of withdrawing funds from RockOnyx is simple and flexible. Users can choose to
        withdraw their funds at any time by initiating a withdraw request on the website. When the
        options expiry date arrives, we will automatically close the options positions and transfer
        the user’s fund back to the vault. Then, the user can claim their fund from the RockOnyx
        website at their convenience.
      </Typography>
    </div>
  );
};

export default VaultWithdrawal;
