import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./components/Home"
import NewItem from "./components/NewItem"
import Items from "./components/Items"

class App extends Component {
  state = {
    stores: [],
    brands: []
  }
  componentDidMount() {
    const that = this
    async function getStoresAndBrands() {
      const storePromise = fetch("http://localhost:3001/stores.json")
      const brandPromise = fetch("http://localhost:3001/brands.json")
      const [stores, brands] = await Promise.all(
        [storePromise, brandPromise].map(p => p.then(res => res.json()))
      )
      that.setState({
        stores,
        brands
      })
    }
    getStoresAndBrands()
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/items" component={Items} />
          <Route
            path="/new-item"
            render={props => (
              <NewItem
                {...props}
                stores={this.state.stores}
                brands={this.state.brands}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
