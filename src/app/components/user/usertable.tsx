import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import config from "../../appconfig.json";

let selectID = null;

export default function UserTable() {
  const [data, setData] = React.useState(Array(0));
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  
  const openForm = (id) => {
    const path = "/user/form?id="+id;
    router.push(path);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const openConfirm = (id) => {
    setOpen(true);
    selectID = id;
  }
  
  const handleConfirm = () => {
    axios.delete(config.api.url+selectID).then((response) => {
      if(response.status == 200){
        setOpen(false);
        location.reload();
      }
    });
  }

  React.useEffect(() => {
    if(loading === true){
      axios.get(config.api.url).then((response) => {
        setData(response.data.data);
        setLoading(false);
      });
    }
  }); 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has no data and is not sortable.',
      sortable: false,
      width: 300,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => openForm(params.row.id)}
          >UPDATE</Button>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => openConfirm(params.row.id)}
          >DELETE</Button>
        </>
      ),
    },
  ]; 

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you want to delete this user data ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is real delete, data will gone and can't restore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}