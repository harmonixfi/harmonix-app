declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: 'development' | 'production';
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_W3C_PROJECT_ID: string;
      NEXT_PUBLIC_USDC_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS: `0x${string}`;
    }
  }
}

export {};
