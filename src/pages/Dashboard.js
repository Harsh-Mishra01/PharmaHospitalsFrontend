import * as React from "react";
import { experimental_extendTheme as extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { TbMessageStar } from "react-icons/tb";

import "../stylesheet/Dashboard.css";
import DocReport from "./Doc-Report";
import InnerDashboard from "./InnerDashboard";
import { useNavigate } from "react-router-dom";
import Insights from "./Insights";

import Review from "./Review";
import RatingDashboard from "../components/RatingDashboard";
import Post from "./Post";

const logo = localStorage.getItem("logo");
const logo2 = localStorage.getItem("logo2");

const username = localStorage.getItem('username')

const prefix = username === "piindustries@gmail.com" ? "Shop-Report" : "Doc-Report"

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
    title: prefix,
    icon: <BackupTableIcon />,
  },
  {
    segment: "insights",
    title: "Insights",
    icon: <BarChartIcon />,
  },
  {
    segment: "review",
    title: "Review Management",
    icon: <TbMessageStar className="text-2xl" />,
  },
  {
    segment: "post",
    title: "Update Post",
    icon: <TbMessageStar className="text-2xl" />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: false },
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

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [searchQuery, setSearchQuery] = React.useState("");

  const navigate = useNavigate();

  const [session, setSession] = React.useState({
    user: {
      name: localStorage.getItem("user"),
      email: localStorage.getItem("username"),
      image: logo,
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: localStorage.getItem("user"),
            email: localStorage.getItem("username"),
            image: logo,
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("username");
        localStorage.removeItem("psw");
        localStorage.removeItem("API");
        localStorage.removeItem("logo");
        localStorage.removeItem("logo2");
        navigate("/");
      },
    };
  }, [navigate]);

  const router = useDemoRouter("/dashboard");

  function DemoPageContent({ pathname, navigate }) {
    switch (pathname) {
      case "/dashboard":
        return <InnerDashboard />;
      case "/DocReport":
        return <DocReport />;
      case "/insights":
        return <Insights />;
      case "/review":
        return <RatingDashboard />;
      case "/post":
        return <Post />;
      default:
        return <InnerDashboard />;
    }
  }



  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={logo} alt="logo" style={{ height: "40px" }} />
            {logo2 ? <img src={logo2} alt="Sitapride logo" style={{ height: "40px" }} /> : ""}
          </div>
        ),
        title: " ",
        color: "#A19EC9",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout
        sx={{
          ".MuiThemeSwitcher-root": {
            display: "none !important", // Forcefully hide the theme switcher
          },
          ".MuiThemeSwitcher-root + div": {
            display: "none !important", // Hide following elements related to the switcher
          },
        }}
      >
        <DemoPageContent pathname={router.pathname} navigate={router.navigate} />
      </DashboardLayout>
    </AppProvider>
  );
}
