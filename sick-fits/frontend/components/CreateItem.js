import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }`;


class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch("https://api.cloudinary.com/v1_1/dioopfv54/image/upload",
      {
        method: "POST",
        body: data
      });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
    console.log(file);
  };

  render() {
  return(

<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
{(createItem, { loading, error }) => (
  <Form onSubmit={async e => {
    e.preventDefault();
    const res = await createItem();
    Router.push({
      pathname: "/item",
      query: { id: res.data.createItem.id }
    });
  }
  }>
    <Error error={error}/>
    <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor="title">
        Title
        <input type="text"
               id='title'
               name="title"
               placeholder="Title"
               required
               onChange={this.handleChange}
               value={this.state.title}/>
      </label>
      <label htmlFor="description">
        Description
        <textarea
          id='description'
          name="description"
          placeholder="Description"
          required
          onChange={this.handleChange}
          value={this.state.description}/>
      </label>
      <label htmlFor="title">
        Price
        <input type="number"
               id='price'
               name="price"
               placeholder="Price"
               required
               onChange={this.handleChange}
               value={this.state.price ? this.state.price : 0}/>
      </label>
      <label htmlFor="file">
        Upload File
        <input type="file"
               id='file'
               name="file"
               placeholder="Upload an Image"
               required
               onChange={this.uploadFile}/>
      </label>
      {this.state.image ?
        <img src={this.state.image}
             alt="upload_preview"/>
        : null}
      <button type="submit">Submit</button>
    </fieldset>
    <h2>Sell an Item</h2>

  </Form>
)}</Mutation>
)
  ;
}
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };