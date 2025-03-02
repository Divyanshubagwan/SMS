// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Sidebar from "../pages/SideBar/SideBar"; // Import the Sidebar component
// import { Inter } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {

//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
//       >
//           <div className="flex h-screen">
//             <Sidebar /> {/* Sidebar on the left */}
//             <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
//               {children} {/* Main content */}
//             </main>
//           </div>
        
//       </body>
//     </html>
//   );
// }
'use client'
import { Inter } from "next/font/google";
import Sidebar from "../pages/SideBar/SideBar"; // Assuming you already have a Sidebar component
import { useEffect, useState } from "react";
import Login from "../pages/login"; 
import './globals.css'; // or './tailwind.css' if using a different file name
// Your Login component path

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the login status (for example, from localStorage or session)
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  // If not logged in, show the login component
  if (!isLoggedIn) {
    return (
      <html lang="en">
        <body>
          <Login onLogin={() => setIsLoggedIn(true)} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="flex h-screen">
          <Sidebar /> {/* Sidebar on the left */}
          <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            {children} {/* Main content */}
          </main>
        </div>
      </body>
    </html>
  );
}
