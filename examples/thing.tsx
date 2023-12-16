import {listSdks} from './bin/syncPackages.js'

export function Thing() {
  return <strong>World!</strong>
}

export function SdkTable() {
  return (
    <table>
      <tr>
        <th>SDK</th>
        <th>Version</th>
      </tr>
      {listSdks().map((sdk) => (
        <tr key={sdk.dirName}>
          <td>{sdk.packageJson.name}</td>
          <td>{sdk.packageJson.version}</td>
        </tr>
      ))}
    </table>
  )
}
