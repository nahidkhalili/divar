import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children:React.ReactNode;
}
// eslint-disable-next-line react/prop-types
const Layout = ({children}:LayoutProps):JSX.Element => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
