
import createHeader from "./components/header";
import createRoot from "./components/root";
import createFooter from "./components/footer";
import createMap from "./components/map";
import createSidebar from "./components/sidebar";
import createCercaLlocs from "./components/cercaLlocs";
import "./css/app.css";

export default async () => {

  console.log("Init app...");

  document.getElementById("header").innerHTML = createHeader();

  document.getElementById("root").innerHTML = createRoot();

  //document.getElementById("footer").innerHTML = createFooter();

  const map = createMap();

  await createSidebar(document.getElementById("root"));

  createCercaLlocs(document.getElementById("cercaLlocs"), map);

}