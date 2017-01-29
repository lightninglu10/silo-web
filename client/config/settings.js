/**
* lit.fm
* Ok so this is the place where we declare global constants
* author: @patr
*/

export const SENDBIRD_ID = '38A84AB5-888C-444B-801B-43C980746379';

// Maximum allowed slots per room
export const TOTAL_AVAILABLE_SLOTS = 9;

// Window title
export const TITLE = 'Nando - Stay connected with your team';

/**
* Stripe API key
*/
export const STRIPE_API_KEY = (process.env.NODE_ENV === 'development') ? 'pk_test_6qTDu027zeUYCD96K30gdTON' : 'pk_live_A6q4CrX0iGQcOizbDGY6zCcE';

// Facebook app ID
export const FACEBOOK_APP_ID = (process.env.NODE_ENV === 'development') ? '722313164591334' : '233015053797086';