import "./App.css";
import { Banner } from "./components/Banner.jsx";
import AccountContainer from "./components/AccountContainer.jsx";
import AccountContextProvider from "./store/account-context.jsx";
import Totaliser from "./components/Totaliser.jsx";

function App() {
  // const [noInputForms, setNoInputForms] = useState([1]);

  // function addInputForm() {
  //   setNoInputForms((prevState) => [...prevState, 1]);
  //   console.log(noInputForms);
  // }

  return (
    <div className="wrapper">
      <Banner />
      {/* <InputForm /> */}
      {/* <InputFormContainer> */}
      <AccountContextProvider>
        <AccountContainer />
        <Totaliser />
      </AccountContextProvider>
      {/* </InputFormContainer> */}
      {/* <button onClick={addInputForm}>+</button> */}
    </div>
  );
}

export default App;
