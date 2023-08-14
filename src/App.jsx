import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DetailsPage from "./Components/details-page/details-page";
import NewEditPage from "./Components/new-edit-page/NewEditPage";
import Home from "./Components/Home/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="detailsPage/:id" element={<DetailsPage />}></Route>
            <Route path="detailsPage/:id/edit" element={<NewEditPage />}></Route>
            <Route path="new" element={<NewEditPage />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
