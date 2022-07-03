import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {
  AddContainer, Avatar, ContainerWrapper, Datatable,
  Delete, Edit, Hr, Links, Span, Title, UserContainer, Wrapper
} from "../styles/stylesAdmin/StyleDataTableUsers";
import { useSelector } from "react-redux";


const DataTableUsers = () => {

  const { user } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  /*const dataRows = users.items.map((item, index) => (
    {
      _id: index,
      firstname: item.firstname,
      lastname: item.lastname,
      image: item.image,
      email: item.email,
      gender: item.gender,
      role: item.role,
    }
  ));*/

  const dataRows = users.items.map(item => (
    {
      _id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      image: item.image,
      email: item.email,
      gender: item.gender,
      role: item.role,
    }
  ));

  const columns = [
    {
      field: "_id", headerName: "ID", type: "string", width: 200,
    },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Avatar src={params.row.image} alt="Avatar" />
            {params.row.firstname} {params.row.lastname}
          </UserContainer>
        );
      },
    },
    {
      field: "email", headerName:
        "Email", width: 250
    },
    {
      field: "gender", headerName:
        "Gender", width: 125
    },
    {
      field: "role", headerName:
        "Role", width: 120
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Edit>
              <Links to={"/#admin/users/" + params.row.id}>
                <EditOutlinedIcon disabled={user.role !== "ROOT"} />
              </Links>
            </Edit>
            <Delete>
              <DeleteOutlinedIcon disabled={user.role !== "ROOT"}
                onClick={() => handleDelete(params.row.id)}
              />
            </Delete>
          </UserContainer>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dataRows.filter((item) => item._id !== id);
  };

  return (

    <Datatable>
      <ContainerWrapper>
        <Wrapper>
          <Title>LIST OF USERS</Title>
          <Links to="/admin/users/new">
            <AddContainer>
              <Span> Add new </Span>
              <GroupAddOutlinedIcon />
            </AddContainer>
          </Links>
        </Wrapper>
        <Hr />
      </ContainerWrapper>
      <DataGrid
        getRowId={(r) => r._id}
        rows={dataRows}
        columns={columns} //columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Datatable>
  )

}

export default DataTableUsers