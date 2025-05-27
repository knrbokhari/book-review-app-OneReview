import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/admin",
        items: [],
      },
    ],
  },
  {
    label: "BOOK MENU",
    items: [
      {
        title: "Authors",
        icon: Icons.Authors,
        url: "/admin/authors",
        items: [],
      },
      {
        title: "Publishers",
        icon: Icons.Publisher,
        url: "/admin/publishers",
        items: [],
      },
      {
        title: "Categories",
        icon: Icons.Category,
        url: "/admin/categories",
        items: [],
      },
      {
        title: "Books",
        icon: Icons.Book,
        url: "/admin/books",
        items: [],
      },
    ],
  },
  {
    label: "COMMUNITY",
    items: [
      {
        title: "Users",
        icon: Icons.Users,
        url: "/admin/users",
        items: [],
      },
      {
        title: "Reviews",
        icon: Icons.Star,
        url: "/admin/reviews",
        items: [],
      },
      {
        title: "Book Clubs",
        icon: Icons.Group,
        url: "/admin/book-clubs",
        items: [],
      },
      {
        title: "Reports",
        icon: Icons.BarChart,
        url: "/admin/reports",
        items: [],
      },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      {
        title: "Profile",
        icon: Icons.User,
        url: "/admin/profile",
        items: [],
      },
      {
        title: "Change Password",
        icon: Icons.Lock,
        url: "/admin/change-password",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/admin/settings",
        items: [],
      },
    ],
  },
];

export const NAV_DATA2 = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];

export const NAV_DASHBOARD = [
  {
    label: "User Dashboard",
    items: [
      // {
      //   title: "Dashboard",
      //   icon: Icons.HomeIcon,
      //   url: "/dashboard",
      //   items: [],
      // },
      {
        title: "My Library",
        icon: Icons.Library,
        url: "/dashboard/my-library",
        items: [],
      },
      {
        title: "My Reviews",
        icon: Icons.Star,
        url: "/dashboard/reviews",
        items: [],
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Change Password",
        icon: Icons.Lock,
        url: "/dashboard/change-password",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/dashboard/settings",
        items: [],
      },
    ],
  },
];
