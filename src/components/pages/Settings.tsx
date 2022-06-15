
export function Settings() {
  return <div className="shadow-lg p-2 w-[80%]">
    <div>Input the text here.</div>
    <textarea className="shadow-lg p-2 w-[100%] h-40" rows={5} defaultValue={localStorage.getItem("text") ?? ""}
      onChange={(e) => {
        localStorage.setItem("text", e.target.value)
      }} />
  </div>
}