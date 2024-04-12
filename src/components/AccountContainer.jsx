import { useContext, useState } from "react";
import { AccountContext } from "../store/account-context";
import Account from "./Account";

export default function AccountContainer() {
  const { accounts, addAccount } = useContext(AccountContext);
  const [activeAccountId, setActiveAccountId] = useState();

  function handleSetActiveAccountId(id) {
    setActiveAccountId(id);
  }

  console.log(`active account id: ${activeAccountId}`);

  return (
    <div className="m-auto account-container">
      <div id="tabs" className="d-flex w-100 border-bottom border-white">
        {accounts.map((account) => {
          return (
            <button
              key={account.id}
              className="bg-transparent text-white account-button"
              onClick={() => handleSetActiveAccountId(account.id)}
            >
              Account {account.id}
            </button>
          );
        })}
        <button
          className="bg-transparent text-white add-button"
          onClick={addAccount}
        >
          +
        </button>
      </div>
      {accounts.length > 0 && activeAccountId && <Account accountId={activeAccountId} />}
    </div>
  );
}
