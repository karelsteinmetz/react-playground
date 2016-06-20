import * as React from "react";
import * as ReactDOM from "react-dom";
import * as rr from "react-router";
import Hello from "./greeter";
import * as data from "./data";

const Category = ({ children, params }) => {
  const category = data.lookupCategory(params.category)

  return (
    <div>
      <h1>{category.name}</h1>
      {children || (
        <p>{category.description}</p>
      ) }
    </div>
  )
}

const CategorySidebar = ({ params }) => {
  const category = data.lookupCategory(params.category)

  return (
    <div>
      <rr.Link to="/">◀︎ Back</rr.Link>
      <h2>{category.name} Items</h2>
      <ul>
        {Object.keys(category.items).map((item: string, index: number) => (
          <li key={index}>
            <rr.Link to={`/category/${category.name}/${category.items[item].name}`}>{category.items[item].name}</rr.Link>
          </li>
        )) }
      </ul>
    </div>
  )
}

const Item = ({ params: { category, item } }) => {
  const menuItem = data.lookupItem(category, item)
  return (
    <div>
      <h1>{menuItem.name}</h1>
    </div>
  )
}

const Index = () => (
  <div>
    <h1>Sidebar</h1>
    <p>
      Routes can have multiple components, so that all portions of your UI
      can participate in the routing.
    </p>
  </div>
)

const IndexSidebar = () => (
  <div>
    <h2>Categories</h2>
    <ul>
      {Object.keys(data.data).map((categoryId, index) => (
        <li key={index}>
          <rr.Link to={`/category/${data.data[categoryId].name}`}>{data.data[categoryId].name}</rr.Link>
        </li>
      )) }
    </ul>
  </div>
)

const App = ({ content, sidebar }) => (
  <div>
    <div className="Sidebar">
      {sidebar || <IndexSidebar />}
    </div>
    <div className="Content">
      {content || <Index />}
    </div>
  </div>
)

ReactDOM.render(
  <rr.Router history={rr.browserHistory}>
    <rr.Route path="/" component={App}>
      <rr.Route path="category/:category" components={{ content: Category, sidebar: CategorySidebar }}>
        <rr.Route path=":item" component={Item} />
      </rr.Route>
    </rr.Route>
    <rr.Route path="*" component={App} />
  </rr.Router>,
  document.getElementById("root")
);