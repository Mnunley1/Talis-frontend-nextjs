import React, { Component } from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import { CustomHighlight } from '../CustomHighlight/CustomHighlight';
import _ from 'lodash';

function InputBar(inputProps) {
  if (window.location.pathname == '/') {
    return (
      <InputGroup width="100%" size="lg" id="home">
        <Input
          variant="outline"
          color="black"
          borderRadius="5px"
          borderColor="gray.300"
          backgroundColor="white"
          fontSize="md"
          {...inputProps}
        />
        <InputRightAddon
          border="0"
          bg="teal.500"
          children={<FaSearch color="white" />}
        />
      </InputGroup>
    );
  } else {
    return (
      <InputGroup width="100%" size="md">
        <Input
          variant="outline"
          color="black"
          borderRadius="5px"
          borderColor="gray.300"
          backgroundColor="white"
          fontSize="md"
          {...inputProps}
        />
        <InputRightAddon
          border="0"
          bg="teal.500"
          children={<FaSearch color="white" />}
        />
      </InputGroup>
    );
  }
}

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (_, { newValue }) => {
    if (!newValue) {
      //clear inputs
      this.props.refine();
    }

    this.setState({
      value: newValue || '',
    });
  };

  onSuggestionSelected = (_, { suggestion }) => {
    _.preventDefault();
    const newValue = this.getSuggestionValue(suggestion);
    this.setState({
      value: newValue,
    });
    this.props.refine(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    //keep this empty, as clear logic is implemented in onChange handler
  };

  getSuggestionValue(suggestion) {
    return suggestion.value;
  }

  renderSuggestion(suggestion) {
    return <CustomHighlight suggestion={suggestion} />;
  }

  filterHits = (hits) => {
    const suggestions = [];
    hits.forEach((currentHit) => {
      Object.keys(currentHit._highlightResult).forEach((currentKey) => {
        if (currentHit._highlightResult[currentKey].matchedWords.length === 0) {
          //skip no matches
          return;
        }
        suggestions.push({
          value: currentHit[currentKey],
          hit: currentHit,
          key: currentKey,
        });
      });
    });
    return _.uniqBy(suggestions, (item) => _.trim(item.value));
  };

  render() {
    const { hits } = this.props;
    const { value } = this.state;
    const inputProps = {
      placeholder: 'Search',
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={this.filterHits(hits)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderInputComponent={InputBar}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
