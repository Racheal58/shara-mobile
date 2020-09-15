echo "/* eslint-disable import/prefer-default-export */

const ENVIRONMENT = '$1';
const CLOUDINARY_CLOUDNAME = '$2';
const CLOUDINARY_URL = '$3';
const CLOUDINARY_API_KEY = '$4';
const CLOUDINARY_API_SECRET = '$5';
const CLOUDINARY_API_URL = '$6';
const CLOUDINARY_API_URL_STRING = '$7';

const TEST_USER_EMAIL = '$8';
const TEST_USER_PASSWORD = '$9';

const LOCAL_API_URL = '${10}';
const DEV_API_URL = '${11}';
const STAGING_API_URL = '${12}';
const PROD_API_URL = '${13}';

export {
  ENVIRONMENT,
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_URL,
  CLOUDINARY_API_URL_STRING,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
  LOCAL_API_URL,
  DEV_API_URL,
  STAGING_API_URL,
  PROD_API_URL,
};
" > ./env/env.js

yes | EXPO_APPLE_PASSWORD=${15} expo build:ios  --no-publish --non-interactive --apple-id ${14} > output.ios.txt
tail -n 1 output.ios.txt | head -n 1 | cut -c47- | xargs wget -O build.ipa
xcrun altool --upload-app -f ./build.ipa -t ios -u ${14} -p ${15}