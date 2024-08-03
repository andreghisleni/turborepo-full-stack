import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
    exact: true,
  },
  {
    title: "Clientes",
    path: "/clients",
    pathCompare: "/client",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
  },
  {
    title: "Produtos",
    path: "/products",
    pathCompare: "/product",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
  },
  {
    title: "Vendas",
    path: "/sales",
    pathCompare: "/sale",
    icon: <Icon icon="lucide:shopping-cart" width="24" height="24" />,
  },
  {
    title: "Demandas",
    path: "/demands",
    pathCompare: "/demand",
    icon: <Icon icon="lucide:shopping-cart" width="24" height="24" />,
  },
  {
    title: "Estoques",
    path: "/inventory",
    pathCompare: "/inventory",
    icon: <Icon icon="lucide:package" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Locais", path: "/inventory/locations" },
      { title: "Itens", path: "/inventory/itens" },
      { title: "Fluxos", path: "/inventory/flows" },
    ],
  },
  {
    title: "Tabelas",
    path: "/tables",
    icon: <Icon icon="lucide:table" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Variações", path: "/tables/variations" },
      { title: "Métodos de pagamento", path: "/tables/payments/methods" },
      { title: "Origem dos contatos", path: "/tables/contacts/origem" },
      { title: "Vendedores", path: "/tables/sellers" },
      { title: "Contas bancarias", path: "/tables/banks" },
      { title: "Tags dos clientes", path: "/tables/client/tags" },
      // { title: "Tags dos produtos", path: "/tables/product-tags" },
    ],
  },
  // {
  //   title: "Usuários",
  //   path: "/users",
  //   icon: <Icon icon="lucide:user" width="24" height="24" />,
  //   pathCompare: "/user",
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Account", path: "/settings/account" },
  //     { title: "Privacy", path: "/settings/privacy" },
  //   ],
  // },
  {
    title: "Sair",
    path: "/api/auth/sign-out",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  },
];
