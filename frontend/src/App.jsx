import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppStateProvider from "@app/containers/AppState";
import Redirect from "@components/commons/Redirect";
import NotFound from "@components/commons/NotFound";
import Index from "@app/pages/home";
import List from "@app/pages/list";

const AppContainer = (props) => {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#222",
            borderRadius: "10px",
            padding: "14px",
            color: "#FFF",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index {...props} />} />
          <Route path="/:shortUrl" element={<Redirect />} />
          <Route path="/urls" element={<List />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

function App(props) {
  props = { ...props, environment: import.meta.env.VITE_ENV };
  return (
    <AppStateProvider>
      <AppContainer {...props} />
    </AppStateProvider>
  );
}

export default App;
