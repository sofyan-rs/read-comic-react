import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Latest from './pages/latest';
import AllList from './pages/allList';
import Genre from './pages/genre';
import Completed from './pages/completed';
import Search from './pages/search';
import Series from './pages/series';
import Chapter from './pages/chapter';
import Bookmark from './pages/bookmark';
import BookmarkContextProvider from './contexts/bookmarkContext';
import History from './pages/history';
import HistoryContextProvider from './contexts/historyContext';
import NotFoundPages from './components/notFoundPages';
import ScrollToTop from './components/scrollToTop';
import ScrollButton from './components/scrollButton';

function App() {
  const getDark = () => {
    return JSON.parse(localStorage.getItem("dark")) || false;
  }
  const [dark, setDark] = useState(getDark());
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark])
  const darkMode = () => {
    setDark(!dark);
  }

  return (
    <Router>
      <Helmet>
        <title>ReadComic - Read Comic, Manga, Manhwa, Manhua, Online</title>
        <meta name="description" content="ReadComic - Free Read English Comic, Manga, Manhwa, Manhua Online" />
        <meta name="keyword" content="Read Comic, Read Manga, Read Manhwa, Read Manhua" />
      </Helmet>
      <ScrollToTop />
      {dark ? (<style>{`body{background:#2f303e}`}</style>) : ""}
      <div className={dark ? "theme-dark" : ""}>
        <BookmarkContextProvider>
          <HistoryContextProvider>
            <Header dark={dark} darkMode={darkMode}/>
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
                <Route exact path="/bookmark">
                  <Bookmark />
                </Route>
                <Route exact path="/history">
                  <History />
                </Route>
                <Route path="*">
                  <NotFoundPages />
                </Route>
              </Switch>
            </div>
            <Footer />
          </HistoryContextProvider>
        </BookmarkContextProvider>
      </div>
    </Router>
  );
}

export default App;
