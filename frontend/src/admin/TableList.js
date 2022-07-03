import React from 'react'
import { Avatar, CellWrapper, ContainerWrapper, Head, Hr, Input, Search, Status, Title, Wrapper } from '../styles/stylesAdmin/StyleTableList'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const TableList = () => {

  const rows = [
    /*{
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },*/
  ];

  return (
    <TableContainer component={Paper} className="table">
      <ContainerWrapper>
        <Wrapper>
          <Title>LATEST TRANSACTIONS</Title>
          <Search>
            <Input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </Search>
        </Wrapper>
        <Hr />
      </ContainerWrapper>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Head>Tracking ID</Head></TableCell>
            <TableCell><Head>Product</Head></TableCell>
            <TableCell><Head>Customer</Head></TableCell>
            <TableCell><Head>Date</Head></TableCell>
            <TableCell><Head>Amount</Head></TableCell>
            <TableCell><Head>Payment Method</Head></TableCell>
            <TableCell><Head>Status</Head></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <CellWrapper>
                  <Avatar src={row.img} alt="" />
                  {row.product}
                </CellWrapper>
              </TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>
                <Status $mode={`${row.status}`}>{row.status}</Status>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableList
