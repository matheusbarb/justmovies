import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

{
  /*Metadata*/
}
export const metadata = {
  title: "Next Tecnologia Project",
  description: "Teste técnico Front-End",
};

{
  /*Project*/
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={3000} />
        <Header />
        {children}
      </body>
    </html>
  );
}
