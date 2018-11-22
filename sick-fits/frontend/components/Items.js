import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-auto-columns: 1fr 1fr;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;


const ALL_ITEMS_QUERY = gql` 
	query ALL_ITEMS_QUERY {
			items {
				id
				title
				description
				image
				largeImage
			}
	}
`;


export default class Items extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_ITEMS_QUERY}>
          {
            ({data, error, loading}) => {
              if(loading) return <p>Loading...</p>;
              if(error) return <p>Error: {error.message}</p>;
              return <ItemsList>
                  {data.items.map(item => <p key={item.id}>{item.title}</p>)}
              </ItemsList>;
            }
          }
        </Query>
      </div>
    )
  }
}