import "./../../globals.css";

export function BuildText(data: { [key: string]: string[] }) {
  if (Object.keys(data).length > 1 || !("TEXT" in data)) {
    return null;
  }

  return <Text inputs={[data["TEXT"][0]]} />;
}

const Text = ({ inputs }: { inputs: string[] }) => {
  return <h1>{inputs[0]}</h1>;
};

export default Text;
