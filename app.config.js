module.exports = {
  expo: {
    name: "WireTrace AI",
    slug: "wiretrace-ai",
    owner: "vjpisme",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#0A0A0F",
    },
    ios: {
      supportsTablet: true,
      // App Store Connect rejects a re-upload at the same build number, so this
      // has to move for every upload even when `version` stays put.
      buildNumber: "3",
      bundleIdentifier: "com.vjpisme-wiretrace",
      infoPlist: {
        NSCameraUsageDescription:
          "WireTrace AI needs camera access to photograph wire schematics for analysis.",
        NSPhotoLibraryUsageDescription:
          "WireTrace AI needs photo library access to import wire schematic images for analysis.",
        NSSpeechRecognitionUsageDescription:
          "Allow $(PRODUCT_NAME) to use speech recognition.",
        NSMicrophoneUsageDescription:
          "Allow $(PRODUCT_NAME) to use the microphone.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.vjpisme_wiretrace",
      versionCode: 14,
      // Schematics arrive through the system photo picker and the document
      // picker, both of which grant access to the one file the user chose.
      // Neither needs a storage permission, and asking for one puts the app
      // in front of Play's photo-and-video policy review for nothing.
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
      ],
      // Libraries declare these in their own manifests, so dropping them from
      // the list above is not enough to keep them out of the merged manifest.
      blockedPermissions: [
        "android.permission.READ_MEDIA_IMAGES",
        "android.permission.READ_MEDIA_VIDEO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        // React Native declares this in its debug-only manifest for the dev
        // overlay; it drifted into the main manifest and has been shipping in
        // release builds ever since.
        "android.permission.SYSTEM_ALERT_WINDOW",
      ],
    },
    web: {
      favicon: "./assets/images/icon.png",
      bundler: "metro",
    },
    plugins: [
      // expo-speech-recognition's podspec requires iOS 16.4, and app/analyze.tsx
      // and app/reader.tsx import it at module scope — below 16.4 autolinking
      // silently drops the pod and both screens fail to load. The floor has to
      // match the dependency, not the other way round.
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "16.4",
          },
        },
      ],
      "expo-font",
      "expo-router",
      "expo-web-browser",
      "expo-secure-store",
      "expo-camera",
      "expo-speech-recognition",
      [
        "expo-image-picker",
        {
          photosPermission:
            "WireTrace AI needs photo library access to import wire schematic images for analysis.",
          cameraPermission:
            "WireTrace AI needs camera access to photograph wire schematics for analysis.",
        },
      ],
      "@react-native-community/datetimepicker",
    ],
    scheme: "wiretraceai",
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "227c64f5-68a5-46e2-ab10-60823a4a8bae",
      },
    },
  },
};
