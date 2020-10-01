// Sidebar Routers
export const menus = {
	"": [
		{
			action: "zmdi-view-dashboard",
			title: "message.dashboard",
			active: true,
			label: "New",
			items: [
				/* { title: 'message.detectionLogs', path: '/default/dashboard/detection-logs.html', label: 'New', exact: true }, */
				{
					title: "message.general",
					path: "/default/dashboard/general-dashboard.html",
					label: "New",
					exact: true,
					active: true,
				},				
				{
					title: "message.visitorsReport",
					// path: "/default/dashboard/visitors-report.html",
					path: "/default/dashboard/visitor-statistics.html",
					label: "New",
					exact: true,
					active: false,
				},
				{
					title: "message.temperaturesReport",
					path: "/default/dashboard/temperature-statistics.html",
					label: "New",
					exact: true,
					active: false,
				},
				// { title: 'message.ecommerce', path: '/default/dashboard/ecommerce', exact: true, label: 'Old' }
			],
		},
		{
			action: "zmdi zmdi-account",
			title: "message.users",
			active: false,
			items: [
				{
					title: "message.usersList",
					path: "/default/users/user-list.html",
					label: "Old",
					exact: true,
					active: true,
				},
				{
					title: "message.detectionLogs",
					path: "/default/users/detection-logs.html",
					label: "New",
					exact: true,
					active: false,
				},
				//
			],
		},
	],
};
