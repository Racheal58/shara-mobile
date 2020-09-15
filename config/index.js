/* eslint-disable import/prefer-default-export */

import {
  ENVIRONMENT,
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_URL,
  CLOUDINARY_FOLDER_NAME,
  UNSIGNED_UPLOAD_PRESET,
  LOCAL_API_URL,
  DEV_API_URL,
  STAGING_API_URL,
  PROD_API_URL,
} from '../env/env';

const commonConfig = {
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_URL,
  CLOUDINARY_FOLDER_NAME,
  UNSIGNED_UPLOAD_PRESET,
};

const config = {
  local: {
    ...commonConfig,
    API_URL: LOCAL_API_URL,
  },
  development: {
    ...commonConfig,
    API_URL: DEV_API_URL,
  },
  staging: {
    ...commonConfig,
    API_URL: STAGING_API_URL,
  },
  production: {
    ...commonConfig,
    API_URL: PROD_API_URL,
  },
};

export default config[ENVIRONMENT];
