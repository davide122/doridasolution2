import AboutPage from "@/components/About/AboutPage";
import MyNavbar from "@/components/navbar/MyNavbar";

const page = () => {
    return(
        <div>
            <MyNavbar className={"gradient"}/>
          <AboutPage/>
        </div>
    )
}
export default page;