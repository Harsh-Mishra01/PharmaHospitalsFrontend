import * as React from "react";
import { experimental_extendTheme as extendTheme, styled } from "@mui/material/styles"; // updated import
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import "../stylesheet/Dashboard.css";
import DocReport from "./Doc-Report";
import InnerDashboard from "./InnerDashboard";
import { useNavigate } from "react-router-dom";
import "../stylesheet/Dashboard.css"
import Insights from "./Insights";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  
  {
    segment: "DocReport",
    title: "Doc-Report",
    icon: <BackupTableIcon />,
  },
  {
    segment: "insights",
    title: "Insights",
    icon: <BarChartIcon />,
  },
  // {
  //   segment: "matrics",
  //   title: "Matrics",
  //   icon: <LayersIcon />,
  // },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Profiles",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Matrics",
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );
  return router;
}

const CustomDashboardLayout = styled(DashboardLayout)(({ theme }) => ({
  ".css-1je49cu-MuiTypography-root": {
    display: "none",
  },
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [searchQuery, setSearchQuery] = React.useState("");

  const [session, setSession] = React.useState({
    user: {
      name: localStorage.getItem("user"),
      email: localStorage.getItem("username"),
      image: localStorage.getItem("logo"),
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: localStorage.getItem("user"),
            email: localStorage.getItem("username"),
            image: localStorage.getItem("logo"),
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("username");
        localStorage.removeItem("psw");
        navigate("/");
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");

  const navigate = useNavigate();

  function DemoPageContent({ pathname, navigate }) {
    if (pathname === "/dashboard") {
      return <InnerDashboard />;
    } else if (pathname === "/DocReport") {
      return <DocReport />;
    }  else if (pathname === "/insights") {
      return <Insights/>;
    }
    return <InnerDashboard />;
  }
  const CustomDashboardLayout = styled(DashboardLayout)(({ theme }) => ({
    ".MuiThemeSwitcher-root": {
      display: "none", // Hides the theme switcher
    },
  }));
  

  return (
    <AppProvider
    session={session}
    authentication={authentication}
    navigation={NAVIGATION}
    branding={{
      logo: <img src="https://indiancattle.com/wp-content/uploads/2017/08/logo-10.png" alt="Microbabs logo" />,
      title: "MicroLabs",
      color: "#A19EC9",
    }}
    router={router}
    theme={demoTheme}
  >
    <CustomDashboardLayout>
      <DemoPageContent
        pathname={router.pathname}
        navigate={router.navigate}
      />
    </CustomDashboardLayout>
  </AppProvider>
  
  );
};
