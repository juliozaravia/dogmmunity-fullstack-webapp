import React from 'react';
import { Route } from 'react-router-dom';

import '../utils/styles/Default.css';
import '../utils/styles/Reset.css';

import Detail from './Detail/Detail';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import Upload from './Upload/Upload';
import Welcome from './Welcome/Welcome';

const App = () => {
	return (
		<div>
			<Route exact path="/" component={Welcome} />
			<Route path="/dogs" component={Nav} />
			<Route exact path="/dogs" component={Home} />
			<Route exact path="/dogs/:id" component={Detail} />
			<Route path="/upload" component={Nav} />
			<Route exact path="/upload" component={Upload} />
			<Route path="/dogs" component={Footer} />
			<Route path="/upload" component={Footer} />
		</div>
	);
};

export default App;
