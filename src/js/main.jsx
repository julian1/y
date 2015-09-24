
var React = require('react');
var ReactRouter = require('react-router');

// import { Router, Route, Link, History } from 'react-router';
// const createBrowserHistory = require('createBrowserHistory');


// var $ = require('jquery');

var UserGist = require('./UserGist.jsx');
var ContactForm = require('./ContactForm.jsx');



// https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md
var createBrowserHistory = require( 'history/lib/createBrowserHistory');  

// First we import some components...
// import { Router, Route, Link } from 'react-router'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
//var DefaultRoute = ReactRouter.DefaultRoute;
//var RouteHandler = ReactRouter.RouteHandler;


const Home = React.createClass({
  render() {
    return (
      <div>Home</div>
      ); 
  }
});

var Alert = require('react-bootstrap').Alert;
var Button = require('react-bootstrap').Button;



const About = React.createClass({
  render() {
    return (
      <div>About
           <Button bsStyle="primary" bsSize="medium">Medium button</Button>
          <Button bsSize="medium">Large button</Button>
          <UserGist source="https://api.github.com/users/octocat/gists" />
          <ContactForm  value={ { name : "fred" }  }  />
      </div>
      ); 
  }
});



const Message = React.createClass({
  
  componentDidMount() {
    // from the path `/inbox/messages/:id`
    const id = this.props.params.id
    console.log("message id is " + id);

    // now we'd send a flux action, switched to active message...
    // or just hit up, the api...

    // fetchMessage(id, function (err, message) {
    //  this.setState({ message: message })
    // })
    
    this.setState({ message: "mymessage " + id })
  },

  render() {
    return <h3>{(this.state && this.state.message) || "Message"} </h3>
  }

});


const Inbox = React.createClass({

  getInitialState() {

//    console.log("Inbox.getInitialState");
    return { whoot: "whoot" }
  },
 
  render() {
    console.log("Inbox.render state.whoot = " + this.state.whoot);
//    var x = "hi";
//      <div>"a" + {x}</div>); 
    return (
      <div>
        <h2>Inbox</h2>
        <div>{this.state.whoot}</div>
        {/* Render the child route component */}
        {this.props.children || "Welcome to your Inbox"}
      </div>
    );
  }
});



const MyInput = React.createClass({
    render() { 
      return (
        React.createElement("input", {
          // The callback passed to `onChange` will be called when `value` should change
          onChange: function(syntheticEvent) {
              // Log new `value` to JavaScript console
              console.log(syntheticEvent.target.value)
          }
        })
      )
    }
});
 

// Then we delete a bunch of code from App and
// add some <Link> elements...
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <MyInput/>
        {/* change the <a>s to <Links>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        hi
        {this.props.children}
      </div>
    )
  }
})



// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.

//    <UserGist source="https://api.github.com/users/octocat/gists" />,
// <Router history={createBrowserHistory()} >

//  <Router  >
// <Route path="*" component={App}/>




var history = createBrowserHistory()

React.render((

  <Router history={history} >
    <Route path="/" component={ App } location="history">
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox } whoot="ggg" >
          {/* Use /messages/:id instead of messages/:id */}
          <Route path="/messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)



