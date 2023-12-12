import { useRoutes } from "react-router-dom";
// import DashboardOverview1 from "../pages/DashboardOverview1";
// import DashboardOverview3 from "../pages/DashboardOverview3";
// import DashboardOverview4 from "../pages/DashboardOverview4";
// import DashboardOverview5 from "../pages/DashboardOverview5";
// import DashboardOverview6 from "../pages/DashboardOverview6";
// import DashboardOverview7 from "../pages/DashboardOverview7";
// import DashboardOverview8 from "../pages/DashboardOverview8";
// import Users from "../pages/Users";
// import Departments from "../pages/Departments";
// import AddUser from "../pages/AddUser";
// import ProfileOverview from "../pages/ProfileOverview";
// import Settings from "../pages/Settings";
// import Billing from "../pages/Billing";
// import Invoice from "../pages/Invoice";
import Campaigns from "../pages/Campaigns";
// import AddProduct from "../pages/AddProduct";
// import ProductList from "../pages/ProductList";
// import ProductGrid from "../pages/ProductGrid";
import ProfileList from "../components/ProfileList";
// import TransactionDetail from "../pages/TransactionDetail";
// import SellerList from "../pages/SellerList";
// import SellerDetail from "../pages/SellerDetail";
// import Reviews from "../pages/Reviews";
// import Inbox from "../pages/Inbox";
// import FileManagerList from "../pages/FileManagerList";
// import FileManagerGrid from "../pages/FileManagerGrid";
// import Chat from "../pages/Chat";
// import Calendar from "../pages/Calendar";
// import PointOfSale from "../pages/PointOfSale";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Creative from "../pages/Creative";
// import Dynamic from "../pages/Dynamic";
// import Interactive from "../pages/Interactive";
// import RegularTable from "../pages/RegularTable";
// import Tabulator from "../pages/Tabulator";
// import Modal from "../pages/Modal";
// import Slideover from "../pages/Slideover";
// import Notification from "../pages/Notification";
// import Tab from "../pages/Tab";
// import Accordion from "../pages/Accordion";
// import Button from "../pages/Button";
// import Alert from "../pages/Alert";
// import ProgressBar from "../pages/ProgressBar";
// import Tooltip from "../pages/Tooltip";
// import Dropdown from "../pages/Dropdown";
// import Typography from "../pages/Typography";
// import Icon from "../pages/Icon";
// import LoadingIcon from "../pages/LoadingIcon";
// import RegularForm from "../pages/RegularForm";
// import Datepicker from "../pages/Datepicker";
// import TomSelect from "../pages/TomSelect";
// import FileUpload from "../pages/FileUpload";
// import WysiwygEditor from "../pages/WysiwygEditor";
// import Validation from "../pages/Validation";
// import Chart from "../pages/Chart";
// import Slider from "../pages/Slider";
// import ImageZoom from "../pages/ImageZoom";
import LandingPage from "../pages/LandingPage";

import Layout from "../themes";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "campaigns",
          element: <Campaigns />,
        },
        {
          path: 'campaign/:id',
          element: <ProfileList />
        },
      ]
    },
    {
      path: "/landing-page",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
