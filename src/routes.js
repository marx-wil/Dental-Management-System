import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Dentall Management System Imports
import Dashboard from "views/DentalManagementSystem/default"
import Patients from "views/DentalManagementSystem/patients"
const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  }
  // ,{
  //   name: "Patients",
  //   layout: "/admin",
  //   path: "/patients",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Patients,
  // }
];

export default routes;
