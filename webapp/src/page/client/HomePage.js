import '../../app.css';

export default function HomePage({}) {

    return (
        <>
            <div className={"parallax"}>
                <div className={"catchyPhrase"}>
                    Be Each day <br></br>
                    <b style={{fontSize: '160px'}}>Beautiful</b>
                </div>
            </div>

            <div className="page" style={{backgroundColor: '#B76E79'}}>
                <div className="informationPage">
                    <div className="availableServices">
                        <div>
                            Available Services
                            <br />
                            <a href="services" style={{fontSize: '20px', color: 'white'}}> Discover More Services &gt;&gt; </a>
                        </div>
                    </div>
                    <div className="availableServicesElements">
                        <div className="nail availableServicesElementsShared">Nail</div>
                        <div className="hair availableServicesElementsShared">Hair</div>
                        <div className="eyelash availableServicesElementsShared">EyeLash</div>
                        <div className="makeup availableServicesElementsShared">MakeUp</div>
                    </div>
                </div>
            </div>

            <div className="page" style={{backgroundColor: '#8C441D'}}>
                <div className="informationPage">
                    <div className="aboutUs">
                        <div>
                            About Us
                        </div>
                    </div>
                    <div className="aboutUsElement">
                        <b>Make a Reservation to Your Favorite Salons </b>
                        <p style={{fontSize: '20px', fontFamily: '"Roboto Mono", monospace'}}>
                            Our website provides services to help and manage appointments with salons.
                            <br /><br />
                            What information you can find?
                        </p>
                        <ul className="aboutUslistOfInformation">
                        <li>Where the shop is</li>
                        <li>Who can work for you</li>
                        <li>How much the services are</li>
                        <li>What services the shop offer</li>
                        <li>When the services and employees are available for you</li>
                    </ul>
                        <p style={{fontSize: '20px', fontFamily: '"Roboto Mono", monospace'}}>
                            The website is developed by Gashi, L., Asefi, S., and Kim, H. <br />
                            If you are experiencing technical issues,
                            <a href="mailTo:hkim3262@conestogac.on.ca" style={{color: 'white'}}>please contact us here</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}