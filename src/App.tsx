import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons'

import Categories from './pages/Categories';
import CategoryForm from './pages/CategoryForm';
import WordForm from './pages/WordForm';
import Words from './pages/Words';
import Practice from './pages/Practice';
import NoFound from './pages/NoFound';
import Headbar from './components/organisms/Headbar';

library.add(faEdit, faTrash, faFileExport, faFileImport);

const GlobalContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	font-size: ${({theme}) => theme.fontSizeEm};
	background: ${({theme}) => theme.primary};
	padding: 50px;
	display: flex;
	flex-direction: column;
`

function App() {
	return (
		<GlobalContainer>
			<Headbar />
			<Switch>
				<Route exact path="/">
					<Categories />
				</Route>
				<Route path="/addcategory">
					<CategoryForm />
				</Route>
				<Route exact path="/category/:id/add">
					<WordForm type="add" />
				</Route>
				<Route exact path="/edit/:id">
					<WordForm type="edit" />
				</Route>
				<Route exact path="/category/:id">
					<Words />
				</Route>
				<Route exact path="/practice">
					<Practice />
				</Route>
				<Route path="*">
					<NoFound />
				</Route>
			</Switch>
		</GlobalContainer>
  	);
}

export default App;
