import CookieConsent from "react-cookie-consent";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center p-10">
      <Login />
      <div className="h-full w-full bg-gradient-to-r from-customGreen to-eggPlant opacity-70 absolute top-0 -z-10"></div>
      <div className="h-full w-full absolute bg-pattern bg-cover -z-20 top-0"></div>
      <CookieConsent
        style={{ background: "#073B3A", color: "white", textAlign: 'center' }}
        buttonStyle={{ background: "#47003c", color: "white", padding: '10px'}}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};

export default LoginPage;
