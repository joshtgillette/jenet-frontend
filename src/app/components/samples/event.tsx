import "./../../globals.css";

export function BuildEvent(data: {[key: string]: string[]}) {
  console.log(typeof data);
  console.log(data["DATE"]);
  if (!data["TEXT"] || !data["DATE"] || !data["TIME"] || !data["ADDRESS"]) {
    console.log("BAD", !data["TEXT"], !data["DATE"], !data["TIME"], !data["ADDRESS"])
    return null;
  }

  console.log("RETURNING")
  return <Event text={data["TEXT"][0]} date={data["DATE"][0]} time={data["TIME"][0]} address={data["ADDRESS"][0]} />;
}

const Event = ({ text, date, time, address }: { text: string, date: string, time: string, address: string }) => {
  return (
    <div className="flex flex-col items-end gap-5 p-2 w-fit">
      <h1 className="text-3xl">{text}</h1>
      <div className="w-full flex flex-col gap-2 items-end">
        <div className="glass w-fit gap-2 p-3 !bg-white/70">
          <button
            className="flex items-center" aria-label="Date">
            <span className="material-icons text-green-600" style={{ fontSize: '20px' }}>calendar_month</span>
          </button>
          <h1 className="text-l">{date}</h1>
        </div>
        <div className="glass w-fit gap-2 p-3 !bg-white/70">
          <button
            className="flex items-center" aria-label="Time">
            <span className="material-icons text-yellow-500" style={{ fontSize: '20px' }}>schedule</span>
          </button>
          <h1 className="text-l">{time}</h1>
        </div>
        <div className="glass w-fit gap-2 p-3 !bg-white/70">
          <button
            className="flex items-center" aria-label="Address">
            <span className="material-icons text-red-400" style={{ fontSize: '20px' }}>location_on</span>
          </button>
          <h1 className="text-l">{address}</h1>
        </div>
      </div>
    </div>
  );
};

export default Event;
