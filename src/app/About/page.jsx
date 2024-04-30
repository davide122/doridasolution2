import AboutPage from "../../components/About/AboutPage";
import MyFooter from "../../components/Footer/MyFooter";
import MyNavbar from "../../components/navbar/MyNavbar";

const page = () => {
    return(
        <div>
            <MyNavbar/>
          <AboutPage/>
          <MyFooter></MyFooter>
        </div>
    )
}
export default page;