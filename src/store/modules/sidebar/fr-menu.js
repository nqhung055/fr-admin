// Sidebar Routers
export const menus = {
	"":[
			{
				action: "zmdi-view-dashboard",
				// hiddenOnCollapse: true,
				// header: true,
				title: "message.dashboard",
				path: '/dashboard/dashboard.html',
				active: true,
				label: "Old"
			},
			{
				action: "zmdi zmdi-account",
				title: "message.users",
				path: "/default/users/user-list.html",
				label: "Old",
				exact: true,
				active: false
			},
			{
				action: "zmdi zmdi-broken-image",
				title: "message.report",
				path: "/default/reports.html",
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-camera-front",
				title: "message.deviceManagement",
				path: '/default/device-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-city-alt",
				title: "message.blockManagement",
				path: '/default/block-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-city",
				title: "message.companyManagement",
				path: '/default/company-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-blur-linear",
				title: "message.floorManagement",
				path: '/default/floor-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-blur",
				title: "message.siteManagement",
				path: '/default/site-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
	],
};
