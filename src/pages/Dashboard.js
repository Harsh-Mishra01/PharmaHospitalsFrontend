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
import "../stylesheet/Dashboard.css";
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

// Customizing DashboardLayout to hide the theme switcher
const CustomDashboardLayout = styled(DashboardLayout)(({ theme }) => ({
  ".MuiThemeSwitcher-root": {
    display: "none", // Hides the theme switcher
  },
  // Include additional class names if necessary
  ".css-1ozwjt9-MuiThemeSwitcher-root": {
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
    } else if (pathname === "/insights") {
      return <Insights />;
    }
    return <InnerDashboard />;
  }
 const logo = localStorage.getItem("logo")
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: <img src={ logo} alt="Microbabs logo" />,
        title: "MicroLabs",
        color: "#A19EC9",
      }}
      router={router}
      theme={demoTheme}
    >
      <CustomDashboardLayout >
        <DemoPageContent
          pathname={router.pathname}
          navigate={router.navigate}
        />
      </CustomDashboardLayout>
    </AppProvider>
  );
}
