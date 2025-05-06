import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/dashboard",
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
        url: "/books/authors",
        items: [],
      },
      {
        title: "Publishers",
        icon: Icons.Publisher,
        url: "/books/publishers",
        items: [],
      },
      {
        title: "Categories",
        icon: Icons.Category,
        url: "/books/categories",
        items: [],
      },
      {
        title: "Books",
        icon: Icons.Book,
        url: "/books",
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
        url: "/community/users",
        items: [],
      },
      {
        title: "Reviews",
        icon: Icons.Star,
        url: "/community/reviews",
        items: [],
      },
      {
        title: "Book Clubs",
        icon: Icons.Group,
        url: "/community/book-clubs",
        items: [],
      },
      {
        title: "Reports",
        icon: Icons.BarChart,
        url: "/account/reports",
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
        url: "/account/profile",
        items: [],
      },
      {
        title: "Change Password",
        icon: Icons.Lock,
        url: "/account/change-password",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/account/settings",
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
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/",
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "My Library",
        icon: Icons.Library,
        url: "/forms/form-layout",
        items: [],
      },
      {
        title: "Change Password",
        icon: Icons.Lock,
        url: "/forms/form-layout",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/pages/settings",
        items: [],
      },
    ],
  },
];
