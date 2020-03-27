import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    //searchField: state.searchField
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  // constructor() {
  //  super()
  //  this.state = {
  //    robots: [],
  //    //searchfield: ''
  //  }
  // };

  componentDidMount() {
    //console.log(this.props.store.getState());
    // fetch('https://jsonplaceholder.typicode.com/users')
    //  .then(response=> {
    //    return response.json();
    // })
    //  .then(usersa=> {
    //    this.setState({ robots: usersa});
    //  })
    this.props.onRequestRobots();
  }

  // onSearchChange = (event) => {
  //  this.setState({ searchfield: event.target.value })
  // };

  render() {

    //const { robots } = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    if (isPending) {
      return <h1> Loading... </h1>
    }
    else {
    return (
      <div className='tc'>
        <h1 className = 'f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);