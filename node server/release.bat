cd  C:/Users/arama/Documents/WebStormProjects/nsbapp
ionic build --release
cd platforms/android/build/outputs/apk/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore nsbapp.keystore android-release-unsigned.apk NSBApp
zipalign -v 4 android-release-unsigned.apk release.apk

exit

gulp -b &  code-push release-cordova NSBApp android
code-push promote NSBApp Staging Production