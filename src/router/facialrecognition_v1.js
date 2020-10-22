import Full from 'Container/Full'

// dashboard components
const Ecommerce = () => import('Views/dashboard/Ecommerce');
const Dashboard_DetectionLogs = () => import('Views/dashboard/FR-Detection-Logs');
const Visitors_Report_V01 = () => import('Views/dashboard/Visitors-Report');
const Visitors_Report_V02 = () => import('Views/dashboard/Visitors-Report-V1');
const Visitors_Report_V03 = () => import('Views/dashboard/Visitors-Report-V2');
const Visitors_Report_V05 = () => import('Views/dashboard/Visitors-Report-V4');
const General_Dashboard_V01 = () => import('Views/dashboard/General');
const General_Dashboard_V02 = () => import('Views/dashboard/General-V1');
const General_Dashboard = () => import('Views/dashboard/General-V2');
const Dashboard = () => import('Views/dashboard/Dashboard');
const Temperatures_Report_V01 = () => import('Views/dashboard/Temperatures-Report');
const Temperatures_Report = () => import('Views/dashboard/Temperatures-Report-V1');
const Temperature_Statistics = () => import('Views/dashboard/Temperature-Statistics');
const Visitors_Report_V04 = () => import('Views/dashboard/Visitors-Report-V3');
const Visitors_Statistics = () => import('Views/dashboard/Visitor-Statistics');

const Users_List = () => import('Views/fr-users/Users');

const Report = () => import('Views/fr-reports/Reports');
const DeviceManagement = () => import('Views/fr-devices/DeviceManagement');
const BlockManagement = () => import('Views/fr-blocks/BlockManagement');
const CompanyManagement = () => import('Views/fr-companies/CompanyManagement');
const FloorManagement = () => import('Views/fr-floors/FloorManagement');
const SiteManagement = () => import('Views/fr-sites/SiteManagement');



//Modules
const DetectionLogs_V0 = () => import('Views/fr-detection-logs/DetectionLogs');
const DetectionLogs = () => import('Views/fr-detection-logs/DetectionLogs-V1');

// Views/fr-detection-logs/Detection-Logs

export default {
  path: '/',
  component: Full,
  redirect: '/default/dashboard/dashboard.html',
  
  children: [
    //Dashboard
    {
      path: '/default/dashboard/dashboard.html',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        title: 'message.dashboard',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //General dashboard
    // V01
    {
      path: '/default/dashboard/general-dashboard-v01.html',
      component: General_Dashboard_V01,
      meta: {
        requiresAuth: true,
        title: 'message.generalDashboard',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'General'
          }
        ]
      }
    },
    // V02
    {
      path: '/default/dashboard/general-dashboard-v02.html',
      component: General_Dashboard_V02,
      meta: {
        requiresAuth: true,
        title: 'message.generalDashboard',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'General'
          }
        ]
      }
    },
    // ---
    {
      path: '/default/dashboard/general-dashboard.html',
      component: General_Dashboard,
      meta: {
        requiresAuth: true,
        title: 'message.generalDashboard',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'General'
          }
        ]
      }
    },
    //E-Commerce
    { 
      path: '/default/dashboard/ecommerce',
      component: Ecommerce,
      meta: {
        requiresAuth: true,
        title: 'message.ecommerce',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'E-Commerce'
          }
        ]
      }
    },
    {
      //Dashboard Detection Logs
      path: '/default/dashboard/detection-logs.html',
      component: Dashboard_DetectionLogs,
      meta: {
        requiresAuth: true,
        title: 'message.detectionLogs',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Detection Logs'
          }
        ]
      }
    },
    //Visitors Statistics V0
    {
      path: '/default/dashboard/visitor-statistics.html',
      component: Visitors_Statistics,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitor Statistics'
          }
        ]
      }
    },
    //Visitors Reports V0.4
    {
      path: '/default/dashboard/visitors-report-v04.html',
      component: Visitors_Report_V05,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitors Report'
          }
        ]
      }
    },
    //Visitors Reports V0.3
    {
      path: '/default/dashboard/visitors-report.html',
      component: Visitors_Report_V04,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitors Report'
          }
        ]
      }
    },
    //Visitors Reports V0.2
    {
      path: '/default/dashboard/visitors-report-v02.html',
      component: Visitors_Report_V03,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitors Report'
          }
        ]
      }
    },
    //Visitors Reports V0.1
    {
      path: '/default/dashboard/visitors-report-v01.html',
      component: Visitors_Report_V02,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitors Report'
          }
        ]
      }
    },
    //Visitors Reports V0
    {
      path: '/default/dashboard/visitors-report-v0.html',
      component: Visitors_Report_V01,
      meta: {
        requiresAuth: true,
        title: 'message.visitorsReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Visitors Report'
          }
        ]
      }
    },
    //Temperatures Reports V
    {
      path: '/default/dashboard/temperatures-report-V01.html',
      component: Temperatures_Report_V01,
      meta: {
        requiresAuth: true,
        title: 'message.temperaturesReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Temperatures Report'
          }
        ]
      }
    },
    //Temperatures Reports V1
    {
      path: '/default/dashboard/temperatures-report.html',
      component: Temperatures_Report,
      meta: {
        requiresAuth: true,
        title: 'message.temperaturesReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Temperatures Report'
          }
        ]
      }
    },
    //Temperature Statistics
    {
      path: '/default/dashboard/temperature-statistics.html',
      component: Temperature_Statistics,
      meta: {
        requiresAuth: true,
        title: 'message.temperaturesReport',
        breadcrumb: [
          {
            breadcrumbInactive: 'Dashboard /'
          },
          {
            breadcrumbActive: 'Temperature Statistics'
          }
        ]
      }
    },
    //Users List
    {
      path: '/default/users/user-list.html',
      component: Users_List,
      meta: {
        requiresAuth: true,
        title: 'message.usersList',
        breadcrumb: [
          {
            breadcrumbInactive: 'Users /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Detection Logs
    {
      path: '/default/users/detection-logs-v0.html',
      component: DetectionLogs_V0,
      meta: {
        requiresAuth: true,
        title: 'message.detectionLogs',
        breadcrumb: [
          {
            breadcrumbInactive: 'Detection Logs /'
          },
          {
            breadcrumbActive: 'Logs'
          }
        ]
      }
    },
    {
      path: '/default/detection-logs.html',
      component: DetectionLogs,
      meta: {
        requiresAuth: true,
        title: 'message.detectionLogs',
        breadcrumb: [
          {
            breadcrumbInactive: 'Detection Logs /'
          },
          {
            breadcrumbActive: 'Logs'
          }
        ]
      }
    },
    //Reports
    {
      path: '/default/reports.html',
      component: Report,
      meta: {
        requiresAuth: true,
        title: 'message.report',
        breadcrumb: [
          {
            breadcrumbInactive: 'Reports /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Device Management
    {
      path: '/default/device-management.html',
      component: DeviceManagement,
      meta: {
        requiresAuth: true,
        title: 'message.deviceManagement',
        breadcrumb: [
          {
            breadcrumbInactive: 'Device Management /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Block Management
    {
      path: '/default/block-management.html',
      component: BlockManagement,
      meta: {
        requiresAuth: true,
        title: 'message.blockManagement',
        breadcrumb: [
          {
            breadcrumbInactive: 'Block Management /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Company Management
    {
      path: '/default/company-management.html',
      component: CompanyManagement,
      meta: {
        requiresAuth: true,
        title: 'message.companyManagement',
        breadcrumb: [
          {
            breadcrumbInactive: 'Company Management /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Floor Management
    {
      path: '/default/floor-management.html',
      component: FloorManagement,
      meta: {
        requiresAuth: true,
        title: 'message.floorManagement',
        breadcrumb: [
          {
            breadcrumbInactive: 'Floor Management /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
    //Site Management
    {
      path: '/default/site-management.html',
      component: SiteManagement,
      meta: {
        requiresAuth: true,
        title: 'message.siteManagement',
        breadcrumb: [
          {
            breadcrumbInactive: 'Site Management /'
          },
          {
            breadcrumbActive: 'Main'
          }
        ]
      }
    },
  ]
}
