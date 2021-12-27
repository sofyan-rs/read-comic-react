import Header from './components/header';
import Footer from './components/footer';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/home';
import Latest from './pages/latest';
import AllList from './pages/allList';
import Series from './pages/series';
import Chapter from './pages/chapter';
import ScrollToTop from './components/scrolltoTop';
import Genre from './pages/genre';
import Completed from './pages/completed';
import Search from './pages/search';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import NotFoundPages from './components/notFoundPages';
import ScrollButton from './components/scrollButton';

function App() {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  }
  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme])
  const themeMode = () => {
    setTheme(!theme);
  }

  return (
    <Router>
      <Helmet>
        <title>ReadComic - Read Comic, Manga, Manhwa, Manhua, Online</title>
        <meta name="description" content="ReadComic - Free Read English Comic, Manga, Manhwa, Manhua Online" />
        <meta name="keyword" content="Read Comic, Read Manga, Read Manhwa, Read Manhua" />
      </Helmet>
      <ScrollToTop />
      <div className={theme ? "theme-dark" : ""}>
        <Header theme={theme} themeMode={themeMode}/>
        <ScrollButton />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/series-list/">
              <Redirect to="/series-list/1/" />
            </Route>
            <Route exact path="/series-list/:pages">
              <AllList />
            </Route>
            <Route exact path="/latest/">
              <Redirect to="/latest/1/" />
            </Route>
            <Route exact path="/latest/:pages">
              <Latest />
            </Route>
            <Route exact path="/completed/">
              <Redirect to="/completed/1/" />
            </Route>
            <Route exact path="/completed/:pages">
              <Completed />
            </Route>
            <Route exact path="/genre/:genre">
              <Genre />
            </Route>
            <Route exact path="/genre/:genre/:pages">
              <Genre />
            </Route>
            <Route exact path="/search/:search">
              <Search />
            </Route>
            <Route exact path="/search/:search/:pages">
              <Search />
            </Route>
            <Route exact path="/series/:slug">
              <Series />
            </Route>
            <Route exact path="/chapter/:series/:ch">
              <Chapter />
            </Route>
            <Route path="*">
              <NotFoundPages />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
