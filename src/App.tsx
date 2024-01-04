import Grid from "./components/Grid";
import Header from "./components/Header";
import SideContainer from "./components/SideContainer";
import { Algo, AlgoProvider } from "./hooks/AlgoProvider";
import { ThemeProvider } from "./hooks/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="path-theme">
      <AlgoProvider defaultAlgo={Algo.DepthFirstSearch}>
        <Header></Header>
        <article className="w-fit h-fit mt-32 mx-auto flex items-center gap-6">
          <Grid></Grid>
          <SideContainer></SideContainer>
        </article>
      </AlgoProvider>
    </ThemeProvider>
  );
}

export default App;
