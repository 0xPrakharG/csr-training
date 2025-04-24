import React from "react";
import HistoryChart from "./HistoryChart";
import HistoryTable from "./HistoryTable";

function UserHistory({ history }) {
    return (
        <>
            <HistoryChart data={history} />
            <HistoryTable data={history} />
        </>
    );
}

export default UserHistory;
