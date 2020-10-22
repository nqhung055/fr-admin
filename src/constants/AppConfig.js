/**
 * App Config File
 */
export default {
	appLogo: '/static/img/site-logo.png',                                   // App Logo,
	appFRLogo: '/static/img/fr-site-logo.png',                              // App FR Logo,
	darkLogo: '/static/img/site-dark-logo.png',							    // dark logo
	appLogo2: '/static/img/session.png',                                    // App Logo 2 For Login & Signup Page
	appFRLogo2: '/static/img/fr-session.png',                                    // App Logo 2 For Login & Signup Page
	brand: 'Admintrator',                                        			// Brand Name
	copyrightText: 'Truvisor © 2020 All Rights Reserved.',                  // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
	weatherApiId: 'b1b15e88fa797225412429c1c50c122a1',						// weather API Id
	weatherApiKey: '69b72ed255ce5efad910bd946685883a',						// weather APi key
	ip: 'http://18.136.142.61',
	ws: 'ws://18.136.142.61',
	gw_port:':5566',
	ws_port:':7788',
	api_port:':8081',
}
