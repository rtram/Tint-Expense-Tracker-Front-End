import React from 'react'
import { Carousel } from "react-bootstrap"

const TipsCarousel = () => (
  <Carousel className="Carousel" interval={5000}>
    <Carousel.Item>
      <h2>Tip #1</h2>
      <p id="smaller-font" >Check your credit score</p>
      <p id="smaller-font1" >Your credit score is a numeric representation of your credit that informs lenders about what kind of borrower you are.</p>
      <br/>
      <br/>
    </Carousel.Item>
    <Carousel.Item>
      <h2>Tip #2</h2>
      <p id="smaller-font">Pay more than the minimum on your credit card</p>
      <p id="smaller-font1">When it comes to paying your credit card, settling for the bare minimum makes you a slave to interest.</p>
      <br/>
      <br/>
    </Carousel.Item>
    <Carousel.Item>
      <h2>Tip #3</h2>
      <p id="smaller-font">Up your retirement contribution</p>
      <p id="smaller-font1">Compound interest can become your best friend if you start saving now.</p>
      <br/>
      <br/>
    </Carousel.Item>
    <Carousel.Item>
      <h2>Tip #4</h2>
      <p id="smaller-font">Sign up for autopay on your debt</p>
      <p id="smaller-font1">Missing a payment can hurt your credit score and tack on unnecessary late fees.</p>
      <br/>
      <br/>
    </Carousel.Item>

  </Carousel>
)

export default TipsCarousel
