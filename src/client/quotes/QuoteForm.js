import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

const emptyQuote = {
  location: '',
  phrases: [{ sentence: '', person: '' }]
};

class QuoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = emptyQuote;
  }

  componentDidMount() {
    if (this.props.quote) {
      const quote = {};
      quote.phrases = this.props.quote.phrases.map(phrase => {
        const p = {};
        p.sentence = phrase.sentence;
        p.person = phrase.person.id;
        return p;
      });
      quote.location = this.props.quote.location ? this.props.quote.location.id : '';
      this.setState(quote, () => {
        console.log(this.state);
      });
    }
  }

  componentWillReceiveProps(props) {
    if (!props.quote) {
      this.setState(emptyQuote);
    } else {
      const quote = {};
      quote.phrases = props.quote.phrases.map(phrase => {
        const p = {};
        p.sentence = phrase.sentence;
        p.person = phrase.person.id;
        return p;
      });
      quote.location = props.quote.location ? props.quote.location.id : '';
      this.setState(quote, () => {
        console.log(this.state);
      });
    }
  }

  update = name => e => {
    this.setState({[name]: e.target.value});
  }

  addPhrase = () => {
    const phrases = this.state.phrases.slice();
    phrases.push({ sentence: '', person: ''});
    this.setState({ phrases });
  }

  removePhrase = idx => () => {
    const phrases = this.state.phrases.slice();
    phrases.splice(idx, 1);
    this.setState({ phrases });
  }

  updatePhrase = (idx, name) => e => {
    this.setState(update(this.state, {
      phrases: {
        [idx]: {
          [name]: {
            $set: e.target.value
          }
        }
      }
    }));
  }

  submit = e => {
    e.preventDefault();
    if (this.props.quote) {
      this.props.updateQuote({ variables: {
        id: this.props.quote.id,
        phrases: this.state.phrases,
        location: this.state.location
      }}).then(({ data }) => {
        console.log('got data', data);
      }).catch(error => {
        console.log('an error occured', error);
      });
    } else {
      this.props.create(this.state).then(({ data }) => {
        this.setState(emptyQuote);
      }).catch(error => {
        console.log('an error occured', error);
      });
    }
  }

  render() {
    const { data } = this.props;
    if (data.loading) return <div>Loading...</div>;
    return (
      <form onSubmit={this.submit}>
        <h4>New Quote</h4>
        <label>
          Location
          <select onChange={this.update("location")} value={this.state.location}>
            <option value="">None</option>
            {data.locations.map(location => (
              <option value={location.id} key={location.id}>{location.name}</option>
            ))}
          </select>
        </label>
        {this.state.phrases.map((phrase, idx, arr) => (
          <div key={idx}>
            <label>
              Sentence
              <input type="text" onChange={this.updatePhrase(idx, "sentence")} value={this.state.phrases[idx].sentence}/>
            </label>
            <label>
              Person
              <select onChange={this.updatePhrase(idx, "person")} value={this.state.phrases[idx].person} required>
                <option value="">Select Person</option>
                {data.users.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))}
              </select>
            </label>
            { arr.length > 1 ? <button onClick={this.removePhrase(idx)}>Remove</button> : null }
          </div>
        ))}
        <button onClick={this.addPhrase}>Add Phrase</button>
        <hr/>
        <button>Save</button>
      </form>
    );
  }
}

const Query = gql`query {
  locations {
    id
    name
  }
  users {
    id
    username
  }
}`;

const CreateMutation = gql`mutation CreateQuote($quote: QuoteInput!) {
  createQuote(quote: $quote) {
    id
    phrases {
      sentence,
      person {
        id
        username
      }
    }
    location {
      id
      name
    }
  }
}`;

const UpdateMutation = gql`mutation updateQuote($id: String!, $phrases: [PhraseInput]!, $location: String) {
  updateQuote(id: $id, phrases: $phrases, location: $location) {
    id
    phrases {
      sentence,
      person {
        id
        username
      }
    }
    location {
      id
      name
    }
  }
}`;

const Mut = graphql(CreateMutation, {
  props({ mutate }) {
    return {
      create(quote) {
        return mutate({
          variables: { quote },
          updateQueries: {
            Quotes: (prev, { mutationResult }) => {
              const newQuote = mutationResult.data.createQuote;
              return update(prev, {
                quotes: {
                  $push: [newQuote]
                }
              });
            },
            Location: (prev, { mutationResult, queryVariables }) => {
              const newQuote = mutationResult.data.createQuote;
              if (newQuote.location && queryVariables.id === newQuote.location.id) {
                return update(prev, {
                  location: {
                    quotes: {
                      $push: [newQuote]
                    }
                  }
                });
              } else {
                return prev;
              }
            },
            User: (prev, { mutationResult, queryVariables }) => {
              const newQuote = mutationResult.data.createQuote;
              const userPhrases = newQuote.phrases.filter(phrase => phrase.person.username === queryVariables.username);
              if (userPhrases.length) {
                return update(prev, {
                  user: {
                    quotes: {
                      $push: [newQuote]
                    }
                  }
                });
              } else {
                return prev;
              }
            }
          }
        });
      }
    };
  }
})(QuoteForm);
// const UpMut = graphql(UpdateMutation, { name: 'updateQuote'})(Mut);
export default graphql(Query)(Mut);
