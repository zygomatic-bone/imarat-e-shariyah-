import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Taruf from "@/pages/taruf";
import Emarat from "@/pages/emarat";
import Shuaba from "@/pages/shuaba";
import News from "@/pages/news";
import Admin from "@/pages/admin";
import AdminAccessButton from "@/components/AdminAccessButton";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.22 },
  },
};

function AnimatedRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location} location={location}>
        <Route path="/"        component={() => <AnimatedRoute component={Home} />} />
        <Route path="/taruf"   component={() => <AnimatedRoute component={Taruf} />} />
        <Route path="/emarat"  component={() => <AnimatedRoute component={Emarat} />} />
        <Route path="/shuaba"  component={() => <AnimatedRoute component={Shuaba} />} />
        <Route path="/news"    component={() => <AnimatedRoute component={News} />} />
        <Route path="/admin"   component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <AdminAccessButton />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
