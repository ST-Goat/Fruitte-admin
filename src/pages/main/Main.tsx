import Footer from "./footer/Footer";
import MainContainer from "./MainContainer";
import "./Main.scss";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <MainContainer className={"h-4/5"} />
      <div className="mb-4">
        <Footer />
      </div>
    </div>
  );
};
export default Main;
