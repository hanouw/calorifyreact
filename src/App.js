import "./App.css";
import { DateProvider } from "./layouts/DateContext";
import ErrorPage from "./pages/ErrorPage";
import Router from "./routes/indexRouter";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="App">
      <DateProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Router />
        </ErrorBoundary>
      </DateProvider>
    </div>
  );
}

export default App;
