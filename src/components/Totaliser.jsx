import { useContext } from "react"
import { AccountContext } from "../store/account-context";

export default function Totaliser() {
    const { accounts } = useContext(AccountContext);

    let totalCash = 0;

    accounts.forEach((account) => {
        console.log(`total cash at retirement for account with id ${account.id}: ${account.totalCashAtRetirement}`);
        totalCash += account.totalCashAtRetirement;
    });

    console.log(`total cash in totaliser: ${totalCash}`);

    return <div>
        {totalCash}
    </div>
}