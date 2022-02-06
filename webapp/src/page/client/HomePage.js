import salonImg from "../../images/salon-2.jpeg";
import Container from '@material-ui/core/Container';
import '../../app.css';

export default function HomePage({}) {

    return (
        <div>
            <header>
                <div className={"salon"}>
                    <Container maxWidth="lg" style={{padding: 50}}>
                        <img src={salonImg} alt={"Beauty Salon image"} width={"100%"} height={"100%"}/>
                    </Container>
                </div>
                <div className={"text-on-img"}>
                    <h3>Welcome to our beauty salon!</h3>
                </div>
            </header>
        </div>

    );
}