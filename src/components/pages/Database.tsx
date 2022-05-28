import { MdDownload, MdUpload } from "react-icons/md";
import { downloadDatabases, uploadDatabases } from "util/db";
import CircularButton from "components/CircularButton";

export default function Database() {
  return (
    <div>
      <div className="flex flex-row gap-5">
        <DownloadDatabase />
        <UploadDatabase />
      </div>
    </div>
  )
}

function DownloadDatabase() {
  return (
    <CircularButton onClick={() => {
      downloadDatabases()
    }}>
      <MdDownload className="scale-[2]" />
    </CircularButton>
  )
}
function UploadDatabase() {
  return (
    <label>
      <CircularButton >
        <MdUpload className="scale-[2]" />
      </CircularButton>
      <input className="hidden" type="file" onChange={(e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = ({ target }: any) => {
          uploadDatabases(target.result)
        }
        reader.readAsText(file)
      }} />
    </label>
  )
}