// All the credentials that the user has
const scopes = [
    "files.readwrite", 
    "offline_access"
].join(',')

const params = {
    scope:scopes
};


// Creates a search url with the params
const querryParamsString = new URLSearchParams(params);

const clientId = process.env.AZURE_AD_CLIENT_ID
const redirectUri = process.env.AZURE_AD_REDIRECT_URI

export const ONE_DRIVE_LOGIN_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&scope=${querryParamsString}
&response_type=token&redirect_uri=${redirectUri}`