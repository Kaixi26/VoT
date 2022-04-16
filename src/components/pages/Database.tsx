import { MdDownload, MdUpload } from "react-icons/md";
import { downloadDatabases, uploadDatabases } from "util/db";
import CircularButton from "components/CircularButton";

export default function Database() {
  return (
    <div>
      <DownloadDatabase />
      <UploadDatabase />
    </div>
  )
}

function DownloadDatabase() {
  return (
    <CircularButton onClick={() => {
      downloadDatabases()
    }}>
      <MdDownload />
    </CircularButton>
  )
}

function UploadDatabase() {
  return (
    <label>
      <CircularButton>
        <MdUpload />
      </CircularButton>
      <input type="file" hidden onChange={(e: any) => {
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