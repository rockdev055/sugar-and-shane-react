import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import { LinkContainer } from "react-router-bootstrap"

export default class Home extends Component {
  render() {
    return (
      <section className="bgimage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hero-text">
              <h1>POSHBIN</h1>
              <h3>Keep track of your Poshmark inventory</h3>
              <LinkContainer to="/items">
                <Button variant="success" size="lg">
                  Get Started
                </Button>
              </LinkContainer>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
