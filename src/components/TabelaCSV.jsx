import { DataGrid } from '@mui/x-data-grid';

export default function TabelaCSV({rows, columns, ...props}) {
  console.log({rows})
  console.log({columns})
  return(
    <div style={{ 
      height: 450, margin: '0 auto', backgroundColor: '#FFFFFF', border: '#000000', padding: '10px', borderRadius: '20px'
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{margin: '0 auto'}}
        {...props}
      />
    </div>
  )
}