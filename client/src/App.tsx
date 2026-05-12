import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import OfferDetail from "./pages/OfferDetail";
import Offers from "./pages/Offers";
import OfferCommunication from "./pages/OfferCommunication";
import OfferEvents from "./pages/OfferEvents";
import OfferImmersion from "./pages/OfferImmersion";
import Testimonials from "./pages/Testimonials";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Admin from "./pages/Admin";
import AdminNews from "./pages/AdminNews";
import AdminTestimonials from "./pages/AdminTestimonials";
import { AdminLogin } from "./pages/AdminLogin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/agency" component={About} />
      <Route path="/offers" component={Offers} />
      <Route path="/offers/communication" component={OfferCommunication} />
      <Route path="/offers/events" component={OfferEvents} />
      <Route path="/offers/immersion" component={OfferImmersion} />
      <Route path="/offers/:type" component={OfferDetail} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:id" component={ProjectDetail} />
      <Route path="/actualites" component={News} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/news" component={AdminNews} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/g40mconnect" component={AdminLogin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
