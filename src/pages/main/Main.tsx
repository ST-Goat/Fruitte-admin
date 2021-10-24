import Footer from "./footer/Footer";
import Header from "./header/Header";
import MainContainer from "./MainContainer";
import SidebarNav from "./sidebar/SidebarNav";
import './Main.scss';

const Main: React.FC = () =>{
 return (
   <div className="flex flex-row h-full">
     <SidebarNav/>
     <div className="h-screen w-full">
      <div className="flex-row h-full w-full">
        <Header className={'w-full'}/>
        <MainContainer className={'h-4/5'} />
        <Footer/>
      </div>
     </div>
   </div>
 )
}
export default Main;