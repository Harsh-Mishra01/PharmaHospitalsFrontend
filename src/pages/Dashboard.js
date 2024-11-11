import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../stylesheet/Dashboard.css";
import { NewMenuBar } from "../components/FilterPopover";
import Navbar from "../components/Navbar";
import DocReport from "./Doc-Report";
import InnerDashboard from "./InnerDashboard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../stylesheet/Dashboard.css"

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
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Profiles",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Matrics",
    icon: <LayersIcon />,
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

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: "sdisdjeifn",
}));

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
      image: localStorage.getItem("image"),
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: localStorage.getItem("user"),
            email: localStorage.getItem("username"),
            image: localStorage.getItem("image"),
          },
        });
      },
      signOut: () => {
          setSession(null);
          localStorage.removeItem("username");
          localStorage.removeItem("psw");
          console.log("logged out before navifated");
          navigate("/");
          console.log("User logged out");
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");

  console.log(router.pathname);
  console.log(router.navigate);

  const navigate = useNavigate();

  // Handle logout button click
//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("psw");
//     console.log("logged out before navifated");
//     navigate("/");
//     console.log("User logged out");
//   };

  function DemoPageContent({ pathname, navigate }) {
    if (pathname === "/dashboard") {
      return <InnerDashboard />;
    } else if (pathname === "/DocReport") {
      return <DocReport />;
    }
    return <InnerDashboard />;
  }

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        //logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MultiplierHospitals",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        
        <DemoPageContent
          pathname={router.pathname}
          navigate={router.navigate}
        />
      </DashboardLayout>
    </AppProvider>
  );
};
