import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

const hostname = window && window.location && window.location.hostname

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://evening-crag-18234.herokuapp.com"

export default class NewItem extends Component {
  state = {
    name: "",
    costPrice: "",
    listingPrice: "",
    storeId: "",
    storeName: "",
    brandId: "",
    brandName: "",
    listingDate: ""
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  handleDropdown = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = async e => {
    e.preventDefault()
    const item = {
      name: this.state.name,
      listing_price: this.state.listingPrice,
      cost: this.state.costPrice,
      store_id: this.state.storeId,
      brand_id: this.state.brandId,
      store_attributes: {
        name: this.state.storeName
      },
      brand_attributes: {
        name: this.state.brandName
      }
    }
    const body = JSON.stringify({ item })
    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body
    })
    const newItem = await res.json()
    this.props.history.push("/items")
  }
  render() {
    return (
      <Container>
        <Form onSubmit={this.submit}>
          <Form.Group controlId="formItemName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group controlId="formItemCost">
            <Form.Label>Cost (in cents)</Form.Label>
            <Form.Control
              type="number"
              name="costPrice"
              onChange={this.onChange}
              value={this.state.costPrice}
            />
          </Form.Group>
          <Form.Group controlId="formItemListing">
            <Form.Label>Listing Price (in cents)</Form.Label>
            <Form.Control
              type="number"
              name="listingPrice"
              onChange={this.onChange}
              value={this.state.listingPrice}
            />
          </Form.Group>
          <Form.Group controlId="formListingDate">
            <Form.Label>Date Listed</Form.Label>
            <Form.Control
              type="date"
              name="listingDate"
              onChange={this.onChange}
              value={this.state.listingDate}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Store</Form.Label>
            <Form.Control
              name="storeId"
              as="select"
              onChange={this.handleDropdown}
            >
              <option value>Choose a store...</option>

              {this.props.stores.map(store => (
                <option value={store.id} key={store.id}>
                  {store.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStoreName">
            <Form.Label>Or create a new store...</Form.Label>
            <Form.Control
              type="text"
              name="storeName"
              onChange={this.onChange}
              value={this.state.storeName}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brandId"
              as="select"
              onChange={this.handleDropdown}
            >
              <option value>Choose a brand...</option>
              {this.props.brands.map(brand => (
                <option value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStoreName">
            <Form.Label>Or create a new brand...</Form.Label>
            <Form.Control
              type="text"
              name="brandName"
              onChange={this.onChange}
              value={this.state.brandName}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}
