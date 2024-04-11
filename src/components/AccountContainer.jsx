export default function AccountContainer({ children }) {
  return (
    <div className="m-auto account-container">
      <div className="d-flex">Test account</div>
      {children}
    </div>
  );
}
