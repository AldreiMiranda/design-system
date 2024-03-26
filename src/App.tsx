import React from "react";
import Button from "./components/ui/Button/Button";
import Icon from "./components/ui/Icon/Icon";
import Typography from "./components/ui/Typography/Typography";
import TextField from "./components/ui/TextField/TextField";
import Select from "./components/ui/Select/Select";

function App() {
  return (
    <div className="justify-center mt-10">
      <div className="flex p-11">
        <Button variant={"primary"}>Primary</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"outlined"}>outlined</Button>
      </div>
      <div className=" p-11 bg-black">
        <Button variant={"secondary"} size={"small"}>
          Primary
        </Button>
        <Button variant={"ghost"} size={"medium"}>
          Ghost
        </Button>
        <Button variant={"outlined"} size={"large"}>
          outlined
        </Button>
      </div>
      <div>
        <Typography variant={"h1"} className="text-red-500">
          h1. heading
        </Typography>
        <TextField variant={"primary"}></TextField>
        <Icon name="AlarmClock" size={30} color="red" />
        <Select variant={"primary"} placeholder={"teste"}>
          <option value="1">teste 01</option>
          <option value="2">teste 02</option>
          <option value="3">teste 03</option>
        </Select>
      </div>
    </div>
  );
}

export default App;
