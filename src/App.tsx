import { Tab, Tabs } from "@mui/material";
import CreateDataFromApi from "./create-data-from-api/create-data-from-api";
import DeleteTodoList from "./delete-todo-list/delete-todo-list";
import { useState } from "react";


export default function App() {
  const [tabsValue, setTabsValue] = useState<string>("TODO");
  const onChangeTabs = (event: any, newValue: string) => {
    setTabsValue(newValue);
  };

  return (
    <>
      <Tabs
        value={tabsValue}
        onChange={onChangeTabs}
        TabIndicatorProps={{ sx: { backgroundColor: "transparent" } }}
        variant="scrollable"
        sx={{
          borderBottom: `1px solid ${'#f5f5f5'}`,
          "& button": {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: '#f5f5f5',
            marginRight: 1,
            minHeight: "41px",
            paddingTop: "12px",
            paddingBottom: "12px",
          },
          "& button:focus": {
            backgroundColor: '#14378A',
            color: "#ffffff",
          },
        }}
      >
        <Tab
          value="TODO"
          onClick={() => setTabsValue("TODO")}
          iconPosition="start"
          label='Auto Delete Todo List'
          sx={{
            "&.Mui-selected": {
              color: "#ffffff",
              backgroundColor: '#14378A',
            },
          }}
        />
        <Tab
          value="TRANFORM"
          onClick={() => setTabsValue("TRANFORM")}
          iconPosition="start"
          label="Create data from API"
          sx={{
            "&.Mui-selected": {
              color: "#ffffff",
              backgroundColor: '#14378A',
            },
          }}
        />
      </Tabs>
      {tabsValue == 'TODO' && (
        <>
          <DeleteTodoList />
        </>
      )}
      {tabsValue == 'TRANFORM' && (
        <>
          <CreateDataFromApi />
        </>
      )}
    </>
  );
}
