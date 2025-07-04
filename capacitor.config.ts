import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.683b96a533a4423695c2dc2b96e8a0ff',
  appName: 'CardConnect - Digital Business Cards',
  webDir: 'dist',
  server: {
    url: 'https://683b96a5-33a4-4236-95c2-dc2b96e8a0ff.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#667eea'
    }
  }
};

export default config;