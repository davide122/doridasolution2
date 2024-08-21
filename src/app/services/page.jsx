import { Container } from "react-bootstrap"
import ServicesBox from "../../components/ServicesComponent/ServicesBox"
import MyNavbar from "../../components/navbar/MyNavbar"

const services = () => {
    return(
        <>
        <MyNavbar></MyNavbar>
        <Container fluid className=''>
</Container>
      <ServicesBox></ServicesBox>
        </>
    )

}
export default services