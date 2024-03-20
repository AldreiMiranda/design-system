import React from "react";
import Button from "./components/ui/Button/Button";
import Icon from "./components/ui/Icon/Icon";
import Typography from "./components/ui/Typography/Typography";

function App() {
  return (
    <div className="justify-center mt-10">
      <Button variant={"primary"} icon={"AiFillAliwangwang"}>
        Primary
        <Icon name="AlarmClock" size={30} color="red" />
      </Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Typography variant={"h1"} className="text-red-500">
        h1. heading
      </Typography>
    </div>
  );
}

export default App;
