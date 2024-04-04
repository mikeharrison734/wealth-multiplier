export default function NumberInput({ label, id, stateUpdateFn }) {
  //   function isNumberKey(evt) {
  //     let charCode = evt.which ? evt.which : evt.keyCode;
  //     if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  //     return true;
  //   }

  function onKeyDown(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    console.log(e.key);

    if (
      !(
        re.test(e.key) ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "." ||
        e.key === "Tab"
      )
    ) {
      e.preventDefault();
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <label htmlFor={id}>{label}</label>
      <input
        className="number-input"
        id={id}
        name={id}
        type="text"
        inputMode="numeric"
        onKeyDown={onKeyDown}
        onChange={(e) => stateUpdateFn(e.target.value)}
      ></input>
    </div>
  );
}
