import React, { Component } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { css } from "@emotion/core"
import ClipLoader from "react-spinners/ClipLoader"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
const hostname = window && window.location && window.location.hostname

const API_URL =
  hostname === "localhost"
    ? process.env.REACT_APP_RAILS_API_DEV_URL
    : process.env.REACT_APP_RAILS_API_PROD_URL

class Items extends Component {
  state = {
    items: [],
    show: false,
    activeItemId: null,
    activeItemSoldPrice: "",
    loading: true
  }
  componentDidMount() {
    fetch(`${API_URL}/items.json`)
      .then(res => res.json())
      .then(items => this.setState({ items, loading: false }))
  }
  handleClose = () => this.setState({ show: false })
  handleOpen = id => this.setState({ show: true, activeItemId: id })

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  submitSold = async e => {
    e.preventDefault()
    const item = {
      sold_price: this.state.activeItemSoldPrice
    }
    const body = JSON.stringify({ item })

    const res = await fetch(`${API_URL}/items/${this.state.activeItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body
    })
    const data = await res.json()
    this.setState({
      show: false,
      items: this.state.items.map(item =>
        item.id === this.state.activeItemId ? data : item
      ),
      activeItemSoldPrice: "",
      activeItemId: ""
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="sweet-loading" style={{ textAlign: "center" }}>
          <ClipLoader
            // css={override}
            sizeUnit={"px"}
            size={200}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      )
    }
    return (
      <Container>
        <h1>Items</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Listing Price</th>
              <th scope="col">Sold Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Bought</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.name}</th>
                  <td>
                    {item.cost.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD"
                    })}
                  </td>
                  <td>
                    {item.listing_price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD"
                    })}
                  </td>
                  <td>
                    {item.sold_price ? (
                      item.sold_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => this.handleOpen(item.id)}
                      >
                        Sold
                      </button>
                    )}
                  </td>
                  <td>{item.brand.name}</td>
                  <td>{item.store ? item.store.name : ""}</td>
                  <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sold {item.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={e => this.submitSold(e)}>
                        <label>Sold Price</label>
                        <input
                          value={this.state.activeItemSoldPrice}
                          name="activeItemSoldPrice"
                          onChange={e => this.onChange(e)}
                          type="number"
                        />
                        <button>Save</button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <LinkContainer to="/new-item">
          <Button variant="primary">New Item</Button>
        </LinkContainer>
      </Container>
    )
  }
}

export default Items
