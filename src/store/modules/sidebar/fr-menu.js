// Sidebar Routers
export const menus = {
	"": [
			{
				action: "zmdi-view-dashboard",
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
				action: "zmdi zmdi-account",
				title: "message.report",
				path: "/default/users/reports.html",
				label: "Old",
				exact: true,
				active: false,
			},
			{
				action: "zmdi zmdi-account",
				title: "message.deviceManagement",
				path: '/default/users/device-management.html',
				label: "Old",
				exact: true,
				active: false,
			},
	],
};
