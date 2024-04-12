import { createContext, useReducer } from "react";

export const AccountContext = createContext({
  accounts: [],
  addAccount: () => {},
  updateAccount: () => {},
});

function accountReducer(state, action) {
  if (action.type === "ADD_ACCOUNT") {
    const updatedAccounts = [...state.accounts];

    let lastId;
    if (updatedAccounts.length > 0) {
      lastId = updatedAccounts[updatedAccounts.length - 1].id;
    } else {
      lastId = 0;
    }

    updatedAccounts.push({
      id: lastId + 1,
      currentInvestments: 0,
      monthlyInvestment: 0,
      monthlyInvestmentGrowth: 0,
      currentAge: 0,
      retirementAge: 0,
      totalCashAtRetirement: 0,
    });

    return {
      accounts: updatedAccounts,
    };
  }

  if (action.type === "UPDATE_ACCOUNT") {
    const updatedAccounts = [...state.accounts];
    const updatedAccountIndex = updatedAccounts.findIndex(
      (account) => account.id === action.payload.account.id
    );

    const updatedAccount = {
      ...action.payload.account,
    };

    updatedAccounts[updatedAccountIndex] = updatedAccount;

    return {
      accounts: updatedAccounts,
    };
  }
}

export default function AccountContextProvider({ children }) {
  const [accountState, accountDispatch] = useReducer(accountReducer, {
    accounts: [],
  });

  function handleAddAccount() {
    accountDispatch({
      type: "ADD_ACCOUNT",
    });
  }

  function handleUpdateAccount(account) {
    accountDispatch({
      type: "UPDATE_ACCOUNT",
      payload: {
        account,
      },
    });
  }

  const ctxValue = {
    accounts: accountState.accounts,
    addAccount: handleAddAccount,
    updateAccount: handleUpdateAccount,
  };

  return (
    <AccountContext.Provider value={ctxValue}>
      {children}
    </AccountContext.Provider>
  );
}
