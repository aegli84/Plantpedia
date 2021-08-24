import React from 'react';
import styled from 'styled-components';
import {FaQuoteLeft} from 'react-icons/fa';
import {FaQuoteRight} from 'react-icons/fa';
import AboutPage from '../../components/AboutUs/About';
import maria from '../../assets/aboutUsimg/maria.png';
import nick from '../../assets/aboutUsimg/nick.png';
import andrea from '../../assets/aboutUsimg/andrea.png';
import aboutpage from '../../assets/bgimg/aboutpage.png'

const BgContainer = styled.div `
background: url(${aboutpage});
background-repeat: no-repeat;
height: 100vh;
background-size: 80vw 100vh;
`

const Container = styled.div `
@media  (max-width: 770px) {
    @media (max-width: 377px) {
    }
`

const Header = styled.h1 `
    width: 23vw;
    margin-top: 10px;
    padding: 1.8vw;
    margin-left: 40vw;
    text-align: center;
    color: whitesmoke;
    font-family: 'Montserrat', Sans serif;
    font-size: 3.5rem; 
    @media (max-width: 770px) {
        width: 30vw;
        height: 0;
        margin-left: 35.5vw;
        font-size: 3rem; 
        @media (max-width: 377px) {
        width: 35vw;
        height: 0;
        padding: 0;
        margin-top: 100px;
        font-size:2rem; 
        }
`
const Box = styled.div `
    display: flex; 
    margin-left: -12vw;
    @media (max-width: 770px) {
        margin-left: -9vw;
        margin-top: 20vw;
        @media (max-width: 377px) {
        }
`

const Paragraph = styled.p `
    width: 60vw;
    height: 38vh;
    margin-left: 20vw;
    margin-top: 20vw;
    border: 1px solid black;
    background-color: grey;
    border-radius: 5px 20px 5px;
    padding: 3vw;
    font-family: 'Montserrat', Sans serif;
    font-size: 1rem;
    font-weight: 700;
    color: whitesmoke;
    @media(max-width: 770px) {
        margin-left: 18vw;
        margin-top: 50vw;
        @media(max-width: 377px) {
        }
`
function AboutUsUi () {
    return(
<BgContainer>
    <Container>
        <Header>About Us.</Header>
            <Box>
                <div>
                    <AboutPage pic= {maria}
                            summ= "-'I always loved nature and green. Along with my passion for coding, we were able to create this platform with everyone!' "
                    />
                </div>
                <div>
                    <AboutPage pic= {nick}
                            summ= "-'I always loved nature and green. Along with my passion for coding, we were able to create this platform with everyone!' "
                    />
                </div>
                <div>
                    <AboutPage pic= {andrea}
                            summ= "-'I always loved nature and green. Along with my passion for coding, we were able to create this platform with everyone!' "
                    />
                </div>
            </Box>
        
                    <Paragraph>
                        <FaQuoteLeft/>
Welcome to Plantpedia, your number one source for plant caring and guidelines.
We 're dedicated to providing you the very best of tips and advice, with an emphasis on plant caring.
As students in Digital Career Institute , we had this awesome idea to make a platform for other plant lovers, like ourselves and at the same time
enjoy coding.
We hope you enjoy our products as much as we enjoy offering them to you.If you have any questions or comments, 
please don 't hesitate to contact us.
                        <FaQuoteRight/>
<br/>
<br/>
Sincerely,
<br/><br/>
Plantpedia Team


</Paragraph>
        </Container>
</BgContainer>
    );
}

export default AboutUsUi;
