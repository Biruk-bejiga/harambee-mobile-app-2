# EAS Build Guide for Harambee Student Portal

## Prerequisites

1. **Expo Account**: Create a free account at https://expo.dev
2. **EAS CLI**: Install globally (currently installing...)
   ```bash
   npm install -g eas-cli
   ```

## Step-by-Step Build Process

### 1. Login to EAS

```bash
eas login
```

Enter your Expo account credentials.

### 2. Configure EAS Project

```bash
eas build:configure
```

This will:
- Link your project to your Expo account
- Generate a project ID
- Update `app.json` with the project ID

### 3. Build for Android (APK)

For a preview/testing build:
```bash
eas build --platform android --profile preview
```

For a production build:
```bash
eas build --platform android --profile production
```

**What happens:**
- EAS will build your app in the cloud
- You'll get a download link for the APK file
- Build typically takes 10-20 minutes

### 4. Build for iOS (Optional - requires Apple Developer account)

```bash
eas build --platform ios --profile production
```

**Note**: iOS builds require:
- Apple Developer account ($99/year)
- Valid certificates and provisioning profiles

### 5. Download and Install

Once the build completes:
1. You'll receive a download link
2. Download the APK file
3. Transfer to your Android device
4. Enable "Install from Unknown Sources" in Android settings
5. Install the APK

## Build Profiles Explained

### Development
- For testing with Expo Go
- Includes development tools
- Larger file size

### Preview
- Internal testing build
- APK format (easy to share)
- No app store submission
- **Recommended for testing**

### Production
- Optimized for app stores
- Smaller file size
- Ready for Google Play Store / Apple App Store

## Environment Variables

Your `.env` file contains sensitive data (Supabase credentials). 

**For EAS builds, you need to add secrets:**

```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "your-supabase-url"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-anon-key"
```

## Common Commands

### Check build status
```bash
eas build:list
```

### View build logs
```bash
eas build:view
```

### Cancel a build
```bash
eas build:cancel
```

## Troubleshooting

### Build fails with "credentials" error
- Run: `eas credentials`
- Follow prompts to set up Android keystore

### Build fails with "dependencies" error
- Ensure all packages are compatible
- Run: `npm install` locally first
- Check for any errors

### APK won't install on device
- Enable "Install from Unknown Sources"
- Check Android version compatibility (minimum SDK 21)

## Publishing to Google Play Store

1. Build with production profile:
   ```bash
   eas build --platform android --profile production
   ```

2. Submit to Google Play:
   ```bash
   eas submit --platform android
   ```

3. Follow prompts to upload to Google Play Console

## Publishing to Apple App Store

1. Build with production profile:
   ```bash
   eas build --platform ios --profile production
   ```

2. Submit to App Store:
   ```bash
   eas submit --platform ios
   ```

## Quick Start (Recommended)

For your first build, I recommend:

```bash
# 1. Login
eas login

# 2. Configure project
eas build:configure

# 3. Build Android APK for testing
eas build --platform android --profile preview

# 4. Wait for build to complete (10-20 minutes)
# 5. Download APK from the link provided
# 6. Install on your Android device
```

## Build Configuration Files

- `eas.json` - Build profiles and configuration
- `app.json` - App metadata and settings
- `.env` - Environment variables (not included in git)

## Next Steps After Build

1. **Test the APK** on multiple Android devices
2. **Gather feedback** from users
3. **Fix any bugs** found during testing
4. **Build production version** when ready
5. **Submit to Google Play Store**

## Support

- EAS Documentation: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/
- Discord: https://chat.expo.dev/

## Estimated Costs

- **EAS Build**: Free tier includes limited builds/month
- **Paid plans**: Start at $29/month for unlimited builds
- **Google Play**: $25 one-time registration fee
- **Apple App Store**: $99/year developer account

---

**Ready to build?** Run the commands above to create your first build! 🚀
