import { useState } from "react";
import "./App.css";
import { Banner } from "./components/Banner.jsx";
import { InputForm } from "./components/InputForm.jsx";
import InputFormContainer from "./components/InputFormContainer.jsx";

function App() {
  const [noInputForms, setNoInputForms] = useState([1]);

  function addInputForm() {
    setNoInputForms((prevState) => [...prevState, 1]);
    console.log(noInputForms);
  }

  return (
    <div className="wrapper">
      <Banner />
      {/* <InputForm /> */}
      <InputFormContainer>
        {noInputForms.map((item, index) => (
          <InputForm key={index} />
        ))}
      </InputFormContainer>
      <button onClick={addInputForm}>+</button>
    </div>
  );
}

export default App;
