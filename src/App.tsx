import Button from "./components/ui/Button/Button";
import Icon from "./components/ui/Icon/Icon";
import { AlarmClock, Search } from "lucide-react";
import Typography from "./components/ui/Typography/Typography";
import TextField from "./components/ui/TextField/TextField";
import Select from "./components/ui/Select/Select";

function App() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <Typography variant="h1">Design system</Typography>
      <div className="flex flex-wrap gap-3">
        <Button variant={"primary"}>Primary</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"outlined"}>outlined</Button>
      </div>
      <div className="flex flex-wrap gap-3 rounded-lg bg-zinc-950 p-6">
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
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Buscar"
          description="Digite pelo menos três caracteres."
          leadingContent={<Search className="size-4" />}
        />
        <Select label="Projeto" placeholder="Selecione um projeto">
          <option value="1">teste 01</option>
          <option value="2">teste 02</option>
          <option value="3">teste 03</option>
        </Select>
        <Icon icon={AlarmClock} label="Alarme" size={30} />
      </div>
    </main>
  );
}

export default App;
